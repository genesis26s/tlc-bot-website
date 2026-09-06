/**
 * TLC-Bot Website — Premium Edition
 * Self-contained: no external CSS file needed
 * Uses Tailwind CDN (already in index.html) for all styling
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Inline SVG Icons (replacing lucide-react) ───────────────────────────────
const Icon = {
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  terminal: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  alert: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  activity: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  database: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  server: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  clock: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  code: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  cpu: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>,
  refresh: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  chevron: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>,
  alertCircle: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  bot: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>,
  sliders: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>,
  logOut: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  x: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  userCheck: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>,
  zap: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ticket: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>,
  lock: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
};

// ─── Defaults ────────────────────────────────────────────────────────────────
const DEFAULT_TELEMETRY = {
  isRealData: false,
  status: 'operational',
  bot: { online: true, latency_ms: 38, user: 'TLC-Bot' },
  services: { discord: 'operational', database: 'operational' },
  metrics: { guildsCount: 0, membersCount: 0, activeSanctions: 0, commandsCount: 0 },
  pingHistory: Array.from({ length: 12 }, (_, i) => ({ time: `${11 - i}m ago`, ping: 40 + Math.floor(Math.random() * 20) })),
};
const DEFAULT_FEATURE_FLAGS = { anti_spam: true, anti_raid: true, verification: true, welcome: true, goodbye: true, tickets: true, monitoring: true, logging: true, isRealData: false };
const DEFAULT_SERVER_INFO = { bot_user: 'TLC-Bot', discord_py_version: '—', python_version: '—', platform: '—', uptime_seconds: 0, primary_guild: null, isRealData: false };
const DEFAULT_RECENT_EVENTS = { events: [], isRealData: false };
const DEFAULT_RECENT_SANCTIONS = { sanctions: [], active_count: 0, isRealData: false };

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useNumberTicker(target, duration = 800) {
  const [value, setValue] = useState(0);
  const startRef = useRef(0);
  const startValueRef = useRef(0);
  useEffect(() => {
    startValueRef.current = value;
    startRef.current = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(startValueRef.current + (target - startValueRef.current) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return value;
}

function timeAgo(date) {
  if (!date) return 'never';
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function formatUptime(s) {
  if (!s || s < 0) return '—';
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ─── Mesh Gradient Background (inline) ───────────────────────────────────────
function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute rounded-full opacity-30 blur-3xl"
        style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
          top: '-20%', left: '-10%',
          animation: 'drift1 20s ease-in-out infinite'
        }}
      />
      <div
        className="absolute rounded-full opacity-25 blur-3xl"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          bottom: '-20%', right: '-10%',
          animation: 'drift2 25s ease-in-out infinite'
        }}
      />
      <div
        className="absolute rounded-full opacity-20 blur-3xl"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'drift3 30s ease-in-out infinite'
        }}
      />
      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(100px,50px) scale(1.1)} 66%{transform:translate(-50px,100px) scale(0.9)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-100px,-80px) scale(1.15)} }
        @keyframes drift3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-40%,-60%) scale(1.2)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-soft { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ping-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(2);opacity:0} }
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) backwards; }
        .stagger-1 { animation-delay: 50ms; }
        .stagger-2 { animation-delay: 100ms; }
        .stagger-3 { animation-delay: 150ms; }
        .stagger-4 { animation-delay: 200ms; }
        .stagger-5 { animation-delay: 250ms; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255,255,255,0.08); }
        .glass-strong { background: rgba(255,255,255,0.05); backdrop-filter: blur(40px) saturate(200%); -webkit-backdrop-filter: blur(40px) saturate(200%); border: 1px solid rgba(255,255,255,0.1); }
        .glass-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden; }
        .glass-card:hover { transform: translateY(-2px); }
        .glass-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent 50%, rgba(255,255,255,0.02)); pointer-events: none; opacity: 0; transition: opacity 0.4s; }
        .glass-card:hover::before { opacity: 1; }
        .status-dot { position: relative; display: inline-block; width: 8px; height: 8px; border-radius: 50%; }
        .status-dot::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; background: inherit; animation: ping-ring 2s ease-in-out infinite; }
        .status-dot.online { background: #10b981; box-shadow: 0 0 12px rgba(16,185,129,0.6); }
        .status-dot.offline { background: #f59e0b; box-shadow: 0 0 12px rgba(245,158,11,0.6); }
        .status-dot.error { background: #ef4444; box-shadow: 0 0 12px rgba(239,68,68,0.6); }
        .number-ticker { font-variant-numeric: tabular-nums; }
        .btn-press { transition: transform 0.15s cubic-bezier(0.4,0,0.2,1); }
        .btn-press:active { transform: scale(0.97); }
        .smooth { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; }
        .font-mono { font-family: 'JetBrains Mono', 'SF Mono', Menlo, Monaco, monospace; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 999px; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </div>
  );
}

// ─── Status Dot ──────────────────────────────────────────────────────────────
function StatusDot({ online, error }) {
  return <span className={`status-dot ${error ? 'error' : online ? 'online' : 'offline'}`} />;
}

// ─── Bot Logo ────────────────────────────────────────────────────────────────
function BotLogo({ className = "w-8 h-8" }) {
  const [idx, setIdx] = useState(0);
  const sources = ["/assets/logo.png", "/logo.png"];
  if (idx >= sources.length) {
    return <div className={`${className} rounded-2xl glass flex items-center justify-center text-white/80`}>{Icon.shield}</div>;
  }
  return <img src={sources[idx]} alt="TLC-Bot" onError={() => setIdx(p => p + 1)} className={`${className} object-contain rounded-2xl glass p-1.5`} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [authError, setAuthError] = useState(() => {
    if (typeof window === 'undefined') return null;
    const p = new URLSearchParams(window.location.search);
    const err = p.get('auth_error');
    if (err) { p.delete('auth_error'); window.history.replaceState({}, '', window.location.pathname + (p.toString() ? '?' + p : '')); }
    return err;
  });

  const [liveStatus, setLiveStatus] = useState(DEFAULT_TELEMETRY);
  const [connectionError, setConnectionError] = useState(null);
  const [lastSuccessTime, setLastSuccessTime] = useState(null);
  const [recentEvents, setRecentEvents] = useState(DEFAULT_RECENT_EVENTS);
  const [recentSanctions, setRecentSanctions] = useState(DEFAULT_RECENT_SANCTIONS);
  const [featureFlags, setFeatureFlags] = useState(DEFAULT_FEATURE_FLAGS);
  const [serverInfo, setServerInfo] = useState(DEFAULT_SERVER_INFO);

  const abortRef = useRef(null);

  // Restore session
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!cancelled && res.ok) setUser(await res.json());
      } catch (e) {}
      finally { if (!cancelled) setAuthLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  const fetchWithTimeout = useCallback(async (url, ms = 5000) => {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), ms);
    try {
      const res = await fetch(url, { signal: c.signal, credentials: 'include', cache: 'no-store' });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally { clearTimeout(t); }
  }, []);

  const fetchAll = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const data = await fetchWithTimeout('/api/status');
      setLiveStatus({
        isRealData: Boolean(data?.isRealData),
        status: data?.status || 'operational',
        bot: { online: data?.bot?.online ?? true, latency_ms: data?.bot?.latency_ms ?? 38, user: data?.bot?.user || 'TLC-Bot' },
        services: { discord: data?.services?.discord || 'operational', database: data?.services?.database || 'operational' },
        metrics: {
          guildsCount: data?.metrics?.guildsCount ?? 0,
          membersCount: data?.metrics?.membersCount ?? 0,
          activeSanctions: data?.metrics?.activeSanctions ?? 0,
          commandsCount: data?.metrics?.commandsCount ?? 0
        },
        pingHistory: data?.pingHistory || DEFAULT_TELEMETRY.pingHistory,
      });
      setConnectionError(null);
      setLastSuccessTime(new Date());
    } catch (e) {
      if (e.name !== 'AbortError') setConnectionError(e.message);
    }
    try { const d = await fetchWithTimeout('/api/recent-events?limit=5'); setRecentEvents({ events: d.events || [], isRealData: Boolean(d.isRealData) }); } catch (e) {}
    try { const d = await fetchWithTimeout('/api/recent-sanctions?limit=3'); setRecentSanctions({ sanctions: d.sanctions || [], active_count: d.active_count || 0, isRealData: Boolean(d.isRealData) }); } catch (e) {}
    try { const d = await fetchWithTimeout('/api/config'); setFeatureFlags({ ...DEFAULT_FEATURE_FLAGS, ...d }); } catch (e) {}
    try { const d = await fetchWithTimeout('/api/server-info'); setServerInfo({ ...DEFAULT_SERVER_INFO, ...d }); } catch (e) {}
  }, [fetchWithTimeout]);

  useEffect(() => {
    fetchAll();
    let interval = setInterval(fetchAll, 30000);
    const vis = () => {
      if (document.hidden) { clearInterval(interval); interval = null; }
      else { fetchAll(); if (!interval) interval = setInterval(fetchAll, 30000); }
    };
    document.addEventListener('visibilitychange', vis);
    return () => { clearInterval(interval); document.removeEventListener('visibilitychange', vis); };
  }, [fetchAll]);

  useEffect(() => { window.scrollTo(0, 0); setMobileMenuOpen(false); }, [route]);

  useEffect(() => {
    const h = (e) => { if (e.key === 'r' && !e.ctrlKey && !e.metaKey && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) fetchAll(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [fetchAll]);

  const handleLogin = () => { setIsLoggingIn(true); window.location.href = '/api/auth/login'; };
  const handleLogout = async () => {
    setUserMenuOpen(false);
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch (e) {}
    setUser(null);
    if (route === 'dashboard') setRoute('home');
  };

  return (
    <div className="min-h-screen text-white">
      <MeshBackground />

      {authError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] glass-strong rounded-2xl px-4 py-2.5 flex items-center gap-3 text-sm border border-red-500/20 animate-fade-up">
          <span className="text-red-400">{Icon.alertCircle}</span>
          <span>{authError === 'access_denied' ? 'Login cancelled' : 'Login failed'}</span>
          <button onClick={() => setAuthError(null)} className="text-white/40 hover:text-white ml-2">{Icon.x}</button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-4 z-50 mx-4 mt-4">
        <div className="max-w-6xl mx-auto glass-strong rounded-2xl px-4 h-14 flex items-center justify-between">
          <div onClick={() => setRoute('home')} className="flex items-center gap-2.5 cursor-pointer smooth hover:opacity-80">
            <BotLogo className="w-7 h-7" />
            <span className="font-semibold text-sm tracking-tight">TLC-Bot</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {[{ r: 'home', l: 'Home' }, { r: 'features', l: 'Features' }, { r: 'status', l: 'Status' }].map(({ r, l }) => (
              <button key={r} onClick={() => setRoute(r)} className={`px-3 py-1.5 rounded-xl smooth ${route === r ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>{l}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {authLoading ? (
              <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-xl glass btn-press">
                  <img src={user.avatar || `https://cdn.discordapp.com/embed/avatars/${(parseInt(user.id) >> 22) % 6}.png`} alt="" className="w-6 h-6 rounded-lg" />
                  <span className="text-sm font-medium pr-2 hidden sm:inline">{user.displayName || user.username}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-strong rounded-2xl p-2 animate-fade-up">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-sm font-medium">{user.displayName || user.username}</p>
                      <p className="text-xs text-white/50">@{user.username}</p>
                    </div>
                    <button onClick={() => { setRoute('dashboard'); setUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-white/5 flex items-center gap-2 mt-1">
                      {Icon.sliders} Dashboard
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-white/5 flex items-center gap-2 text-red-400">
                      {Icon.logOut} Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLogin} disabled={isLoggingIn} className="bg-white text-black px-4 py-1.5 rounded-xl text-sm font-medium btn-press smooth hover:bg-white/90 flex items-center gap-2 disabled:opacity-50">
                {isLoggingIn ? <span className="animate-spin inline-block">{Icon.refresh}</span> : Icon.bot}
                <span className="hidden sm:inline">{isLoggingIn ? 'Redirecting…' : 'Sign in'}</span>
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-1.5 glass rounded-xl">
              {mobileMenuOpen ? Icon.x : Icon.menu}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden max-w-6xl mx-auto mt-2 glass-strong rounded-2xl p-2 animate-fade-up">
            {[{ r: 'home', l: 'Home' }, { r: 'features', l: 'Features' }, { r: 'status', l: 'Status' }].map(({ r, l }) => (
              <button key={r} onClick={() => setRoute(r)} className={`w-full text-left px-4 py-3 rounded-xl text-sm ${route === r ? 'bg-white/10' : 'hover:bg-white/5'}`}>{l}</button>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10 pt-24">
        {route === 'home' && <HomePage liveStatus={liveStatus} recentEvents={recentEvents} featureFlags={featureFlags} serverInfo={serverInfo} setRoute={setRoute} handleLogin={handleLogin} isLoggingIn={isLoggingIn} />}
        {route === 'features' && <FeaturesPage recentSanctions={recentSanctions} featureFlags={featureFlags} liveStatus={liveStatus} />}
        {route === 'status' && <StatusPage liveStatus={liveStatus} serverInfo={serverInfo} fetchAll={fetchAll} connectionError={connectionError} lastSuccessTime={lastSuccessTime} />}
        {route === 'dashboard' && <DashboardPage user={user} liveStatus={liveStatus} recentSanctions={recentSanctions} featureFlags={featureFlags} serverInfo={serverInfo} />}
      </main>

      <footer className="relative z-10 max-w-6xl mx-auto px-4 py-12 mt-24 text-center text-xs text-white/30">
        <p>© 2026 TLC-Bot — Crafted with care</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════
function HomePage({ liveStatus, recentEvents, featureFlags, serverInfo, setRoute, handleLogin, isLoggingIn }) {
  const ping = liveStatus?.bot?.latency_ms ?? 38;
  const sanctions = liveStatus?.metrics?.activeSanctions ?? 0;
  const members = liveStatus?.metrics?.membersCount ?? 0;
  const commands = liveStatus?.metrics?.commandsCount ?? 0;
  const animPing = useNumberTicker(ping);
  const animSanctions = useNumberTicker(sanctions);
  const animMembers = useNumberTicker(members);
  const animCommands = useNumberTicker(commands);
  const isOp = (liveStatus?.status || 'operational') === 'operational';

  const enabled = ['anti_spam', 'anti_raid', 'verification', 'monitoring'].filter(f => featureFlags?.[f]).length;
  const level = enabled === 4 ? 'Maximum' : enabled >= 2 ? 'High' : enabled >= 1 ? 'Partial' : 'Minimal';

  const events = (recentEvents?.events || []).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      <section className="text-center pt-12 pb-20 animate-fade-up">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs mb-8">
          <StatusDot online={isOp} />
          <span className="text-white/70">{isOp ? 'All systems operational' : 'Degraded'}</span>
        </div>
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-[0.95] mb-6">
          TLC<span className="text-white/30">-</span>Bot
        </h1>
        <p className="text-xl sm:text-2xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
          Infrastructure for moderation,<br />sanctions, and security.
        </p>
        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          <button onClick={handleLogin} disabled={isLoggingIn} className="bg-white text-black px-6 py-3 rounded-2xl font-medium btn-press smooth hover:scale-[1.02] disabled:opacity-50 flex items-center gap-2">
            {isLoggingIn ? <span className="animate-spin inline-block">{Icon.refresh}</span> : Icon.bot}
            {isLoggingIn ? 'Redirecting…' : 'Sign in with Discord'}
          </button>
          <button onClick={() => setRoute('status')} className="glass px-6 py-3 rounded-2xl font-medium btn-press smooth hover:bg-white/5 flex items-center gap-2">
            Live Telemetry {Icon.chevron}
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up stagger-2">
        <div className="md:col-span-2 glass-card glass rounded-3xl p-8">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3 font-mono">Gateway Ping</div>
          <div className="flex items-baseline gap-3">
            <span className="text-7xl font-bold number-ticker">{animPing}</span>
            <span className="text-2xl text-white/40">ms</span>
          </div>
          <div className="mt-4 text-sm text-white/50">
            {serverInfo?.isRealData && serverInfo?.primary_guild ? `Connected to ${serverInfo.primary_guild.name}` : 'Demo data — backend not connected'}
          </div>
        </div>
        <div className="glass-card glass rounded-3xl p-8">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3 font-mono">Sanctions</div>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold number-ticker">{animSanctions}</span>
            <span className="text-lg text-white/40">active</span>
          </div>
        </div>
        <div className="glass-card glass rounded-3xl p-8">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3 font-mono">Members</div>
          <div className="text-5xl font-bold number-ticker">{animMembers.toLocaleString()}</div>
        </div>
        <div className="glass-card glass rounded-3xl p-8">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3 font-mono">Commands</div>
          <div className="text-5xl font-bold number-ticker">{animCommands}</div>
        </div>
        <div className="glass-card glass rounded-3xl p-8">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3 font-mono">Protection</div>
          <div className="text-2xl font-semibold mb-3">{level}</div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full smooth" style={{ width: `${(enabled / 4) * 100}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
          <div className="text-xs text-white/40 mt-2">{enabled}/4 features enabled</div>
        </div>
      </section>

      <section className="mt-4 glass-card glass rounded-3xl p-6 animate-fade-up stagger-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">{Icon.terminal} Activity</h3>
          <span className="text-xs text-white/40 font-mono">{recentEvents?.isRealData ? 'LIVE' : 'OFFLINE'}</span>
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          {events.length > 0 ? events.map((e, i) => (
            <div key={i} className="flex items-baseline gap-3 py-1.5 border-b border-white/5 last:border-0">
              <span className="text-white/30 text-[10px] tabular-nums">{(e.timestamp || '').slice(11, 16) || '—'}</span>
              <span className="text-white/90 font-medium uppercase tracking-wide">{e.type}</span>
              <span className="text-white/50 truncate flex-1">{e.message}</span>
            </div>
          )) : <div className="text-white/40 py-2">No recent activity.</div>}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURES PAGE
// ═══════════════════════════════════════════════════════════════════════════
function FeaturesPage({ recentSanctions, featureFlags, liveStatus }) {
  const [tab, setTab] = useState('moderation');
  const cmdCount = liveStatus?.metrics?.commandsCount || 0;
  const sanctions = recentSanctions?.sanctions || [];

  const tabs = [
    { id: 'moderation', label: 'Moderation', icon: Icon.shield },
    { id: 'sanctions', label: 'Sanctions', icon: Icon.lock },
    { id: 'tickets', label: 'Tickets', icon: Icon.ticket },
    { id: 'antispam', label: 'Anti-Spam', icon: Icon.zap },
    { id: 'antiraid', label: 'Anti-Raid', icon: Icon.alert },
    { id: 'welcoming', label: 'Welcoming', icon: Icon.userCheck },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      <div className="text-center pt-12 pb-12 animate-fade-up">
        <div className="text-xs uppercase tracking-wider text-white/40 font-mono mb-4">Capabilities</div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-4">Built for control.</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          {cmdCount > 0 && `${cmdCount} commands indexed • `}{recentSanctions.active_count} active sanctions tracked
        </p>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8 animate-fade-up stagger-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 smooth ${tab === t.id ? 'bg-white text-black font-medium' : 'glass hover:bg-white/5'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div className="glass-card glass rounded-3xl p-8 animate-fade-up stagger-2" key={tab}>
        {tab === 'moderation' && (
          <div>
            <h3 className="text-2xl font-semibold mb-3">Moderation</h3>
            <p className="text-white/50 mb-6">High-level commands for ban, kick, mute, warn, purge, slowmode.</p>
            <div className="glass rounded-2xl p-4 font-mono text-sm space-y-1.5">
              <div className="text-white/70">/mute @user 60 Policy violation</div>
              <div className="text-white/70">/warn @user Spamming in #general</div>
              <div className="text-white/70">/kick @user Repeated rule violations</div>
              <div className="text-white/70">/ban @user Severe TOS breach</div>
            </div>
          </div>
        )}
        {tab === 'sanctions' && (
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-2xl font-semibold">Sanctions</h3>
              {recentSanctions?.isRealData && <span className="text-sm text-white/40 font-mono">{recentSanctions.active_count} active</span>}
            </div>
            <p className="text-white/50 mb-6">Database-backed case tracking with Roblox & Discord identifiers, bail amounts, lift logs.</p>
            <div className="glass rounded-2xl p-4 divide-y divide-white/5">
              {sanctions.length > 0 ? sanctions.map(s => (
                <div key={s.case_id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="font-mono text-sm">#{s.case_id} — {s.roblox_username}</div>
                    <div className="text-xs text-white/50 mt-0.5">{s.reason}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full ${s.status === 'active' ? 'bg-red-500/20 text-red-300' : s.status === 'lifted' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/50'}`}>{s.status}</span>
                    {s.bail_amount > 0 && <div className="text-[10px] text-white/40 mt-1 font-mono">{s.bail_amount} R$</div>}
                  </div>
                </div>
              )) : <div className="py-2 text-sm text-white/40">No recent sanctions.</div>}
            </div>
          </div>
        )}
        {tab === 'tickets' && (<div><h3 className="text-2xl font-semibold mb-3">Tickets</h3><p className="text-white/50 mb-6">Dropdown categories, staff claim buttons, auto-transcripts on close.</p><Pill on={featureFlags?.tickets} label="Ticket system" /></div>)}
        {tab === 'antispam' && (<div><h3 className="text-2xl font-semibold mb-3">Anti-Spam</h3><p className="text-white/50 mb-6">Monitors chat velocity, triggers automatic timeouts.</p><Pill on={featureFlags?.anti_spam} label="Anti-spam engine" /></div>)}
        {tab === 'antiraid' && (<div><h3 className="text-2xl font-semibold mb-3">Anti-Raid</h3><p className="text-white/50 mb-6">Detects rapid influxes, triggers channel lockdown.</p><Pill on={featureFlags?.anti_raid} label="Anti-raid lockdown" /></div>)}
        {tab === 'welcoming' && (<div><h3 className="text-2xl font-semibold mb-3">Welcoming</h3><p className="text-white/50 mb-6">Custom banners, dynamic variables, DM dispatch.</p><Pill on={featureFlags?.welcome} label="Welcome system" /></div>)}
      </div>
    </div>
  );
}

function Pill({ on, label }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${on ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-emerald-400' : 'bg-white/30'}`} />
      {label}: {on ? 'Enabled' : 'Disabled'}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STATUS PAGE
// ═══════════════════════════════════════════════════════════════════════════
function StatusPage({ liveStatus, serverInfo, fetchAll, connectionError, lastSuccessTime }) {
  const ping = liveStatus?.bot?.latency_ms ?? 38;
  const animPing = useNumberTicker(ping);
  const isReal = Boolean(liveStatus?.isRealData);
  const points = liveStatus?.pingHistory || DEFAULT_TELEMETRY.pingHistory;
  const discordOk = liveStatus?.services?.discord === 'operational';
  const dbOk = liveStatus?.services?.database === 'operational';

  const W = 800, H = 200;
  const pings = points.map(p => p.ping || 40);
  const min = Math.max(10, Math.min(...pings) - 5);
  const max = Math.max(min + 10, Math.max(...pings) + 5);
  const mapped = points.map((p, i) => ({
    x: points.length > 1 ? (i / (points.length - 1)) * W : W / 2,
    y: H - ((p.ping - min) / (max - min)) * (H - 40) - 20,
  }));
  let path = `M ${mapped[0].x} ${mapped[0].y}`;
  for (let i = 0; i < mapped.length - 1; i++) {
    const cx = (mapped[i].x + mapped[i + 1].x) / 2;
    path += ` C ${cx} ${mapped[i].y}, ${cx} ${mapped[i + 1].y}, ${mapped[i + 1].x} ${mapped[i + 1].y}`;
  }
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      <section className="text-center pt-8 pb-12 animate-fade-up">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs mb-6">
          <StatusDot online={isReal && discordOk} error={!!connectionError} />
          <span className="text-white/70">{connectionError ? 'Connection issue' : isReal ? 'Connected' : 'Demo data'}</span>
        </div>
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-8xl sm:text-9xl font-bold number-ticker tracking-tighter">{animPing}</span>
          <span className="text-2xl text-white/40 font-light">ms</span>
        </div>
        <p className="text-white/40 text-sm mt-3">{lastSuccessTime && isReal ? `Updated ${timeAgo(lastSuccessTime)}` : 'Awaiting data'}</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 animate-fade-up stagger-1">
        <ServiceCard icon={Icon.activity} label="Discord Gateway" ok={discordOk} />
        <ServiceCard icon={Icon.database} label="SQLite Database" ok={dbOk} />
        <ServiceCard icon={Icon.bot} label="Bot Process" ok={isReal} />
      </section>
      <section className="glass-card glass rounded-3xl p-6 animate-fade-up stagger-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">{Icon.activity} Latency — 1 hour</h3>
          <button onClick={fetchAll} className="text-xs glass px-3 py-1.5 rounded-lg btn-press flex items-center gap-1.5 smooth hover:bg-white/5">
            {Icon.refresh} Refresh
          </button>
        </div>
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#areaGrad)" />
            <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" />
            {mapped.map((d, i) => (<circle key={i} cx={d.x} cy={d.y} r="3" fill="#ffffff" />))}
          </svg>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, label, ok }) {
  return (
    <div className="glass-card glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/40">{icon}</span>
        <StatusDot online={ok} error={!ok} />
      </div>
      <div className="font-medium text-sm">{label}</div>
      <div className={`text-xs mt-1 ${ok ? 'text-emerald-400' : 'text-red-400'}`}>{ok ? 'Operational' : 'Issue'}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
function DashboardPage({ user, liveStatus, recentSanctions, featureFlags, serverInfo }) {
  if (!user) return <div className="max-w-5xl mx-auto px-4 py-24 text-center text-white/50">Sign in to access the dashboard.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">@{user.username}</p>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs glass flex items-center gap-2">
          <StatusDot online={Boolean(liveStatus?.isRealData)} />
          {liveStatus?.isRealData ? 'Live' : 'Demo'}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 animate-fade-up stagger-1">
        <MetricCard label="Guilds" value={liveStatus?.metrics?.guildsCount ?? 0} />
        <MetricCard label="Sanctions" value={recentSanctions?.active_count ?? 0} sub={`${recentSanctions?.sanctions?.length || 0} recent`} />
        <MetricCard label="Commands" value={liveStatus?.metrics?.commandsCount ?? 0} sub={`${Object.keys(featureFlags || {}).filter(k => typeof featureFlags[k] === 'boolean').length} modules`} />
      </div>
      {serverInfo?.isRealData && (
        <div className="glass-card glass rounded-3xl p-6 mb-4 animate-fade-up stagger-2">
          <h3 className="text-sm font-medium mb-4">Runtime</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <InfoRow icon={Icon.clock} label="Uptime" value={formatUptime(serverInfo.uptime_seconds)} />
            <InfoRow icon={Icon.code} label="Python" value={serverInfo.python_version} />
            <InfoRow icon={Icon.cpu} label="discord.py" value={serverInfo.discord_py_version} />
            <InfoRow icon={Icon.server} label="OS" value={serverInfo.platform} />
          </div>
        </div>
      )}
      {featureFlags?.isRealData && (
        <div className="glass-card glass rounded-3xl p-6 animate-fade-up stagger-3">
          <h3 className="text-sm font-medium mb-4">Modules</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(featureFlags).filter(([k, v]) => typeof v === 'boolean').map(([k, v]) => (
              <div key={k} className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 smooth ${v ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/5 text-white/40'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${v ? 'bg-emerald-400' : 'bg-white/30'}`} />
                <span className="capitalize">{k.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, sub }) {
  const anim = useNumberTicker(value);
  return (
    <div className="glass-card glass rounded-3xl p-6">
      <div className="text-xs uppercase tracking-wider text-white/40 mb-2 font-mono">{label}</div>
      <div className="text-4xl font-bold number-ticker">{anim.toLocaleString()}</div>
      {sub && <div className="text-xs text-white/40 mt-1">{sub}</div>}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div>
      <div className="text-xs text-white/40 mb-1 flex items-center gap-1.5">{icon} {label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
