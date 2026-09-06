// api/server-info.js
// Vercel proxy to the bot's /api/bot/server_info

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const botApiUrl = process.env.TLC_BOT_API_URL;
  const botApiKey = process.env.TLC_BOT_API_KEY;

  const defaults = {
    bot_user: 'TLC-Bot',
    bot_id: null,
    discord_py_version: 'unknown',
    python_version: 'unknown',
    platform: 'unknown',
    uptime_seconds: 0,
    guilds: 0,
    total_members: 0,
    shard_count: 1,
    latency_ms: null,
    is_ready: false,
    primary_guild: null,
    isRealData: false
  };

  if (!botApiUrl || !botApiKey) {
    return res.status(200).json({ ...defaults, error: 'Bot API not configured' });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${botApiUrl}/api/bot/server_info`, {
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
    console.error('server-info bridge error:', error.message);
    return res.status(200).json({ ...defaults, error: 'Backend unavailable' });
  }
}
