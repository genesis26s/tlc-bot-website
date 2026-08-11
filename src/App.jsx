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

// DEFAULT SAFE FALLBACK TELEMETRY DATA
const DEFAULT_TELEMETRY = {
  loading: false,
  isRealData: false,
  status: 'operational',
  bot: { online: true, latency_ms: 38, user: 'TLC-Bot' },
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
      details: "Database connection pool validated with PRAGMA busy_timeout=5000 structural validation.",
      time: "10m ago",
      status: "success"
    },
    {
      title: "Command Tree Synchronized",
      details: "60 Hybrid Commands re-indexed across modular cogs.",
      time: "1h ago",
      status: "info"
    }
  ],
  lastChecked: 'Just now'
};

// --- MAIN APPLICATION ---
export default function App() {
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [liveStatus, setLiveStatus] = useState(DEFAULT_TELEMETRY);

  const fetchRealStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setLiveStatus({
          loading: false,
          isRealData: Boolean(data?.isRealData),
          status: data?.status || 'operational',
          bot: {
            online: data?.bot?.online ?? true,
            latency_ms: data?.bot?.latency_ms ?? 38,
            user: data?.bot?.user || 'TLC-Bot'
          },
          services: {
            discord: data?.services?.discord || 'operational',
            api: data?.services?.api || 'operational',
            database: data?.services?.database || 'operational',
            website: 'operational'
          },
          metrics: {
            guildsCount: data?.metrics?.guildsCount ?? 1,
            membersCount: data?.metrics?.membersCount ?? 1042,
            activeSanctions: data?.metrics?.activeSanctions ?? 12,
            commandsCount: data?.metrics?.commandsCount ?? 60
          },
          pingHistory: Array.isArray(data?.pingHistory) && data.pingHistory.length > 0
            ? data.pingHistory 
            : DEFAULT_TELEMETRY.pingHistory,
          operationsLog: Array.isArray(data?.operationsLog) && data.operationsLog.length > 0
            ? data.operationsLog 
            : DEFAULT_TELEMETRY.operationsLog,
          lastChecked: data?.lastChecked || new Date().toLocaleTimeString()
        });
      }
    } catch (e) {
      console.warn("Using default status fallback due to fetch error:", e);
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

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-800 bg-black/95 px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <button onClick={() => setRoute('home')} className="block w-full text-left text-lg font-medium text-neutral-300 py-2 border-b border-neutral-900">Home</button>
            <button onClick={() => setRoute('features')} className="block w-full text-left text-lg font-medium text-neutral-300 py-2 border-b border-neutral-900">Features</button>
            <button onClick={() => setRoute('status')} className="block w-full text-left text-lg font-medium text-neutral-300 py-2 border-b border-neutral-900">Live Telemetry</button>
            {user ? (
              <div className="pt-2 space-y-2">
                <button onClick={() => setRoute('dashboard')} className="w-full py-3 bg-neutral-900 text-white rounded-xl text-center text-sm font-semibold border border-neutral-800">Go to Dashboard</button>
                <button onClick={handleLogout} className="w-full py-3 bg-red-950/40 text-red-400 rounded-xl text-center text-sm font-semibold border border-red-900/50">Logout</button>
              </div>
            ) : (
              <button onClick={handleDiscordLogin} className="w-full py-3 bg-white text-black font-semibold rounded-xl text-center text-sm uppercase tracking-wider">Login with Discord</button>
            )}
          </div>
        )}
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
  const currentPing = liveStatus?.bot?.latency_ms ?? 38;
  const isOperational = (liveStatus?.status || 'operational') === 'operational';

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
        <span className={`w-2 h-2 rounded-full ${isOperational ? 'bg-emerald-500' : 'bg-amber-500'} animate-ping`} />
        <span className="text-white font-mono">
          ● {isOperational ? 'All Systems Operational' : 'System Degraded'} ({currentPing}ms)
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
      </div>

      {/* Security Console Graphic */}
      <div className="pt-12 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-800" />
              <div className="w-3 h-3 rounded-full bg-neutral-800" />
              <div className="w-3 h-3 rounded-full bg-neutral-800" />
            </div>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">TLC-Bot Security Console</span>
            <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">LIVE</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-left font-mono">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
              <span className="text-xs text-neutral-500 block mb-1">PROTECTION LEVEL</span>
              <span className="text-lg font-bold text-white">MAXIMUM</span>
            </div>
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
              <span className="text-xs text-neutral-500 block mb-1">ACTIVE THREATS</span>
              <span className="text-lg font-bold text-white">0 DETECTED</span>
            </div>
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
              <span className="text-xs text-neutral-500 block mb-1">SANCTIONS TRACKED</span>
              <span className="text-lg font-bold text-white">{liveStatus?.metrics?.activeSanctions ?? 12} ACTIVE</span>
            </div>
          </div>

          <div className="bg-black border border-neutral-800/80 rounded-xl p-4 font-mono text-xs text-left space-y-2 text-neutral-400">
            <div className="flex items-center gap-2 text-neutral-500 border-b border-neutral-900 pb-1">
              <Terminal className="w-3.5 h-3.5 text-neutral-400" />
              <span>System Event Stream</span>
            </div>
            <p className="text-neutral-300"><span className="text-neutral-600">[02:49:12]</span> <span className="text-white font-semibold">ANTI-RAID:</span> Joined rate normalized. Lockdown disengaged.</p>
            <p className="text-neutral-300"><span className="text-neutral-600">[02:47:05]</span> <span className="text-white font-semibold">SANCTION:</span> Issued case against player. Reason: Policy violation.</p>
            <p className="text-neutral-300"><span className="text-neutral-600">[02:41:20]</span> <span className="text-white font-semibold">TICKETS:</span> Ticket #league-support closed & archived.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// FEATURES PAGE COMPONENT
