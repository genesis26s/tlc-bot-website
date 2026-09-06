// api/auth/login.js
// Initiates Discord OAuth2 flow by redirecting to Discord's authorize endpoint.

import crypto from 'crypto';

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

function signState(nonce) {
  const sig = crypto
    .createHmac('sha256', COOKIE_SECRET || 'insecure')
    .update(nonce)
    .digest('hex');
  return `${nonce}.${sig}`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!CLIENT_ID || !REDIRECT_URI || !COOKIE_SECRET) {
    return res.status(500).json({
      error: 'Server misconfigured',
      missing: {
        DISCORD_CLIENT_ID: !CLIENT_ID,
        DISCORD_REDIRECT_URI: !REDIRECT_URI,
        COOKIE_SECRET: !COOKIE_SECRET
      }
    });
  }

  const nonce = crypto.randomBytes(16).toString('hex');
  const signedState = signState(nonce);

  res.setHeader(
    'Set-Cookie',
    `oauth_state=${signedState}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600; ${
      process.env.NODE_ENV === 'production' ? 'Secure;' : ''
    }`
  );

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify',
    state: signedState,
    prompt: 'none'
  });

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;

  res.redirect(302, discordAuthUrl);
}
