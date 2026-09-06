// api/auth/me.js
// Returns the current user from the session cookie.

import { verifyToken } from '../_lib/jwt.js';

function buildAvatarUrl(user) {
  if (!user.avatar) return null;
  const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cookieHeader = req.headers.cookie || '';
  const sessionCookie = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('session='))
    ?.split('=')[1];

  if (!sessionCookie) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const payload = await verifyToken(sessionCookie);

  if (!payload) {
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
    res.setHeader(
      'Set-Cookie',
      `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${secureFlag}`
    );
    return res.status(401).json({ error: 'Session expired or invalid' });
  }

  return res.status(200).json({
    id: payload.id,
    username: payload.username,
    displayName: payload.global_name,
    avatar: buildAvatarUrl(payload),
    discriminator: payload.discriminator
  });
}
