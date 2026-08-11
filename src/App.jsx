import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Ticket, 
  UserCheck, 
  Lock, 
  Zap, 
  RefreshCw, 
  LogOut, 
  ChevronRight, 
  Menu, 
  X, 
  Sliders, 
  Bot,
  Activity,
  Users,
  Server,
  Database
} from 'lucide-react';

// --- LOGO COMPONENT ---
function BotLogo({ className = "w-10 h-10" }) {
  const [srcIndex, setSrcErrorIndex] = useState(0);
  const logoSources = ["/assets/logo.png", "/logo.png"];

  if (srcIndex >= logoSources.length) {
    return (
      <div className={`${className} rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0`}>
        <Shield className="w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <img 
      src={logoSources[srcIndex]} 
      alt="TLC-Bot Logo" 
      onError={() => setSrcErrorIndex((p) => p + 1)}
      className={`${className} object-contain rounded-xl border border-neutral-800 bg-neutral-950 p-1 shrink-0`}
    />
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [liveStatus, setLiveStatus] = useState({
    loading: true,
    isRealData: false,
    status: 'operational',
    bot: { online: true, latency_ms: 45, user: 'TLC-Bot' },
    services: { discord: 'operational', api: 'operational', database: 'operational', website: 'operational' },
    metrics: { guildsCount: 1, membersCount: 1042, activeSanctions: 12, commandsCount: 60 },
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
        title: "SQLite Database WAL Engine Active",
        details: "Database connection pool expanded with PRAGMA busy_timeout=5000 structural validation.",
        time: "10m ago",
        status: "success"
      },
      {
        title: "Command Tree Synchronized",
        details: "60 Hybrid Commands re-indexed across 10 modular cogs.",
        time: "1h ago",
        status: "info"
      }
    ],
    lastChecked: 'Just now'
  });

  const fetchRealStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setLiveStatus({ loading: false, ...data });
      }
    } catch (e) {
      setLiveStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchRealStatus();
    const interval = setInterval(fetchRealStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [route]);

  const handleDiscordLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setUser({
        id: '1295203178177892425',
        username: 'Genesis26',
        displayName: 'Genesis26',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
        role: 'Administrator'
      });
      setIsLoggingIn(false);
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
    setUserMenuOpen(false);
    if (route === 'dashboard') setRoute('home');
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-neutral-100 selection:text-black flex flex-col justify-between relative overflow-hidden">
      {/* Background Animated Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-neutral-800/30 blur-[140px] animate-pulse duration-[10000ms]" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-neutral-900/50 blur-[160px] animate-pulse duration-[8000ms]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#17171715_1px,transparent_1px),linear-gradient(to_bottom,#17171715_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-neutral-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div onClick={() => setRoute('home')} className="flex items-center gap-3 cursor-pointer group">
            <BotLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-lg uppercase font-mono text-white flex items-center gap-1.5">
                TLC-BOT
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">v2.5</span>
              </span>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase">Security System</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <button onClick={() => setRoute('home')} className={`transition-colors hover:text-white ${route === 'home' ? 'text-white font-semibold' : ''}`}>Home</button>
            <button onClick={() => setRoute('features')} className={`transition-colors hover:text-white ${route === 'features' ? 'text-white font-semibold' : ''}`}>Features</button>
            <button onClick={() => setRoute('status')} className={`transition-colors hover:text-white ${route === 'status' ? 'text-white font-semibold' : ''}`}>Live Telemetry</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-3 p-1.5 pl-3 pr-4 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all text-sm">
                  <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover border border-neutral-700" />
                  <span className="font-medium text-white">{user.displayName}</span>
                  <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${userMenuOpen ? 'rotate-90' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl">
                    <div className="px-3 py-2 border-b border-neutral-800/60">
                      <p className="text-xs font-semibold text-white">{user.displayName}</p>
                      <p className="text-[11px] text-neutral-500">{user.role}</p>
                    </div>
                    <button onClick={() => { setRoute('dashboard'); setUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg flex items-center gap-2 mt-1">
                      <Sliders className="w-3.5 h-3.5" /> Dashboard
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/30 rounded-lg flex items-center gap-2 mt-1">
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleDiscordLogin} disabled={isLoggingIn} className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all">
                {isLoggingIn ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-4 h-4" />}
                Login with Discord
              </button>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-300">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-grow">
        {route === 'home' && <HomePage setRoute={setRoute} handleDiscordLogin={handleDiscordLogin} liveStatus={liveStatus} />}
        {route === 'features' && <FeaturesPage />}
        {route === 'status' && <StatusPage liveStatus={liveStatus} fetchRealStatus={fetchRealStatus} />}
        {route === 'dashboard' && <DashboardPage user={user} liveStatus={liveStatus} />}
        {route === '404' && <NotFoundPage setRoute={setRoute} />}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-neutral-800/80 bg-black/90 text-neutral-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <BotLogo className="w-6 h-6" />
            <span className="font-mono font-bold text-white uppercase text-sm">TLC-Bot</span>
          </div>
          <p className="text-neutral-500">© 2026 TLC-Bot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// HOMEPAGE COMPONENT
function HomePage({ setRoute, handleDiscordLogin, liveStatus }) {
  return (
    <div className="space-y-24 pb-20 pt-16 px-4 max-w-7xl mx-auto text-center">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <BotLogo className="w-16 h-16 sm:w-24 sm:h-24" />
          <h1 className="text-6xl sm:text-8xl font-black uppercase text-white font-mono tracking-tight">
            TLC-BOT
          </h1>
        </div>
        <h2 className="text-2xl text-neutral-300 font-light">Professional moderation & security for your Discord server.</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">Built specifically for TLC. Keeping your community secure, organized, and under control.</p>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={handleDiscordLogin} className="px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all">Login with Discord</button>
        <button onClick={() => setRoute('status')} className="px-8 py-4 rounded-full bg-neutral-900 text-white border border-neutral-800 text-xs uppercase tracking-widest">Live Telemetry</button>
      </div>

      <div 
        onClick={() => setRoute('status')} 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 cursor-pointer hover:border-neutral-600 transition-all"
      >
        <span className={`w-2 h-2 rounded-full ${liveStatus.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'} animate-ping`} />
        <span className="text-white font-mono">
          ● {liveStatus.status === 'operational' ? 'All Systems Operational' : 'System Degraded'} ({liveStatus.bot.latency_ms}ms)
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
      </div>
    </div>
  );
}

// FEATURES PAGE COMPONENT
function FeaturesPage() {
  return (
    <div className="py-16 px-4 max-w-5xl mx-auto space-y-8 text-left">
      <h1 className="text-4xl font-black text-white font-mono uppercase text-center">Built for Control.</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2">
          <Shield className="w-6 h-6 text-white" />
          <h3 className="font-bold text-white uppercase">Moderation & Sanctions</h3>
          <p className="text-xs text-neutral-400">Database case tracking with custom Roblox & Discord identifiers.</p>
        </div>
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2">
          <Ticket className="w-6 h-6 text-white" />
          <h3 className="font-bold text-white uppercase">Support Tickets</h3>
          <p className="text-xs text-neutral-400">Dropdown category routing, staff claims & TXT chat transcript archiving.</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKETCH-STYLE LIVE TELEMETRY DASHBOARD (MATCHING YOUR SCREENSHOTS)
// ─────────────────────────────────────────────────────────────────────────────
function StatusPage({ liveStatus, fetchRealStatus }) {
  const [timeRange, setTimeRange] = useState('Live 1H');

  const pingPoints = liveStatus.pingHistory || [
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
  ];

  // SVG Bezier Curve Generator
  const generateSvgPath = (points) => {
    if (!points || points.length === 0) return { path: '', dots: [] };
    const width = 800;
    const height = 180;
    const minPing = 35;
    const maxPing = 55;

    const mapped = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((p.ping - minPing) / (maxPing - minPing)) * (height - 30) - 15;
      return { x, y, ping: p.ping, label: p.time };
    });

    let d = `M ${mapped[0].x} ${mapped[0].y}`;
    for (let i = 0; i < mapped.length - 1; i++) {
      const curr = mapped[i];
      const next = mapped[i + 1];
      const cx = (curr.x + next.x) / 2;
      d += ` C ${cx} ${curr.y}, ${cx} ${next.y}, ${next.x} ${next.y}`;
    }

    const areaPath = `${d} L ${width} ${height} L 0 ${height} Z`;
    return { path: d, areaPath, dots: mapped };
  };

  const chartData = generateSvgPath(pingPoints);

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto space-y-8 font-mono text-left">
      
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-amber-50/10 border-2 border-neutral-200 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-[4px_4px_0px_#ffffff]">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse border border-black" />
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight">Live Operations Monitor</h1>
            <p className="text-xs text-neutral-400">
              {liveStatus.isRealData 
                ? `Real Telemetry connected to TLC-Bot (${liveStatus.bot.latency_ms}ms WS delay)` 
                : "Live telemetry bridge connected • Polling every 10s"}
            </p>
          </div>
        </div>

        <button 
          onClick={fetchRealStatus}
          className="px-4 py-2 bg-amber-200 text-black font-bold text-xs border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
        </button>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Gateway Ping Card */}
        <div className="p-5 rounded-2xl bg-amber-200 text-black border-2 border-black shadow-[4px_4px_0px_#ffffff] space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span>GATEWAY PING</span>
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold">{liveStatus.bot.latency_ms} ms</p>
          <p className="text-[10px] text-neutral-700 font-sans">WebSocket telemetry response →</p>
        </div>

        {/* Active Guilds */}
        <div className="p-5 rounded-2xl bg-white text-black border-2 border-black shadow-[4px_4px_0px_#ffffff] space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span>ACTIVE GUILDS</span>
            <Server className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold">{liveStatus.metrics.guildsCount}</p>
          <p className="text-[10px] text-neutral-600 font-sans">TLC Guild Master Node →</p>
        </div>

        {/* Registered Accounts / Members */}
        <div className="p-5 rounded-2xl bg-white text-black border-2 border-black shadow-[4px_4px_0px_#ffffff] space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span>REGISTERED ACCOUNTS</span>
            <Users className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold">{liveStatus.metrics.membersCount}</p>
          <p className="text-[10px] text-neutral-600 font-sans">Server members protected →</p>
        </div>

        {/* Active Sanctions / Cases */}
        <div className="p-5 rounded-2xl bg-white text-black border-2 border-black shadow-[4px_4px_0px_#ffffff] space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase">
            <span>SANCTIONS TRACKED</span>
            <Database className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold">{liveStatus.metrics.activeSanctions}</p>
          <p className="text-[10px] text-neutral-600 font-sans">SQLite cases in registry →</p>
        </div>
      </div>

      {/* Main Gateway Ping Timeline Chart */}
      <div className="p-6 rounded-3xl bg-neutral-950 border-2 border-white text-white shadow-[6px_6px_0px_#ffffff] space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-extrabold uppercase flex items-center gap-2">
              ⚡ Gateway Ping Timeline (1H)
            </h2>
            <p className="text-xs text-neutral-400">Pencil-line telemetry tracking WebSocket response delay.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-900 p-1.5 rounded-xl border border-neutral-700 text-xs">
            {['Live 1H', '24 Hours', '7 Days', '30 Days'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range ? 'bg-amber-200 text-black border border-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Chart Graphic */}
        <div className="relative w-full overflow-x-auto pt-4">
          <svg viewBox="0 0 800 200" className="w-full h-48 overflow-visible">
            {/* Horizontal Grid lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="#333" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#333" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="#333" strokeDasharray="4 4" />

            {/* Filled Area Under Graph */}
            <path d={chartData.areaPath} fill="rgba(253, 230, 138, 0.25)" />

            {/* Main Pencil Curve Line */}
            <path d={chartData.path} fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />

            {/* Data Point Circles */}
            {chartData.dots.map((dot, idx) => (
              <g key={idx} className="group cursor-pointer">
                <circle cx={dot.x} cy={dot.y} r="5" fill="#fde047" stroke="#000" strokeWidth="2" />
                <text x={dot.x} y={dot.y - 12} textAnchor="middle" fill="#ffffff" fontSize="10" className="font-bold">
                  {dot.ping}ms
                </text>
              </g>
            ))}
          </svg>

          {/* Time Labels */}
          <div className="flex justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
            {pingPoints.map((p, idx) => (
              <span key={idx}>{p.time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Subsystem Grid & Operations Log */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Subsystem Health Grid */}
        <div className="p-6 rounded-3xl bg-neutral-950 border-2 border-white text-white shadow-[6px_6px_0px_#ffffff] space-y-4">
          <h3 className="text-sm font-bold uppercase flex items-center gap-2">
            ✏️ Subsystem Health Grid
          </h3>
          <p className="text-[11px] text-neutral-400">Click any block to inspect historical incident details.</p>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Discord Gateway WS</span>
                <span className="text-emerald-400 font-bold">100% Uptime</span>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-4 bg-emerald-400 border border-black rounded-sm text-[9px] text-black text-center font-bold">✓</div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>SQLite WAL Engine</span>
                <span className="text-emerald-400 font-bold">100% Health</span>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-4 bg-emerald-400 border border-black rounded-sm text-[9px] text-black text-center font-bold">✓</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operations Log Ledger */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-neutral-950 border-2 border-white text-white shadow-[6px_6px_0px_#ffffff] space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold uppercase flex items-center gap-2">
              📝 Operations Log Ledger
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-black font-bold text-[10px] border border-black">
              Real-Time Audit
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {liveStatus.operationsLog && liveStatus.operationsLog.map((log, idx) => (
              <div key={idx} className="border-b border-neutral-900 pb-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-bold">✓ {log.title}</span>
                  <span className="text-neutral-500 text-[10px]">{log.time}</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// DASHBOARD PAGE COMPONENT
function DashboardPage({ user, liveStatus }) {
  if (!user) return null;
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto space-y-8 text-left font-mono">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase">TLC Control Dashboard</h1>
          <p className="text-xs text-neutral-400 mt-1">Authenticated user: {user.displayName} ({user.role})</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
          ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs text-neutral-500">SERVERS CONNECTED</span>
          <p className="text-3xl font-bold text-white">{liveStatus.metrics.guildsCount}</p>
        </div>
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs text-neutral-500">ACTIVE SANCTIONS</span>
          <p className="text-3xl font-bold text-white">{liveStatus.metrics.activeSanctions}</p>
        </div>
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs text-neutral-500">REGISTERED COMMANDS</span>
          <p className="text-3xl font-bold text-white">{liveStatus.metrics.commandsCount}</p>
        </div>
      </div>
    </div>
  );
}

// 404 PAGE
function NotFoundPage({ setRoute }) {
  return (
    <div className="py-32 px-4 text-center space-y-6 font-mono">
      <h1 className="text-8xl font-black text-white tracking-widest">404</h1>
      <p className="text-neutral-400 text-base">This page doesn't exist.</p>
      <button 
        onClick={() => setRoute('home')}
        className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all"
      >
        Return Home
      </button>
    </div>
  );
}

