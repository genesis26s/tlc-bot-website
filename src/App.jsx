/**
 * TLC-Bot Website — Quadton-Inspired Premium Edition
 * Yellow accent, coral accent, black base, massive type, marquee, floating mascot
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── INLINE SVG ICONS ───────────────────────────────────────────────────────
const I = {
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  music: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  bot: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>,
  activity: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  database: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  server: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>,
  users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  clock: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  code: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  cpu: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>,
  refresh: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  alert: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  x: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  menu: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  sliders: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="21" x2="4" y2="14"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="20" y1="21" x2="20" y2="16"/></svg>,
  logOut: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/></svg>,
  zap: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  lock: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  terminal: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  ticket: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>,
  userCheck: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>,
};

// ─── DEFAULTS ────────────────────────────────────────────────────────────────
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

// ─── HOOKS / HELPERS ─────────────────────────────────────────────────────────
function useNumberTicker(target, duration = 900) {
  const [v, setV] = useState(0);
  const fromRef = useRef(0);
  const startRef = useRef(0);
  useEffect(() => {
    fromRef.current = v;
    startRef.current = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startRef.current) / duration, 1);
      // Spring-ish overshoot
      const eased = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
      const overshoot = t < 0.85 ? 0 : Math.sin((t - 0.85) * Math.PI * 4) * 0.02;
      setV(Math.round(fromRef.current + (target - fromRef.current) * (eased + overshoot)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return v;
}

function timeAgo(date) {
  if (!date) return 'never';
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return `${Math.max(s, 1)}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

function formatUptime(s) {
  if (!s) return '—';
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${m}m`;
  return `${m}m`;
}

// ─── MASCOT (SVG) ────────────────────────────────────────────────────────────
function Mascot() {
  return (
    <div className="relative w-full max-w-md mx-auto float-anim">
      {/* Glow */}
      <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-radial from-yellow-400 to-transparent" />
      <svg viewBox="0 0 320 360" className="relative w-full h-auto">
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="antennaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        {/* Antenna */}
        <line x1="160" y1="60" x2="160" y2="20" stroke="url(#antennaGrad)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="160" cy="18" r="6" fill="#fde047" className="antenna-tip" />
        {/* Head/Body */}
        <rect x="80" y="60" width="160" height="180" rx="32" fill="url(#bodyGrad)" />
        {/* Eyes */}
        <circle cx="125" cy="140" r="20" fill="#0a0a0a" />
        <circle cx="195" cy="140" r="20" fill="#0a0a0a" />
        <circle cx="130" cy="135" r="6" fill="#fff" />
        <circle cx="200" cy="135" r="6" fill="#fff" />
        {/* Mouth */}
        <rect x="130" y="190" width="60" height="20" rx="10" fill="#0a0a0a" />
        {/* Arms */}
        <rect x="40" y="160" width="40" height="80" rx="20" fill="url(#bodyGrad)" transform="rotate(-15 60 200)" />
        <rect x="240" y="160" width="40" height="80" rx="20" fill="url(#bodyGrad)" transform="rotate(15 260 200)" />
        {/* Terminal mockup */}
        <g transform="translate(40, 260)">
          <rect x="0" y="0" width="240" height="90" rx="12" fill="#0a0a0a" stroke="#fb7185" strokeWidth="1" opacity="0.95" />
          <text x="14" y="22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#10b981">&gt; init volt.bot</text>
          <text x="14" y="38" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a3a3a3">&gt; status: online</text>
          <text x="14" y="54" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a3a3a3">&gt; servers: 14,302</text>
          <text x="14" y="70" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#fde047">&gt; ready ✓</text>
          {/* Buttons */}
          <rect x="135" y="64" width="20" height="14" rx="3" fill="#fde047" />
          <rect x="160" y="64" width="20" height="14" rx="3" fill="#fb7185" />
          <rect x="185" y="64" width="20" height="14" rx="3" fill="#fde047" />
        </g>
      </svg>
    </div>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    'Moderation Systems',
    'Engagement Tools',
    'Sanctions',
    'Anti-Raid',
    'Welcome Flows',
    'Tickets',
    'Custom Cogs',
    'Player Rating',
  ];
  const row = [...items, ...items, ...items]; // duplicate for seamless loop
  return (
    <div className="overflow-hidden border-y border-yellow-400/30 bg-yellow-400 py-3 -mx-4">
      <div className="flex gap-8 marquee-track">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="text-black font-bold text-sm uppercase tracking-wider whitespace-nowrap">{item}</span>
            <span className="text-black/60 text-lg">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BACKGROUND (subtle warm gradients) ──────────────────────────────────────
function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[#0a0a0a]" />
      {/* Warm gradient blobs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 bg-yellow-500 -z-10" style={{ animation: 'drift1 25s ease-in-out infinite' }} />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 bg-red-500 -z-10" style={{ animation: 'drift2 30s ease-in-out infinite' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 bg-orange-500 -z-10" style={{ animation: 'drift3 35s ease-in-out infinite' }} />
      {/* Noise overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")' }} />
      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(100px,80px) scale(1.1)} 66%{transform:translate(-50px,40px) scale(0.9)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-100px,-100px) scale(1.15)} }
        @keyframes drift3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-40%,-60%) scale(1.2)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(2deg)} }
        @keyframes fade-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,92%,100%{transform:scaleY(1)} 96%{transform:scaleY(0.1)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(253,224,71,0.4)} 50%{box-shadow:0 0 0 12px rgba(253,224,71,0)} }
        .marquee-track { animation: marquee 40s linear infinite; width: max-content; }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .float-slow-anim { animation: float-slow 6s ease-in-out infinite; }
        .animate-up { animation: fade-up 0.7s cubic-bezier(0.22,1,0.36,1) backwards; }
        .stagger-1 { animation-delay: 80ms; }
        .stagger-2 { animation-delay: 160ms; }
        .stagger-3 { animation-delay: 240ms; }
        .stagger-4 { animation-delay: 320ms; }
        .stagger-5 { animation-delay: 400ms; }
        .antenna-tip { animation: pulse-glow 2s ease-in-out infinite; transform-origin: center; }
        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255,255,255,0.08); }
        .glass-card { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
        .glass-card::before { content:''; position: absolute; inset:0; background: linear-gradient(135deg, rgba(253,224,71,0.04), transparent 50%, rgba(251,113,133,0.02)); pointer-events:none; opacity:0; transition: opacity 0.4s; }
        .glass-card:hover { transform: translateY(-4px); border-color: rgba(253,224,71,0.2); }
        .glass-card:hover::before { opacity:1; }
        .btn-yellow { background: #fde047; color: #0a0a0a; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); box-shadow: 0 0 0 0 rgba(253,224,71,0); }
        .btn-yellow:hover { background: #facc15; transform: translateY(-1px); box-shadow: 0 8px 24px -8px rgba(253,224,71,0.4); }
        .btn-yellow:active { transform: scale(0.98); }
        .btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.15); transition: all 0.3s; }
        .btn-outline:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.3); }
        .btn-press { transition: transform 0.15s; }
        .btn-press:active { transform: scale(0.97); }
        .number-ticker { font-variant-numeric: tabular-nums; }
        .gradient-text { background: linear-gradient(135deg, #fde047 0%, #f97316 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .gradient-text-coral { background: linear-gradient(135deg, #fb7185 0%, #f87171 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .glow-yellow { box-shadow: 0 0 40px -10px rgba(253,224,71,0.5); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(253,224,71,0.3); border-radius: 999px; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; background: #0a0a0a; color: white; }
        .font-mono { font-family: 'JetBrains Mono', 'SF Mono', monospace; }
        .text-mute { color: rgba(255,255,255,0.5); }
        .text-dim { color: rgba(255,255,255,0.3); }
        .text-yellow { color: #fde047; }
        .text-coral { color: #fb7185; }
        .border-yellow { border-color: #fde047; }
        @media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </>
  );
}

// ─── STATUS DOT ──────────────────────────────────────────────────────────────
function Dot({ ok, error }) {
  const c = error ? 'bg-red-400' : ok ? 'bg-emerald-400' : 'bg-yellow-400';
  return <span className={`inline-block w-2 h-2 rounded-full ${c}`} />;
}

// ─── LOGO ────────────────────────────────────────────────────────────────────
function Logo({ className = "w-9 h-9" }) {
  const [idx, setIdx] = useState(0);
  const srcs = ["/assets/logo.png", "/logo.png"];
  if (idx >= srcs.length) return <div className={`${className} rounded-xl bg-yellow-400 flex items-center justify-center text-black font-bold`}>T</div>;
  return <img src={srcs[idx]} alt="TLC-Bot" onError={() => setIdx(p => p + 1)} className={`${className} rounded-xl object-contain`} />;
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═════════════════════════════════════════════════════════════════════════════
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
        metrics: { guildsCount: data?.metrics?.guildsCount ?? 0, membersCount: data?.metrics?.membersCount ?? 0, activeSanctions: data?.metrics?.activeSanctions ?? 0, commandsCount: data?.metrics?.commandsCount ?? 0 },
        pingHistory: data?.pingHistory || DEFAULT_TELEMETRY.pingHistory,
      });
      setConnectionError(null);
      setLastSuccessTime(new Date());
    } catch (e) { if (e.name !== 'AbortError') setConnectionError(e.message); }
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
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <Background />

      {authError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] glass rounded-2xl px-4 py-2.5 flex items-center gap-3 text-sm border border-red-500/20 animate-up">
          <span className="text-red-400">{I.alert}</span>
          <span>{authError === 'access_denied' ? 'Login cancelled' : 'Login failed'}</span>
          <button onClick={() => setAuthError(null)} className="text-white/40 hover:text-white ml-2">{I.x}</button>
        </div>
      )}

      {/* Floating nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass rounded-full px-4 sm:px-6 h-14 flex items-center justify-between">
          <div onClick={() => setRoute('home')} className="flex items-center gap-2 cursor-pointer">
            <Logo className="w-8 h-8" />
            <span className="font-semibold text-sm tracking-tight">TLC-Bot</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-sm">
            {[{ r: 'home', l: 'Home' }, { r: 'features', l: 'Features' }, { r: 'status', l: 'Status' }].map(({ r, l }) => (
              <button key={r} onClick={() => setRoute(r)} className={`px-3 py-1.5 rounded-full transition-all ${route === r ? 'text-white' : 'text-white/50 hover:text-white'}`}>{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {authLoading ? (
              <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-yellow-400 animate-spin" />
            ) : user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-full glass btn-press">
                  <img src={user.avatar || `https://cdn.discordapp.com/embed/avatars/${(parseInt(user.id) >> 22) % 6}.png`} alt="" className="w-7 h-7 rounded-full" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass rounded-2xl p-2 animate-up">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-sm font-medium">{user.displayName || user.username}</p>
                      <p className="text-xs text-white/50">@{user.username}</p>
                    </div>
                    <button onClick={() => { setRoute('dashboard'); setUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-white/5 flex items-center gap-2 mt-1">{I.sliders} Dashboard</button>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-white/5 flex items-center gap-2 text-red-400">{I.logOut} Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLogin} disabled={isLoggingIn} className="btn-yellow px-4 py-1.5 rounded-full text-sm font-semibold btn-press flex items-center gap-2 disabled:opacity-50">
                {isLoggingIn ? <span className="animate-spin inline-block">{I.refresh}</span> : null}
                {isLoggingIn ? 'Redirecting…' : 'Sign in'}
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-1.5 glass rounded-full">
              {mobileMenuOpen ? I.x : I.menu}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        {route === 'home' && <HomePage liveStatus={liveStatus} recentEvents={recentEvents} featureFlags={featureFlags} serverInfo={serverInfo} setRoute={setRoute} handleLogin={handleLogin} isLoggingIn={isLoggingIn} />}
        {route === 'features' && <FeaturesPage recentSanctions={recentSanctions} featureFlags={featureFlags} liveStatus={liveStatus} />}
        {route === 'status' && <StatusPage liveStatus={liveStatus} serverInfo={serverInfo} fetchAll={fetchAll} connectionError={connectionError} lastSuccessTime={lastSuccessTime} />}
        {route === 'dashboard' && <DashboardPage user={user} liveStatus={liveStatus} recentSanctions={recentSanctions} featureFlags={featureFlags} serverInfo={serverInfo} />}
      </main>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═════════════════════════════════════════════════════════════════════════════
function HomePage({ liveStatus, recentEvents, featureFlags, serverInfo, setRoute, handleLogin, isLoggingIn }) {
  const ping = liveStatus?.bot?.latency_ms ?? 38;
  const animPing = useNumberTicker(ping);
  const animSanctions = useNumberTicker(liveStatus?.metrics?.activeSanctions ?? 0);
  const animMembers = useNumberTicker(liveStatus?.metrics?.membersCount ?? 0);
  const animCommands = useNumberTicker(liveStatus?.metrics?.commandsCount ?? 0);
  const isOp = (liveStatus?.status || 'operational') === 'operational';
  const enabled = ['anti_spam', 'anti_raid', 'verification', 'monitoring'].filter(f => featureFlags?.[f]).length;
  const events = (recentEvents?.events || []).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* Marquee */}
      <div className="mb-12 animate-up"><Marquee /></div>

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-8 pb-20">
        <div className="animate-up">
          <div className="inline-flex items-center gap-2 text-xs text-mute mb-6">
            <Dot ok={isOp} /> <span>// TLC — Discord Bot Suite — est. 2026</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
            We build <span className="italic gradient-text">bots</span><br />
            that <span className="italic gradient-text-coral">run</span><br />
            communities.
          </h1>
          <p className="text-mute text-lg max-w-md leading-relaxed mb-8">
            TLC-Bot is a premium suite for moderation, sanctions, and security — built for serious Discord communities that need infrastructure, not toys.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleLogin} disabled={isLoggingIn} className="btn-yellow px-5 py-2.5 rounded-full text-sm font-semibold btn-press flex items-center gap-2 disabled:opacity-50">
              {isLoggingIn ? <span className="animate-spin inline-block">{I.refresh}</span> : null}
              {isLoggingIn ? 'Redirecting…' : 'Sign in'} {I.arrow}
            </button>
            <button onClick={() => setRoute('features')} className="btn-outline px-5 py-2.5 rounded-full text-sm font-semibold btn-press">How it works</button>
          </div>
        </div>
        <div className="animate-up stagger-2">
          <Mascot />
        </div>
      </section>

      {/* Section: Capabilities */}
      <section className="pt-8 pb-12">
        <div className="text-xs text-mute mb-2 font-mono animate-up">// 01 — Our bots</div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-2 animate-up stagger-1">
          In-house <span className="italic gradient-text">products.</span>
        </h2>
        <p className="text-mute max-w-md mb-12 animate-up stagger-2">A curated suite of Discord bots we build, maintain and ship to communities across the platform.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BotCard version="/v2.5 LIVE" icon={I.shield} title="TLC-Bot" description="All-in-one moderation & community management. AutoMod, raid protection, ticket systems and analytics — wrapped in a clean dashboard." />
          <BotCard version="/v2.5 LIVE" icon={I.lock} title="Sanctions Engine" description="Database-backed case tracking with Roblox & Discord identifiers, bail amounts, lift logs, and automated expiration." />
          <BotCard version="/v2.5 LIVE" icon={I.zap} title="Anti-Raid" description="Detects rapid influxes of newly created accounts and triggers channel lockdown in under 2 seconds." />
          <BotCard version="/v2.5 LIVE" icon={I.ticket} title="Tickets" description="Dynamic dropdown categories, staff claim buttons, and auto-generated transcripts upon closure." />
        </div>
      </section>

      {/* Bento metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 pt-8">
        <BentoCard label="Gateway" value={animPing} suffix="ms" big />
        <BentoCard label="Sanctions" value={animSanctions} />
        <BentoCard label="Members" value={animMembers.toLocaleString()} />
        <BentoCard label="Commands" value={animCommands} />
      </section>

      {/* Activity */}
      <section className="glass-card glass rounded-3xl p-6 animate-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">{I.terminal} Activity</h3>
          <div className="flex items-center gap-2 text-xs text-mute font-mono">
            <Dot ok={Boolean(recentEvents?.isRealData)} />
            {recentEvents?.isRealData ? 'LIVE' : 'OFFLINE'}
          </div>
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          {events.length > 0 ? events.map((e, i) => (
            <div key={i} className="flex items-baseline gap-3 py-1.5 border-b border-white/5 last:border-0">
              <span className="text-dim tabular-nums">{(e.timestamp || '').slice(11, 16) || '—'}</span>
              <span className="text-yellow uppercase tracking-wide font-medium">{e.type}</span>
              <span className="text-mute truncate flex-1">{e.message}</span>
            </div>
          )) : <div className="text-mute py-2">No recent activity.</div>}
        </div>
      </section>
    </div>
  );
}

