import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, robloxUsername, captchaToken } = req.body;

  if (!token || !robloxUsername) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // 1. Validate CAPTCHA (Optional if secret key set)
    if (process.env.RECAPTCHA_SECRET_KEY && captchaToken) {
      const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
      });
      const captchaData = await captchaRes.json();
      if (!captchaData.success) {
        return res.status(400).json({ error: 'CAPTCHA verification failed.' });
      }
    }

    // 2. Resolve Roblox User ID
    const robloxRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [robloxUsername], excludeBannedUsers: true })
    });
    const robloxData = await robloxRes.json();

    if (!robloxData.data || robloxData.data.length === 0) {
      return res.status(404).json({ error: 'Roblox user not found.' });
    }

    const robloxUser = robloxData.data[0];

    // 3. Post verification payload to the running Bot's internal API
    const botApiUrl = process.env.BOT_API_URL; // e.g., http://your-bot-ip:8080/api/verify-complete
    const botResponse = await fetch(botApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_KEY}`
      },
      body: JSON.stringify({
        token,
        roblox_id: robloxUser.id,
        roblox_username: robloxUser.name,
        client_ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
      })
    });

    const result = await botResponse.json();
    if (!botResponse.ok) {
      return res.status(botResponse.status).json({ error: result.error || 'Bot failed to process verification.' });
    }

    return res.status(200).json({ success: true, message: 'Verification successful!' });

  } catch (err) {
    console.error('Verification Error:', err);
    return res.status(500).json({ error: 'Internal server error during verification.' });
  }
}
