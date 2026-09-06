// api/recent-sanctions.js
// Vercel proxy to the bot's /api/bot/recent_sanctions

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const botApiUrl = process.env.TLC_BOT_API_URL;
  const botApiKey = process.env.TLC_BOT_API_KEY;

  if (!botApiUrl || !botApiKey) {
    return res.status(200).json({
      sanctions: [],
      active_count: 0,
      isRealData: false,
      error: 'Bot API not configured',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const limit = req.query?.limit || 5;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `${botApiUrl}/api/bot/recent_sanctions?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${botApiKey}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Bot API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ isRealData: true, ...data });
  } catch (error) {
    console.error('recent-sanctions bridge error:', error.message);
    return res.status(200).json({
      sanctions: [],
      active_count: 0,
      isRealData: false,
      error: 'Backend unavailable',
      timestamp: new Date().toISOString()
    });
  }
}