function BotCard({ version, icon, title, description }) {
  return (
    <div className="glass-card glass rounded-2xl p-6">
      <div className="inline-block bg-yellow-400/20 text-yellow-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-4">{version}</div>
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-300 mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-mute leading-relaxed">{description}</p>
    </div>
  );
}

function BentoCard({ label, value, suffix, big }) {
  return (
    <div className={`glass-card glass rounded-2xl p-5 ${big ? 'col-span-2' : ''}`}>
      <div className="text-[10px] uppercase tracking-wider text-mute mb-2 font-mono">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className={`font-bold number-ticker ${big ? 'text-6xl' : 'text-4xl'}`}>{value}</span>
        {suffix && <span className="text-white/40 text-lg">{suffix}</span>}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FEATURES PAGE
// ═════════════════════════════════════════════════════════════════════════════
function FeaturesPage({ recentSanctions, featureFlags, liveStatus }) {
  const [tab, setTab] = useState('moderation');
  const cmdCount = liveStatus?.metrics?.commandsCount || 0;
  const sanctions = recentSanctions?.sanctions || [];

  const tabs = [
    { id: 'moderation', label: 'Moderation', icon: I.shield },
    { id: 'sanctions', label: 'Sanctions', icon: I.lock },
    { id: 'tickets', label: 'Tickets', icon: I.ticket },
    { id: 'antispam', label: 'Anti-Spam', icon: I.zap },
    { id: 'antiraid', label: 'Anti-Raid', icon: I.alert },
    { id: 'welcoming', label: 'Welcoming', icon: I.userCheck },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <div className="text-center pt-12 pb-12 animate-up">
        <div className="text-xs uppercase tracking-wider text-mute font-mono mb-4">// 02 — Capabilities</div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4">Built for <span className="italic gradient-text">control.</span></h1>
        <p className="text-mute max-w-xl mx-auto">{cmdCount > 0 && `${cmdCount} commands indexed • `}{recentSanctions.active_count} active sanctions tracked</p>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8 animate-up stagger-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${tab === t.id ? 'bg-yellow-400 text-black font-semibold' : 'glass hover:bg-white/5'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div className="glass-card glass rounded-3xl p-8 animate-up stagger-2" key={tab}>
        {tab === 'moderation' && (
          <div>
            <h3 className="text-2xl font-bold mb-3">Moderation</h3>
            <p className="text-mute mb-6">High-level commands for ban, kick, mute, warn, purge, slowmode.</p>
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
              <h3 className="text-2xl font-bold">Sanctions</h3>
              {recentSanctions?.isRealData && <span className="text-sm text-mute font-mono">{recentSanctions.active_count} active</span>}
            </div>
            <p className="text-mute mb-6">Database-backed case tracking with Roblox & Discord identifiers, bail amounts, lift logs.</p>
            <div className="glass rounded-2xl p-4 divide-y divide-white/5">
              {sanctions.length > 0 ? sanctions.map(s => (
                <div key={s.case_id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="font-mono text-sm">#{s.case_id} — {s.roblox_username}</div>
                    <div className="text-xs text-mute mt-0.5">{s.reason}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full ${s.status === 'active' ? 'bg-coral-500/20 text-coral' : s.status === 'lifted' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/50'}`} style={s.status === 'active' ? { color: '#fb7185', background: 'rgba(251,113,133,0.15)' } : {}}>{s.status}</span>
                    {s.bail_amount > 0 && <div className="text-[10px] text-dim mt-1 font-mono">{s.bail_amount} R$</div>}
                  </div>
                </div>
              )) : <div className="py-2 text-sm text-mute">No recent sanctions.</div>}
            </div>
          </div>
        )}
        {tab === 'tickets' && (<div><h3 className="text-2xl font-bold mb-3">Tickets</h3><p className="text-mute mb-6">Dropdown categories, staff claim buttons, auto-transcripts on close.</p><Pill on={featureFlags?.tickets} label="Ticket system" /></div>)}
        {tab === 'antispam' && (<div><h3 className="text-2xl font-bold mb-3">Anti-Spam</h3><p className="text-mute mb-6">Monitors chat velocity, triggers automatic timeouts.</p><Pill on={featureFlags?.anti_spam} label="Anti-spam engine" /></div>)}
        {tab === 'antiraid' && (<div><h3 className="text-2xl font-bold mb-3">Anti-Raid</h3><p className="text-mute mb-6">Detects rapid influxes, triggers channel lockdown.</p><Pill on={featureFlags?.anti_raid} label="Anti-raid lockdown" /></div>)}
        {tab === 'welcoming' && (<div><h3 className="text-2xl font-bold mb-3">Welcoming</h3><p className="text-mute mb-6">Custom banners, dynamic variables, DM dispatch.</p><Pill on={featureFlags?.welcome} label="Welcome system" /></div>)}
      </div>
    </div>
  );
}

function Pill({ on, label }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${on ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30' : 'bg-white/5 text-mute border-white/10'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-yellow-400' : 'bg-white/30'}`} />
      {label}: {on ? 'Enabled' : 'Disabled'}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// STATUS PAGE
// ═════════════════════════════════════════════════════════════════════════════
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
  const mapped = points.map((p, i) => ({ x: points.length > 1 ? (i / (points.length - 1)) * W : W / 2, y: H - ((p.ping - min) / (max - min)) * (H - 40) - 20 }));
  let path = `M ${mapped[0].x} ${mapped[0].y}`;
  for (let i = 0; i < mapped.length - 1; i++) {
    const cx = (mapped[i].x + mapped[i + 1].x) / 2;
    path += ` C ${cx} ${mapped[i].y}, ${cx} ${mapped[i + 1].y}, ${mapped[i + 1].x} ${mapped[i + 1].y}`;
  }
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <section className="text-center pt-8 pb-12 animate-up">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs mb-6">
          <Dot ok={isReal && discordOk} error={!!connectionError} />
          <span className="text-mute">{connectionError ? 'Connection issue' : isReal ? 'Connected' : 'Demo data'}</span>
        </div>
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-8xl sm:text-9xl font-bold number-ticker tracking-tighter gradient-text">{animPing}</span>
          <span className="text-2xl text-mute font-light">ms</span>
        </div>
        <p className="text-mute text-sm mt-3">{lastSuccessTime && isReal ? `Updated ${timeAgo(lastSuccessTime)}` : 'Awaiting data'}</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 animate-up stagger-1">
        <SvcCard icon={I.activity} label="Discord Gateway" ok={discordOk} />
        <SvcCard icon={I.database} label="SQLite Database" ok={dbOk} />
        <SvcCard icon={I.bot} label="Bot Process" ok={isReal} />
      </section>
      <section className="glass-card glass rounded-3xl p-6 animate-up stagger-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">{I.activity} Latency — 1 hour</h3>
          <button onClick={fetchAll} className="text-xs glass px-3 py-1.5 rounded-full btn-press flex items-center gap-1.5 hover:bg-white/5 transition-all">
            {I.refresh} Refresh
          </button>
        </div>
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fde047" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#areaGrad)" />
            <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />
            {mapped.map((d, i) => (<circle key={i} cx={d.x} cy={d.y} r="3" fill="#fde047" />))}
          </svg>
        </div>
      </section>
    </div>
  );
}

function SvcCard({ icon, label, ok }) {
  return (
    <div className="glass-card glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-yellow-300">{icon}</span>
        <Dot ok={ok} error={!ok} />
      </div>
      <div className="font-medium text-sm">{label}</div>
      <div className={`text-xs mt-1 ${ok ? 'text-emerald-400' : 'text-red-400'}`}>{ok ? 'Operational' : 'Issue'}</div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════
function DashboardPage({ user, liveStatus, recentSanctions, featureFlags, serverInfo }) {
  if (!user) return <div className="max-w-5xl mx-auto px-4 py-24 text-center text-mute">Sign in to access the dashboard.</div>;
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <div className="flex items-center justify-between mb-8 animate-up">
        <div>
          <div className="text-xs text-mute font-mono mb-1">// 03 — Control</div>
          <h1 className="text-4xl font-black tracking-tighter">Dashboard</h1>
          <p className="text-mute text-sm mt-1">@{user.username}</p>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs glass flex items-center gap-2">
          <Dot ok={Boolean(liveStatus?.isRealData)} />
          {liveStatus?.isRealData ? 'Live' : 'Demo'}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 animate-up stagger-1">
        <MetricCard label="Guilds" value={liveStatus?.metrics?.guildsCount ?? 0} />
        <MetricCard label="Sanctions" value={recentSanctions?.active_count ?? 0} />
        <MetricCard label="Commands" value={liveStatus?.metrics?.commandsCount ?? 0} />
      </div>
      {serverInfo?.isRealData && (
        <div className="glass-card glass rounded-3xl p-6 mb-4 animate-up stagger-2">
          <h3 className="text-sm font-medium mb-4">Runtime</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Info icon={I.clock} label="Uptime" value={formatUptime(serverInfo.uptime_seconds)} />
            <Info icon={I.code} label="Python" value={serverInfo.python_version} />
            <Info icon={I.cpu} label="discord.py" value={serverInfo.discord_py_version} />
            <Info icon={I.server} label="OS" value={serverInfo.platform} />
          </div>
        </div>
      )}
      {featureFlags?.isRealData && (
        <div className="glass-card glass rounded-3xl p-6 animate-up stagger-3">
          <h3 className="text-sm font-medium mb-4">Modules</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(featureFlags).filter(([k, v]) => typeof v === 'boolean').map(([k, v]) => (
              <div key={k} className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-all ${v ? 'bg-yellow-400/10 text-yellow-300' : 'bg-white/5 text-mute'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${v ? 'bg-yellow-400' : 'bg-white/30'}`} />
                <span className="capitalize">{k.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value }) {
  const anim = useNumberTicker(value);
  return (
    <div className="glass-card glass rounded-2xl p-5">
      <div className="text-[10px] uppercase tracking-wider text-mute mb-2 font-mono">{label}</div>
      <div className="text-4xl font-bold number-ticker">{anim.toLocaleString()}</div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div>
      <div className="text-xs text-mute mb-1 flex items-center gap-1.5">{icon} {label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
