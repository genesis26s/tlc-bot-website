// Vercel Serverless API Route: GET /api/status
// Securely bridges requests from your Vercel website to your Python Bot at 176.100.37.77:30088

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Uses your VPS address or environment variable fallback
  const botApiUrl = process.env.TLC_BOT_API_URL || 'http://176.100.37.77:30088';
  const botApiKey = process.env.TLC_BOT_API_KEY;

  // If no API key is configured yet in Vercel, return graceful status data
  if (!botApiKey) {
    return res.status(200).json({
      isRealData: false,
      status: 'operational',
      bot: { online: true, latency_ms: 38, user: 'TLC-Bot#0000' },
      services: {
        discord: 'operational',
        api: 'operational',
        database: 'operational',
        website: 'operational'
      },
      metrics: {
        guildsCount: 1,
        membersCount: 1042,
        activeSanctions: 12,
        commandsCount: 54
      },
      lastChecked: new Date().toISOString()
    });
  }

  try {
    const response = await fetch(`${botApiUrl}/api/bot/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${botApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Bot API returned HTTP status ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({
      isRealData: true,
      ...data
    });
  } catch (error) {
    console.error('Vercel API bridge error:', error);
    return res.status(503).json({
      isRealData: false,
      status: 'degraded',
      error: 'Unable to reach TLC-Bot backend API',
      bot: { online: false, latency_ms: 0, user: 'TLC-Bot' },
      services: {
        discord: 'unknown',
        api: 'degraded',
        database: 'unknown',
        website: 'operational'
      },
      metrics: {
        guildsCount: 1,
        membersCount: 1042,
        activeSanctions: 12,
        commandsCount: 54
      },
      lastChecked: new Date().toISOString()
    });
  }
}

