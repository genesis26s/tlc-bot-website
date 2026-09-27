// api/process-verification.js

export default async function handler(req, res) {
  // CORS Headers
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://tlc-bot-website.vercel.app',
    'https://genesis26s-tlc-bot-website-xi.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { token, roblox_username, browser_hash } = req.body;

    if (!token || !roblox_username || !browser_hash) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required verification parameters (token, roblox_username, or browser_hash).' 
      });
    }

    // Extract true client IP (handling Vercel reverse proxy headers)
    const forwardedFor = req.headers['x-forwarded-for'];
    const client_ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (req.socket.remoteAddress || '127.0.0.1');

    // Forward request to Bot Host internal API
    const botHostUrl = process.env.BOT_API_URL || 'http://176.100.37.77:30088';
    
    const botResponse = await fetch(`${botHostUrl}/internal/process-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.TLC_BOT_API_KEY && {
          'Authorization': `Bearer ${process.env.TLC_BOT_API_KEY}`
        })
      },
      body: JSON.stringify({
        token,
        roblox_username,
        browser_hash,
        client_ip
      })
    });

    const data = await botResponse.json();
    return res.status(botResponse.status).json(data);

  } catch (error) {
    console.error('API Verification Proxy Error:', error);
    return res.status(502).json({ 
      success: false, 
      message: 'Failed to communicate with the verification backend engine.' 
    });
  }
}
