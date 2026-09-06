// api/auth/callback.js
// Handles Discord's OAuth2 callback.

import crypto from 'crypto';
import { signToken } from '../_lib/jwt.js';

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

function verifyState(signedState) {
  if (!signedState || !COOKIE_SECRET) return false;
  const parts = signedState.split('.');
  if (parts.length !== 2) return false;
  const [nonce, sig] = parts;
  if (!nonce || !sig) return false;
  const expectedSig = crypto
    .createHmac('sha256', COOKIE_SECRET)
    .update(nonce)
    .digest('hex');
  if (sig.length !== expectedSig.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state, error } = req.query;

  if (error) {
    return res.redirect(302, '/?auth_error=' + encodeURIComponent(error));
  }

  if (!code || !state) {
    return res.status(400).json({ error: 'Missing code or state parameter' });
  }

  const cookieHeader = req.headers.cookie || '';
  const stateCookie = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('oauth_state='))
    ?.split('=')[1];

  if (!stateCookie || !verifyState(stateCookie) || stateCookie !== state) {
    return res.status(403).json({ error: 'Invalid state (CSRF check failed)' });
  }

  let tokenData;
  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: REDIRECT_URI
      })
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Discord token exchange failed:', tokenRes.status, errText);
      return res.redirect(302, '/?auth_error=token_exchange_failed');
    }

    tokenData = await tokenRes.json();
  } catch (err) {
    console.error('Token exchange network error:', err);
    return res.redirect(302, '/?auth_error=network_error');
  }

  const accessToken = tokenData.access_token;
  if (!accessToken) {
    return res.redirect(302, '/?auth_error=no_access_token');
  }

  let user;
  try {
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!userRes.ok) {
      return res.redirect(302, '/?auth_error=user_fetch_failed');
    }

    user = await userRes.json();
  } catch (err) {
    console.error('Discord /users/@me fetch error:', err);
    return res.redirect(302, '/?auth_error=network_error');
  }

  const payload = {
    id: user.id,
    username: user.username,
    global_name: user.global_name || user.username,
    avatar: user.avatar,
    discriminator: user.discriminator
  };

  const jwt = await signToken(payload, 7 * 24 * 60 * 60);

  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
  res.setHeader('Set-Cookie', [
    `session=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}; ${secureFlag}`,
    `oauth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${secureFlag}`
  ]);

  return res.redirect(302, '/');
}
