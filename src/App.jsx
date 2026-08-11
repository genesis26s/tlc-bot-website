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
  Bot
} from 'lucide-react';

// --- LOGO COMPONENT (Reads assets/logo.png with fallback) ---
function BotLogo({ className = "w-10 h-10" }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`${className} rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white`}>
        <Shield className="w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <img 
      src="/assets/logo.png" 
      alt="TLC-Bot Logo" 
      onError={() => setImgError(true)}
      className={`${className} object-contain rounded-xl border border-neutral-800 bg-neutral-950 p-1`}
    />
  );
}

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Live status state loaded from /api/status Vercel route
  const [liveStatus, setLiveStatus] = useState({
    loading: true,
    isRealData: false,
    status: 'operational',
    bot: { online: true, latency_ms: 38, user: 'TLC-Bot' },
    services: { discord: 'operational', api: 'operational', database: 'operational', website: 'operational' },
    metrics: { guildsCount: 1, membersCount: 1042, activeSanctions: 12, commandsCount: 54 },
    lastChecked: 'Just now'
  });

  const fetchRealStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setLiveStatus({
          loading: false,
          ...data
        });
      }
    } catch (e) {
      setLiveStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchRealStatus();
    const interval = setInterval(fetchRealStatus, 15000); // Poll every 15s
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
      {/* Background Animated Mesh Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-neutral-800/30 blur-[140px] animate-pulse duration-[10000ms]" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-neutral-900/50 blur-[160px] animate-pulse duration-[8000ms]" />
        <div className="absolute -bottom-[20%] left-[30%] w-[700px] h-[700px] rounded-full bg-neutral-800/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#17171715_1px,transparent_1px),linear-gradient(to_bottom,#17171715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
            <button onClick={() => setRoute('status')} className={`transition-colors hover:text-white ${route === 'status' ? 'text-white font-semibold' : ''}`}>Status</button>
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
            <button onClick={() => setRoute('status')} className="block w-full text-left text-lg font-medium text-neutral-300 py-2 border-b border-neutral-900">Status</button>
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
  return (
    <div className="space-y-24 pb-20 pt-16 px-4 max-w-7xl mx-auto text-center">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4">
          <BotLogo className="w-16 h-16 sm:w-24 sm:h-24" />
          <h1 className="text-6xl sm:text-8xl font-black uppercase text-white font-mono">
            TLC-BOT
          </h1>
        </div>
        <h2 className="text-2xl text-neutral-300 font-light">Professional moderation & security for your Discord server.</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">Built specifically for TLC. Keeping your community secure, organized, and under control.</p>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={handleDiscordLogin} className="px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all">Login with Discord</button>
        <button onClick={() => setRoute('features')} className="px-8 py-4 rounded-full bg-neutral-900 text-white border border-neutral-800 text-xs uppercase tracking-widest">Explore Features</button>
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
              <span className="text-lg font-bold text-white">{liveStatus.metrics.activeSanctions} ACTIVE</span>
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

      <div className="max-w-4xl mx-auto rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-6">
        {activeTab === 'moderation' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white font-mono uppercase">Moderation Commands</h3>
            <p className="text-xs text-neutral-400">High-level commands including Ban, Kick, Mute (Timeout), Warn, Purge, and Slowmode.</p>
            <div className="bg-black border border-neutral-800 rounded-xl p-4 font-mono text-xs text-neutral-300">
              ?mute @user 60 Policy violation
            </div>
          </div>
        )}

        {activeTab === 'sanctions' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white font-mono uppercase">League Sanction System</h3>
            <p className="text-xs text-neutral-400">Database-backed case tracking with custom Roblox & Discord identifiers, bail amounts, and lift logs.</p>
            <div className="bg-black border border-neutral-800 rounded-xl p-4 font-mono text-xs space-y-1 text-neutral-300">
              <p>CASE ID: TLC-1071</p>
              <p>Roblox User: f1restxr | Bail: 175 R$</p>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white font-mono uppercase">Support Tickets</h3>
            <p className="text-xs text-neutral-400">Dynamic dropdown categories, staff claim buttons, and auto-generated TXT chat transcripts upon closure.</p>
          </div>
        )}

        {activeTab === 'antispam' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white font-mono uppercase">Anti-Spam Engine</h3>
            <p className="text-xs text-neutral-400">Monitors chat velocity per user. Triggers automatic timeouts and purges rapid spam outbursts.</p>
          </div>
        )}

        {activeTab === 'antiraid' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white font-mono uppercase">Anti-Raid Lockdown</h3>
            <p className="text-xs text-neutral-400">Detects rapid influxes of newly created accounts and puts text channels into immediate lock state.</p>
          </div>
        )}

        {activeTab === 'welcoming' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold text-white font-mono uppercase">Welcoming System</h3>
            <p className="text-xs text-neutral-400">Customizable welcome banners, dynamic variable replacement ({'{user}'}), and DM dispatch.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// STATUS PAGE COMPONENT
function StatusPage({ liveStatus, fetchRealStatus }) {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-8 text-left">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white font-mono uppercase">TLC-Bot Status</h1>
          <p className="text-xs text-neutral-400 mt-1">
            {liveStatus.isRealData ? "Connected to Live TLC-Bot API" : "Simulated Local Status Mode"}
          </p>
        </div>
        <button onClick={fetchRealStatus} className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white rounded-full flex items-center gap-2 hover:bg-neutral-800">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${liveStatus.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
          <span className="font-bold text-white font-mono uppercase">{liveStatus.status.toUpperCase()}</span>
        </div>
        <span className="text-xs text-neutral-500 font-mono">Latency: {liveStatus.bot.latency_ms}ms</span>
      </div>

      <div className="space-y-2 font-mono text-xs">
        <div className="p-4 bg-black border border-neutral-800/80 rounded-xl flex justify-between">
          <span className="text-white">Discord Gateway</span>
          <span className="text-emerald-400">● Operational</span>
        </div>
        <div className="p-4 bg-black border border-neutral-800/80 rounded-xl flex justify-between">
          <span className="text-white">SQLite Database</span>
          <span className="text-emerald-400">● Operational</span>
        </div>
        <div className="p-4 bg-black border border-neutral-800/80 rounded-xl flex justify-between">
          <span className="text-white">Internal API</span>
          <span className="text-emerald-400">● Operational</span>
        </div>
      </div>
    </div>
  );
}

// DASHBOARD PAGE COMPONENT
function DashboardPage({ user, liveStatus }) {
  if (!user) return null;
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto space-y-8 text-left">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white font-mono uppercase">TLC Control Dashboard</h1>
          <p className="text-xs text-neutral-400 mt-1">Authenticated user: {user.displayName} ({user.role})</p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
          ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs font-mono text-neutral-500">SERVERS CONNECTED</span>
          <p className="text-3xl font-bold font-mono text-white">{liveStatus.metrics.guildsCount}</p>
        </div>
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs font-mono text-neutral-500">ACTIVE SANCTIONS</span>
          <p className="text-3xl font-bold font-mono text-white">{liveStatus.metrics.activeSanctions}</p>
        </div>
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <span className="text-xs font-mono text-neutral-500">REGISTERED COMMANDS</span>
          <p className="text-3xl font-bold font-mono text-white">{liveStatus.metrics.commandsCount}</p>
        </div>
      </div>
    </div>
  );
}

// 404 PAGE COMPONENT
function NotFoundPage({ setRoute }) {
  return (
    <div className="py-32 px-4 text-center space-y-6">
      <h1 className="text-8xl font-black font-mono text-white tracking-widest">404</h1>
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

