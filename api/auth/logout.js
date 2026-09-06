// api/auth/logout.js
// Clears the session cookie.

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
  res.setHeader(
    'Set-Cookie',
    `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${secureFlag}`
  );

  if (req.method === 'GET') {
    return res.redirect(302, '/');
  }
  return res.status(200).json({ success: true });
}
