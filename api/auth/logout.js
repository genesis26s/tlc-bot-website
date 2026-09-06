// api/auth/logout.js
// Clears the session cookie. Stateless logout (no server-side session to revoke).

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader(
    'Set-Cookie',
    `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${
      process.env.NODE_ENV === 'production' ? 'Secure;' : ''
    }`
  );

  // If GET, redirect home. If POST, return JSON.
  if (req.method === 'GET') {
    return res.redirect(302, '/');
  }
  return res.status(200).json({ success: true });
}
