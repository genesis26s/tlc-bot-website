import fetch from 'node-fetch';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { token, robloxUsername, captchaToken } = req.body || {};

  if (!token || !robloxUsername) {
    return res.status(400).json({ error: 'Missing required fields: token and robloxUsername are required.' });
  }

  try {
    // 1. Verify Google reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && captchaToken) {
      const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(captchaToken)}`
      });
      const captchaData = await captchaRes.json();

      if (!captchaData.success) {
        return res.status(400).json({ error: 'reCAPTCHA verification failed. Please complete the CAPTCHA again.' });
      }
    }

    // 2. Fetch Roblox Account Info
    const robloxRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [robloxUsername], excludeBannedUsers: false })
    });

    if (!robloxRes.ok) {
      return res.status(502).json({ error: 'Unable to query Roblox API. Please try again later.' });
    }

    const robloxData = await robloxRes.json();
    if (!robloxData.data || robloxData.data.length === 0) {
      return res.status(404).json({ error: `Roblox user "${robloxUsername}" does not exist.` });
    }

    const robloxUser = robloxData.data[0];

    // 3. Post verification payload to the Discord Bot API
    const botApiUrl = process.env.BOT_API_URL;
    const internalApiKey = process.env.INTERNAL_API_KEY;

    if (!botApiUrl || !internalApiKey) {
      return res.status(500).json({ error: 'Server configuration error: BOT_API_URL or INTERNAL_API_KEY is not configured.' });
    }

    const clientIp = req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : req.socket.remoteAddress;

    const botRes = await fetch(`${botApiUrl.replace(/\/$/, '')}/api/verify-complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${internalApiKey}`
      },
      body: JSON.stringify({
        token: token,
        roblox_id: robloxUser.id,
        roblox_username: robloxUser.name,
        client_ip: clientIp
      })
    });

    const botResult = await botRes.json();

    if (!botRes.ok) {
      return res.status(botRes.status).json({
        error: botResult.error || 'The bot rejected the verification request.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Verification processed successfully.',
      user: {
        robloxId: robloxUser.id,
        robloxUsername: robloxUser.name
      }
    });

  } catch (error) {
    console.error('Process Verification Error:', error);
    return res.status(500).json({ error: 'An internal server error occurred while processing verification.' });
  }
}
