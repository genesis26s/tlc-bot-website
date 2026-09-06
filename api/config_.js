// api/config.js
// Vercel proxy to the bot's /api/bot/config

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const botApiUrl = process.env.TLC_BOT_API_URL;
  const botApiKey = process.env.TLC_BOT_API_KEY;

  const defaults = {
    anti_spam: true, anti_raid: true, verification: true,
    welcome: true, goodbye: true, tickets: true,
    monitoring: true, logging: true,
    max_warn_before_ban: 3, default_mute_duration_minutes: 60,
    anti_raid_threshold: 10,
    isRealData: false
  };

  if (!botApiUrl || !botApiKey) {
    return res.status(200).json({
      ...defaults,
      error: 'Bot API not configured'
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${botApiUrl}/api/bot/config`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${botApiKey}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Bot API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ isRealData: true, ...data });
  } catch (error) {
    console.error('config bridge error:', error.message);
    return res.status(200).json({ ...defaults, error: 'Backend unavailable' });
  }
}
