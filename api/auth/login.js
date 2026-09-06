// api/auth/login.js
// Initiates Discord OAuth2 flow by redirecting the user to Discord's authorize endpoint.
// Includes a CSRF state nonce stored in a short-lived httpOnly cookie.

import crypto from 'crypto';

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

function signState(nonce) {
  // Simple HMAC signature to prevent tampering with the state cookie.
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
      error: 'Server misconfigured: Discord OAuth env vars are missing.'
    });
  }

  // Generate a random nonce for CSRF protection
  const nonce = crypto.randomBytes(16).toString('hex');
  const signedState = signState(nonce);

  // Persist the signed state in a short-lived cookie.
  // The callback will verify this matches the ?state= query param.
  res.setHeader(
    'Set-Cookie',
    `oauth_state=${signedState}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600; ${
      process.env.NODE_ENV === 'production' ? 'Secure;' : ''
    }`
  );

  // Build Discord OAuth2 URL
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify',
    state: signedState,
    prompt: 'none'  // skip the "authorize this app" screen if already authorized
  });

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;

  // Redirect browser to Discord
  res.redirect(302, discordAuthUrl);
}// api/auth/login.js
// Initiates Discord OAuth2 flow by redirecting the user to Discord's authorize endpoint.
// Includes a CSRF state nonce stored in a short-lived httpOnly cookie.

import crypto from 'crypto';

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

function signState(nonce) {
  // Simple HMAC signature to prevent tampering with the state cookie.
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
      error: 'Server misconfigured: Discord OAuth env vars are missing.'
    });
  }

  // Generate a random nonce for CSRF protection
  const nonce = crypto.randomBytes(16).toString('hex');
  const signedState = signState(nonce);

  // Persist the signed state in a short-lived cookie.
  // The callback will verify this matches the ?state= query param.
  res.setHeader(
    'Set-Cookie',
    `oauth_state=${signedState}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600; ${
      process.env.NODE_ENV === 'production' ? 'Secure;' : ''
    }`
  );

  // Build Discord OAuth2 URL
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify',
    state: signedState,
    prompt: 'none'  // skip the "authorize this app" screen if already authorized
  });

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;

  // Redirect browser to Discord
  res.redirect(302, discordAuthUrl);
}
