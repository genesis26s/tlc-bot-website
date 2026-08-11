import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Ticket, 
  UserCheck, 
  FileText, 
  Lock, 
  Zap, 
  RefreshCw, 
  LogOut, 
  User, 
  ChevronRight, 
  Activity, 
  Menu, 
  X, 
  Server, 
  Sliders, 
  Bell, 
  Search, 
  ExternalLink,
  Bot
} from 'lucide-react';

// --- LOGO COMPONENT WITH FALLBACK ---
function BotLogo({ className = "w-10 h-10" }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`${className} rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white`}>
        <Shield className="w-5 h-5" />
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

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [route]);

  // Handle Discord Login Simulation
  const handleDiscordLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setUser({
        id: '1295203178177892425',
        username: 'Genesis26',
        discriminator: '0',
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
      {/* Background Animated Monochrome Mesh Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-neutral-800/30 blur-[140px] animate-pulse duration-[10000ms]" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-neutral-900/50 blur-[160px] animate-pulse duration-[8000ms]" />
        <div className="absolute -bottom-[20%] left-[30%] w-[700px] h-[700px] rounded-full bg-neutral-800/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#17171715_1px,transparent_1px),linear-gradient(to_bottom,#17171715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-neutral-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setRoute('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <BotLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-lg uppercase font-mono text-white flex items-center gap-1.5">
                TLC-BOT
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">v2.5</span>
              </span>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase">Security System</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <button 
              onClick={() => setRoute('home')} 
              className={`transition-colors hover:text-white ${route === 'home' ? 'text-white font-semibold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setRoute('features')} 
              className={`transition-colors hover:text-white ${route === 'features' ? 'text-white font-semibold' : ''}`}
            >
              Features
            </button>
            <button 
              onClick={() => setRoute('status')} 
              className={`transition-colors hover:text-white ${route === 'status' ? 'text-white font-semibold' : ''}`}
            >
              Status
            </button>
          </nav>

          {/* Auth Menu / CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pl-3 pr-4 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all text-sm"
                >
                  <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover border border-neutral-700" />
                  <span className="font-medium text-white">{user.displayName}</span>
                  <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${userMenuOpen ? 'rotate-90' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2 border-b border-neutral-800/60">
                      <p className="text-xs font-semibold text-white">{user.displayName}</p>
                      <p className="text-[11px] text-neutral-500">{user.role}</p>
                    </div>
                    <button 
                      onClick={() => { setRoute('dashboard'); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors flex items-center gap-2 mt-1"
                    >
                      <Sliders className="w-3.5 h-3.5" /> Dashboard
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-2 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleDiscordLogin}
                disabled={isLoggingIn}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    Login with Discord
                  </>
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-800 bg-black/95 px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <button 
              onClick={() => setRoute('home')} 
              className="block w-full text-left text-lg font-medium text-neutral-300 py-2 border-b border-neutral-900"
            >
              Home
            </button>
            <button 
              onClick={() => setRoute('features')} 
              className="block w-full text-left text-lg font-medium text-neutral-300 py-2 border-b border-neutral-900"
            >
              Features
            </button>
            <button 
              onClick={() => setRoute('status')} 
              className="block w-full text-left text-lg font-medium text-neutral-300 py-2 border-b border-neutral-900"
            >
              Status
            </button>
            
            {user ? (
              <div className="pt-2 space-y-2">
                <button 
                  onClick={() => setRoute('dashboard')} 
                  className="w-full py-3 bg-neutral-900 text-white rounded-xl text-center text-sm font-semibold border border-neutral-800"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={handleLogout} 
                  className="w-full py-3 bg-red-950/40 text-red-400 rounded-xl text-center text-sm font-semibold border border-red-900/50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleDiscordLogin}
                className="w-full py-3 bg-white text-black font-semibold rounded-xl text-center text-sm uppercase tracking-wider"
              >
                Login with Discord
              </button>
            )}
          </div>
        )}
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 flex-grow">
        {route === 'home' && <HomePage setRoute={setRoute} handleDiscordLogin={handleDiscordLogin} />}
        {route === 'features' && <FeaturesPage setRoute={setRoute} />}
        {route === 'status' && <StatusPage />}
        {route === 'dashboard' && <DashboardPage user={user} setRoute={setRoute} />}
        {route === '404' && <NotFoundPage setRoute={setRoute} />}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-neutral-800/80 bg-black/90 backdrop-blur-md text-neutral-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <BotLogo className="w-6 h-6" />
              <span className="font-mono font-bold text-white uppercase tracking-widest text-sm">TLC-Bot</span>
            </div>
            <p className="text-neutral-500 text-center md:text-left">
              Professional moderation and automated security system for TLC.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-neutral-300">
            <button onClick={() => setRoute('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => setRoute('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => setRoute('status')} className="hover:text-white transition-colors">Status</button>
            <button onClick={handleDiscordLogin} className="hover:text-white transition-colors">Discord OAuth</button>
          </div>

          <div className="text-center md:text-right text-neutral-500">
            <p>© 2026 TLC-Bot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// PAGE: HOMEPAGE
// ============================================================================
function HomePage({ setRoute, handleDiscordLogin }) {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="pt-20 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-400 text-xs font-mono tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          DISCORD SECURITY & MODERATION
        </div>

        {/* Hero Headings */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-mono flex items-center justify-center gap-4">
            <BotLogo className="w-16 h-16 sm:w-20 sm:h-20" />
            TLC-BOT
          </h1>
          <h2 className="text-2xl sm:text-3xl text-neutral-300 font-light tracking-tight">
            Professional moderation & security for your Discord server.
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Built specifically for TLC. Designed to keep your community secure, organized, and entirely under control through real-time automation.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={handleDiscordLogin}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Login with Discord
          </button>
          <button 
            onClick={() => setRoute('features')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 text-white border border-neutral-800 font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 hover:border-neutral-700 transition-all"
          >
            Explore Features
          </button>
        </div>

        {/* Operational Status Pill */}
        <div className="pt-6">
          <div 
            onClick={() => setRoute('status')} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 cursor-pointer hover:border-neutral-600 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-white font-mono">● All Systems Operational</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          </div>
        </div>

        {/* Abstract Monochrome Interface Mockup */}
        <div className="pt-12 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
            {/* Interface Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-800" />
                <div className="w-3 h-3 rounded-full bg-neutral-800" />
                <div className="w-3 h-3 rounded-full bg-neutral-800" />
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">TLC-Bot Security Console</span>
              <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">LIVE</div>
            </div>

            {/* Grid Metrics Mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-left">
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
                <span className="text-xs text-neutral-500 font-mono block mb-1">PROTECTION LEVEL</span>
                <span className="text-lg font-bold text-white font-mono">MAXIMUM</span>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
                <span className="text-xs text-neutral-500 font-mono block mb-1">ACTIVE THREATS</span>
                <span className="text-lg font-bold text-white font-mono">0 DETECTED</span>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
                <span className="text-xs text-neutral-500 font-mono block mb-1">AUTOMATED ACTIONS</span>
                <span className="text-lg font-bold text-white font-mono">1,420 TODAY</span>
              </div>
            </div>

            {/* Console Log Feed */}
            <div className="bg-black border border-neutral-800/80 rounded-xl p-4 font-mono text-xs text-left space-y-2 text-neutral-400">
              <div className="flex items-center gap-2 text-neutral-500 border-b border-neutral-900 pb-1">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                <span>System Event Stream</span>
              </div>
              <p className="text-neutral-300"><span className="text-neutral-600">[02:49:12]</span> <span className="text-white font-semibold">ANTI-RAID:</span> Joined rate normalized. Lockdown disengaged.</p>
              <p className="text-neutral-300"><span className="text-neutral-600">[02:47:05]</span> <span className="text-white font-semibold">SANCTION:</span> Issued TLC-8491 against @user. Reason: Policy violation.</p>
              <p className="text-neutral-300"><span className="text-neutral-600">[02:41:20]</span> <span className="text-white font-semibold">TICKETS:</span> Ticket #league-support-22 closed & archived.</p>
            </div>
          </div>
        </div>
      </section>

      {/* "BUILT FOR TLC" SECTION */}
      <section className="py-16 border-y border-neutral-800/80 bg-neutral-950/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">TAILORED INFRASTRUCTURE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
              Built for TLC.
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              TLC-Bot consolidates moderation, automation, real-time logging, and server protection into one focused Discord application. Crafted specifically around TLC server requirements.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero Bloat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Custom Cogs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Hybrid Slash Support</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-left space-y-2">
              <Shield className="w-6 h-6 text-white mb-2" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Anti-Raid</h3>
              <p className="text-xs text-neutral-400">Automated lock-downs and join-rate threshold enforcement.</p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-left space-y-2">
              <Lock className="w-6 h-6 text-white mb-2" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Sanctions</h3>
              <p className="text-xs text-neutral-400">SQLite persistent case management and case tracking.</p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-left space-y-2">
              <Ticket className="w-6 h-6 text-white mb-2" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Tickets</h3>
              <p className="text-xs text-neutral-400">Interactive categories, staff claim & transcript export.</p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-left space-y-2">
              <FileText className="w-6 h-6 text-white mb-2" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Audit Logs</h3>
              <p className="text-xs text-neutral-400">Detailed event capturing across server interactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">SECURITY ARCHITECTURE</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
            Protection without the noise.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Focused automated protection designed to preserve server tranquility while defending against raids, spam outbreaks, and unmoderated infractions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-8 rounded-2xl bg-black border border-neutral-800 space-y-4 hover:border-neutral-600 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-mono">Fast Mitigation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Automated triggers detect abnormal join spikes or chat spam within milliseconds, taking precise corrective action before damage occurs.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-black border border-neutral-800 space-y-4 hover:border-neutral-600 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-mono">Granular Control</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Customizable parameters allow moderators to set explicit warning limits, timeout durations, and custom logging channels per server.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-black border border-neutral-800 space-y-4 hover:border-neutral-600 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-mono">Verification Gate</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              In-server Captcha verification prevents automated bot accounts from accessing sensitive community channels.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-10 sm:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
              Keep TLC under control.
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
              Moderation, protection, and management consolidated into one focused Discord bot infrastructure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button 
              onClick={handleDiscordLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all active:scale-95"
            >
              Login with Discord
            </button>
            <button 
              onClick={() => setRoute('features')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 text-white border border-neutral-800 font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all"
            >
              View Features
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// PAGE: FEATURES OVERVIEW & VISUAL DEMONSTRATIONS
// ============================================================================
function FeaturesPage({ setRoute }) {
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
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">SYSTEM CAPABILITIES</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono">
          Built for Control.
        </h1>
        <p className="text-neutral-400 text-base">
          Everything TLC needs to keep its Discord community secure, organized, and manageable.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 border-b border-neutral-800 pb-6">
        {featureTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                isActive 
                  ? 'bg-white text-black font-bold' 
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Mockups Container */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-6">
        
        {/* MODERATION MOCKUP */}
        {activeTab === 'moderation' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold text-white font-mono uppercase">Moderation Commands</h3>
              <p className="text-xs text-neutral-400">High-level commands including Ban, Kick, Mute (Timeout), Warn, Purge, and Slowmode.</p>
            </div>
            
            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-left font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-neutral-500 border-b border-neutral-900 pb-2">
                <span>SIMULATED CHAT COMMAND EXECUTION</span>
                <span className="text-[10px] text-emerald-400 font-semibold">HYBRID COMMAND</span>
              </div>
              <p className="text-neutral-300"><span className="text-white font-bold">?mute @user 60 Policy violation</span></p>
              <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-neutral-300 space-y-1">
                <p className="text-white font-bold">🔇 Member Muted</p>
                <p>Member: @user (3208710551)</p>
                <p>Moderator: Genesis26</p>
                <p>Duration: 60 minutes</p>
              </div>
            </div>
          </div>
        )}

        {/* SANCTIONS MOCKUP */}
        {activeTab === 'sanctions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold text-white font-mono uppercase">League Sanction System</h3>
              <p className="text-xs text-neutral-400">Database-backed case tracking with custom Roblox & Discord identifiers, bail amounts, and lift logs.</p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-left font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-neutral-500 border-b border-neutral-900 pb-2">
                <span>CASE ID: TLC-1071</span>
                <span className="text-[10px] bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-900">ACTIVE SANCTION</span>
              </div>
              <div className="space-y-1 text-neutral-300">
                <p><span className="text-neutral-500">Roblox User:</span> f1restxr</p>
                <p><span className="text-neutral-500">Discord ID:</span> 1448753371245707347</p>
                <p><span className="text-neutral-500">Expires:</span> 5gw</p>
                <p><span className="text-neutral-500">Bail:</span> 175 R$</p>
                <p><span className="text-neutral-500">Reason:</span> Violation of track parameters</p>
              </div>
            </div>
          </div>
        )}

        {/* TICKETS MOCKUP */}
        {activeTab === 'tickets' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold text-white font-mono uppercase">Support Tickets</h3>
              <p className="text-xs text-neutral-400">Dynamic dropdown categories, staff claim buttons, and auto-generated TXT chat transcripts upon closure.</p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-left font-mono text-xs space-y-3">
              <div className="p-3 bg-neutral-900/60 rounded-lg border border-neutral-800 space-y-2">
                <p className="text-white font-bold">TLC | Support Centre</p>
                <p className="text-neutral-400 text-[11px]">Select a category from the dropdown menu to open a private ticket.</p>
                <div className="w-full bg-neutral-950 border border-neutral-700 text-neutral-300 p-2.5 rounded-lg flex items-center justify-between">
                  <span>⁉️ League support</span>
                  <ChevronRight className="w-4 h-4 rotate-90 text-neutral-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANTI-SPAM MOCKUP */}
        {activeTab === 'antispam' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold text-white font-mono uppercase">Anti-Spam Engine</h3>
              <p className="text-xs text-neutral-400">Monitors chat velocity per user. Triggers automatic timeouts and purges rapid spam outbursts.</p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-left font-mono text-xs space-y-2 text-neutral-400">
              <p className="text-red-400">[DETECTION] @user triggered threshold (8 messages / 3s)</p>
              <p className="text-white">[AUTOMATION] Muted @user for 15 minutes. Purged 8 messages.</p>
            </div>
          </div>
        )}

        {/* ANTI-RAID MOCKUP */}
        {activeTab === 'antiraid' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold text-white font-mono uppercase">Anti-Raid Lockdown</h3>
              <p className="text-xs text-neutral-400">Detects rapid influxes of newly created accounts and puts text channels into immediate lock state.</p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-left font-mono text-xs space-y-2">
              <p className="text-amber-400 font-bold">🚨 RAID DETECTED — SERVER LOCKED</p>
              <p className="text-neutral-400">Automated lock engaged across all public text channels. Un-lock via <span className="text-white">?raidmode off</span>.</p>
            </div>
          </div>
        )}

        {/* WELCOMING MOCKUP */}
        {activeTab === 'welcoming' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold text-white font-mono uppercase">Welcoming System</h3>
              <p className="text-xs text-neutral-400">Customizable welcome banners, dynamic variable replacement ({'{user}'}, {'{server}'}), and optional DM dispatch.</p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-xl p-4 text-left font-mono text-xs space-y-2">
              <p className="text-white font-bold">Welcome to TLC!</p>
              <p className="text-neutral-400">Member: @NewUser (#1042) • Joined & verified</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: REAL-TIME BOT STATUS
// ============================================================================
function StatusPage() {
  const [lastChecked, setLastChecked] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastChecked((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastChecked(0);
      setIsRefreshing(false);
    }, 800);
  };

  const services = [
    { name: 'TLC-Bot Process', status: 'Operational', latency: '38ms' },
    { name: 'Discord Gateway', status: 'Operational', latency: '42ms' },
    { name: 'SQLite Database', status: 'Operational', latency: '1ms' },
    { name: 'API Server', status: 'Operational', latency: '18ms' },
    { name: 'Web Dashboard', status: 'Operational', latency: '12ms' }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight">
            TLC-Bot Status
          </h1>
          <p className="text-xs text-neutral-400 mt-1">Real-time status and availability across services.</p>
        </div>

        <button 
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono hover:text-white hover:bg-neutral-800 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Status
        </button>
      </div>

      {/* Main Operational Banner */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-lg font-bold text-white font-mono uppercase">All Systems Operational</span>
        </div>
        <span className="text-xs font-mono text-neutral-500">Updated {lastChecked}s ago</span>
      </div>

      {/* Individual Service Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Service Status</h3>
        
        <div className="space-y-2">
          {services.map((svc, i) => (
            <div key={i} className="p-4 rounded-xl bg-black border border-neutral-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-medium">{svc.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-neutral-500">{svc.latency}</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {svc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: AUTHENTICATED DASHBOARD (PLACEHOLDER FOR EXPANSION)
// ============================================================================
function DashboardPage({ user, setRoute }) {
  if (!user) {
    return (
      <div className="py-20 px-4 text-center space-y-6">
        <p className="text-neutral-400">Authentication required to view dashboard.</p>
        <button onClick={() => setRoute('home')} className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 text-left">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white font-mono uppercase">TLC Control Dashboard</h1>
          <p className="text-xs text-neutral-400 mt-1">Authenticated user: {user.displayName} ({user.role})</p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
          ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <span className="text-xs font-mono text-neutral-500">SERVERS CONNECTED</span>
          <p className="text-3xl font-bold font-mono text-white">1</p>
          <p className="text-[11px] text-neutral-400">TLC Guild Master Node</p>
        </div>
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <span className="text-xs font-mono text-neutral-500">ACTIVE SANCTIONS</span>
          <p className="text-3xl font-bold font-mono text-white">12</p>
          <p className="text-[11px] text-neutral-400">SQLite Database sync active</p>
        </div>
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <span className="text-xs font-mono text-neutral-500">OPEN TICKETS</span>
          <p className="text-3xl font-bold font-mono text-white">3</p>
          <p className="text-[11px] text-neutral-400">League & Verification support</p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-black border border-neutral-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-white font-mono uppercase">Live Control Features Coming Soon</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
          Full web-based sanction issuance, ticket transcripts viewer, and dynamic prefix management will be enabled in the upcoming web version.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: 404 NOT FOUND
// ============================================================================
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

