// Vercel Serverless Function: GET /api/status
// Securely relays live bot telemetry & historical ping metrics to frontend.

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const botApiUrl = process.env.TLC_BOT_API_URL || 'http://176.100.37.77:30088';
  const botApiKey = process.env.TLC_BOT_API_KEY;

  // Fallback structure mirroring live metrics if key is unconfigured
  const mockFallback = {
    isRealData: false,
    status: 'operational',
    bot: { online: true, latency_ms: 45, user: 'TLC-Bot#0000' },
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
      commandsCount: 60
    },
    pingHistory: [
      { time: "11m ago", ping: 42 },
      { time: "10m ago", ping: 45 },
      { time: "9m ago", ping: 39 },
      { time: "8m ago", ping: 48 },
      { time: "7m ago", ping: 52 },
      { time: "6m ago", ping: 44 },
      { time: "5m ago", ping: 41 },
      { time: "4m ago", ping: 46 },
      { time: "3m ago", ping: 50 },
      { time: "2m ago", ping: 43 },
      { time: "1m ago", ping: 47 },
      { time: "Now", ping: 45 }
    ],
    operationsLog: [
      {
        title: "SQLite Database WAL Migration Completed",
        details: "Database connection pool expanded with PRAGMA busy_timeout=5000 structural validation.",
        time: "10m ago",
        status: "success"
      },
      {
        title: "Command Tree Synchronized",
        details: "60 Commands re-indexed across modular cogs with multi-owner permission validations.",
        time: "1h ago",
        status: "info"
      }
    ],
    lastChecked: new Date().toISOString()
  };

  if (!botApiKey) {
    return res.status(200).json(mockFallback);
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
      throw new Error(`Bot API responded with status ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({
      isRealData: true,
      ...data
    });
  } catch (error) {
    console.error('Vercel API relay error:', error);
    return res.status(200).json({
      ...mockFallback,
      status: 'degraded',
      error: 'Could not connect to bot API at 176.100.37.77:30088'
    });
  }
}