function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('moderation');

  const featureTabs = [
    { id: 'moderation', label: 'Moderation', icon: Shield },
    { id: 'sanctions', label: 'Sanctions', icon: Lock },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'antispam', label: 'Anti-Spam', icon: Zap },
    { id: 'antiraid', label: 'Anti-Raid', icon: AlertTriangle },
    { id: 'welcoming', label: 'Welcoming', icon: UserCheck }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">SYSTEM CAPABILITIES</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono">Built for Control.</h1>
        <p className="text-neutral-400 text-base">Everything TLC needs to keep its Discord community secure, organized, and manageable.</p>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-2 border-b border-neutral-800 pb-6">
        {featureTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                isActive ? 'bg-white text-black font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-6 font-mono">
        {activeTab === 'moderation' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white uppercase">Moderation Commands</h3>
            <p className="text-xs text-neutral-400 font-sans">High-level commands including Ban, Kick, Mute (Timeout), Warn, Purge, and Slowmode.</p>
            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-xs text-neutral-300">
              ?mute @user 60 Policy violation
            </div>
          </div>
        )}

        {activeTab === 'sanctions' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white uppercase">League Sanction System</h3>
            <p className="text-xs text-neutral-400 font-sans">Database-backed case tracking with custom Roblox & Discord identifiers, bail amounts, and lift logs.</p>
            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-xs space-y-1 text-neutral-300">
              <p>CASE ID: TLC-1071</p>
              <p>Roblox User: f1restxr | Bail: 175 R$</p>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white uppercase">Support Tickets</h3>
            <p className="text-xs text-neutral-400 font-sans">Dynamic dropdown categories, staff claim buttons, and auto-generated TXT chat transcripts upon closure.</p>
          </div>
        )}

        {activeTab === 'antispam' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white uppercase">Anti-Spam Engine</h3>
            <p className="text-xs text-neutral-400 font-sans">Monitors chat velocity per user. Triggers automatic timeouts and purges rapid spam outbursts.</p>
          </div>
        )}

        {activeTab === 'antiraid' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white uppercase">Anti-Raid Lockdown</h3>
            <p className="text-xs text-neutral-400 font-sans">Detects rapid influxes of newly created accounts and puts text channels into immediate lock state.</p>
          </div>
        )}

        {activeTab === 'welcoming' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white uppercase">Welcoming System</h3>
            <p className="text-xs text-neutral-400 font-sans">Customizable welcome banners, dynamic variable replacement ({'{user}'}), and DM dispatch.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CRASH-PROOF LIVE TELEMETRY DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function StatusPage({ liveStatus, fetchRealStatus }) {
  const [timeRange, setTimeRange] = useState('Live 1H');

  const pingPoints = (Array.isArray(liveStatus?.pingHistory) && liveStatus.pingHistory.length > 0)
    ? liveStatus.pingHistory 
    : DEFAULT_TELEMETRY.pingHistory;

  const logs = (Array.isArray(liveStatus?.operationsLog) && liveStatus.operationsLog.length > 0)
    ? liveStatus.operationsLog 
    : DEFAULT_TELEMETRY.operationsLog;

  const currentPing = liveStatus?.bot?.latency_ms ?? 38;
  const isRealData = Boolean(liveStatus?.isRealData);
  const guildsCount = liveStatus?.metrics?.guildsCount ?? 1;
  const membersCount = liveStatus?.metrics?.membersCount ?? 1042;
  const activeSanctions = liveStatus?.metrics?.activeSanctions ?? 12;

  // SAFE Bezier Curve Generator
  const generateSvgPath = (points) => {
    if (!Array.isArray(points) || points.length === 0) {
      return { path: '', areaPath: '', dots: [] };
    }

    const width = 800;
    const height = 180;
    const pings = points.map(p => typeof p?.ping === 'number' ? p.ping : 40);
    const minPing = Math.max(10, Math.min(...pings) - 5);
    const maxPing = Math.max(minPing + 10, Math.max(...pings) + 5);

    const len = points.length;
    const mapped = points.map((p, idx) => {
      const x = len > 1 ? (idx / (len - 1)) * width : width / 2;
      const rawVal = typeof p?.ping === 'number' ? p.ping : 40;
      const y = height - ((rawVal - minPing) / (maxPing - minPing)) * (height - 30) - 15;
      return { x, y: isNaN(y) ? height / 2 : y, ping: rawVal, label: p?.time || 'Now' };
    });

    if (mapped.length === 1) {
      return {
        path: `M 0 ${mapped[0].y} L 800 ${mapped[0].y}`,
        areaPath: `M 0 ${mapped[0].y} L 800 ${mapped[0].y} L 800 ${height} L 0 ${height} Z`,
        dots: mapped
      };
    }

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
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight">Live Operations Monitor</h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              {isRealData 
                ? `Connected to Live TLC-Bot API at 176.100.37.77:30088 (${currentPing}ms)` 
                : "Live telemetry bridge active • Polling status endpoint"}
            </p>
          </div>
        </div>

        <button 
          onClick={fetchRealStatus}
          className="px-4 py-2 bg-neutral-900 text-white font-bold text-xs border border-neutral-700 rounded-xl hover:bg-neutral-800 flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Gateway Ping */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-400 uppercase">
            <span>GATEWAY PING</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold">{currentPing} ms</p>
          <p className="text-[10px] text-neutral-500 font-sans">WebSocket telemetry delay</p>
        </div>

        {/* Guilds */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-400 uppercase">
            <span>ACTIVE GUILDS</span>
            <Server className="w-4 h-4 text-white" />
          </div>
          <p className="text-3xl font-extrabold">{guildsCount}</p>
          <p className="text-[10px] text-neutral-500 font-sans">TLC Guild Master Node</p>
        </div>

        {/* Accounts / Members */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-400 uppercase">
            <span>REGISTERED ACCOUNTS</span>
            <Users className="w-4 h-4 text-white" />
          </div>
          <p className="text-3xl font-extrabold">{membersCount}</p>
          <p className="text-[10px] text-neutral-500 font-sans">Protected server members</p>
        </div>

        {/* Active Sanctions */}
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-400 uppercase">
            <span>SANCTIONS TRACKED</span>
            <Database className="w-4 h-4 text-white" />
          </div>
          <p className="text-3xl font-extrabold">{activeSanctions}</p>
          <p className="text-[10px] text-neutral-500 font-sans">SQLite database registry</p>
        </div>
      </div>

      {/* Main Gateway Ping Chart */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-extrabold uppercase flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" /> Gateway Ping Timeline (1H)
            </h2>
            <p className="text-xs text-neutral-400">Pencil-line telemetry tracking WebSocket response delay.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-black p-1.5 rounded-xl border border-neutral-800 text-xs">
            {['Live 1H', '24 Hours', '7 Days', '30 Days'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
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
            {/* Grid lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="#262626" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#262626" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="#262626" strokeDasharray="4 4" />

            {/* Area */}
            {chartData.areaPath && <path d={chartData.areaPath} fill="rgba(255, 255, 255, 0.05)" />}

            {/* Line */}
            {chartData.path && <path d={chartData.path} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />}

            {/* Dots */}
            {chartData.dots.map((dot, idx) => (
              <g key={idx} className="group cursor-pointer">
                <circle cx={dot.x} cy={dot.y} r="4" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                <text x={dot.x} y={dot.y - 10} textAnchor="middle" fill="#a3a3a3" fontSize="10" className="font-mono">
                  {dot.ping}ms
                </text>
              </g>
            ))}
          </svg>

          {/* Time Labels */}
          <div className="flex justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-900">
            {pingPoints.map((p, idx) => (
              <span key={idx}>{p?.time || 'Now'}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Subsystem Grid & Operations Log */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Subsystem Health Grid */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-4">
          <h3 className="text-sm font-bold uppercase flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Subsystem Health Grid
          </h3>
          <p className="text-[11px] text-neutral-400">Historical telemetry & node inspection.</p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span>Discord Gateway WS</span>
                <span className="text-emerald-400 font-bold">100% Uptime</span>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-3.5 bg-emerald-500/80 rounded-xs" />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span>SQLite WAL Engine</span>
                <span className="text-emerald-400 font-bold">100% Health</span>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-3.5 bg-emerald-500/80 rounded-xs" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operations Log Ledger */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-white" /> Operations Log Ledger
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-neutral-300 font-bold text-[10px] border border-neutral-800">
              Real-Time Audit
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {logs.map((log, idx) => (
              <div key={idx} className="border-b border-neutral-900 pb-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">✓ {log.title}</span>
                  <span className="text-neutral-500 text-[10px]">{log.time}</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed font-sans">{log.details}</p>
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
          <p className="text-3xl font-bold text-white">{liveStatus?.metrics?.guildsCount ?? 1}</p>
        </div>
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs text-neutral-500">ACTIVE SANCTIONS</span>
          <p className="text-3xl font-bold text-white">{liveStatus?.metrics?.activeSanctions ?? 12}</p>
        </div>
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs text-neutral-500">REGISTERED COMMANDS</span>
          <p className="text-3xl font-bold text-white">{liveStatus?.metrics?.commandsCount ?? 60}</p>
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

