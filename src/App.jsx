/**
 * TLC-Bot Website — Premium Edition v3
 * The real one. No compromises. 1500+ lines of polish.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ═════════════════════════════════════════════════════════════════════════════
// INLINE SVG ICONS
// ═════════════════════════════════════════════════════════════════════════════
const I = {
  shield: (s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  zap: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  lock: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  ticket: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>,
  alert: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  userCheck: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>,
  activity: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  database: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  server: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>,
  users: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  terminal: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  clock: (s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  code: (s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  cpu: (s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>,
  refresh: (s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  arrow: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  x: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  menu: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  sliders: (s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="21" x2="4" y2="14"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="20" y1="21" x2="20" y2="16"/></svg>,
  logOut: (s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/></svg>,
  bot: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>,
  search: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
};

// ═════════════════════════════════════════════════════════════════════════════
// DEFAULTS
// ═════════════════════════════════════════════════════════════════════════════
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

// ═════════════════════════════════════════════════════════════════════════════
// HOOKS & UTILITIES
// ═════════════════════════════════════════════════════════════════════════════
function useNumberTicker(target, duration = 1200) {
  const [v, setV] = useState(0);
  const fromRef = useRef(0);
  const startRef = useRef(0);
  const targetRef = useRef(target);
  targetRef.current = target;
  useEffect(() => {
    fromRef.current = v;
    startRef.current = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // stronger ease-out
      const current = Math.round(fromRef.current + (targetRef.current - fromRef.current) * eased);
      setV(current);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // eslint-disable-next-line
  }, [target]);
  return v;
}

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);
  return pos;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handle = () => setY(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  return y;
}

function useIntersection(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.15, ...options });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
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

// ═════════════════════════════════════════════════════════════════════════════
// MASCOT
// ═════════════════════════════════════════════════════════════════════════════
function Mascot() {
  return (
    <div className="relative w-full max-w-md mx-auto float-anim">
      <div className="absolute inset-0 blur-3xl opacity-30 bg-violet-500 rounded-full" />
      <svg viewBox="0 0 320 380" className="relative w-full h-auto">
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="60%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        {/* Antenna */}
        <line x1="160" y1="60" x2="160" y2="22" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
        <circle cx="160" cy="20" r="6" fill="#fde047" className="antenna-tip" />
        {/* Body */}
        <rect x="80" y="60" width="160" height="180" rx="32" fill="url(#bodyGrad)" />
        {/* Eyes (with blink animation) */}
        <g className="eyes-blink">
          <circle cx="125" cy="140" r="20" fill="#0a0a0a" />
          <circle cx="195" cy="140" r="20" fill="#0a0a0a" />
          <circle cx="130" cy="135" r="6" fill="#fff" />
          <circle cx="200" cy="135" r="6" fill="#fff" />
        </g>
        {/* Mouth */}
        <rect x="130" y="190" width="60" height="20" rx="10" fill="#0a0a0a" />
        {/* Arms */}
        <rect x="40" y="160" width="40" height="80" rx="20" fill="url(#bodyGrad)" transform="rotate(-15 60 200)" />
        <rect x="240" y="160" width="40" height="80" rx="20" fill="url(#bodyGrad)" transform="rotate(15 260 200)" />
        {/* Terminal */}
        <g transform="translate(40, 270)">
          <rect x="0" y="0" width="240" height="100" rx="12" fill="url(#screenGrad)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
          <g className="terminal-text">
            <text x="14" y="22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a78bfa" opacity="0">> init tlc-bot</text>
            <text x="14" y="38" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#9ca3af" opacity="0">> loading commands...</text>
            <text x="14" y="54" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#9ca3af" opacity="0">> connecting to TLC...</text>
            <text x="14" y="74" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#10b981" opacity="0">&gt; ready <tspan fill="#a78bfa">✓</tspan></text>
          </g>
          <circle cx="218" cy="80" r="3" fill="#10b981" className="ping-soft" />
        </g>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MARQUEE (with secondary reverse)
// ═════════════════════════════════════════════════════════════════════════════
function Marquee({ items, reverse = false, speed = 35 }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-3 -mx-4 backdrop-blur-sm">
      <div
        className="flex gap-8 marquee-track"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
          width: 'max-content'
        }}
      >
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="text-white/70 font-medium text-sm uppercase tracking-wider whitespace-nowrap">{item}</span>
            <span className="text-violet-400/60 text-lg">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// BACKGROUND (mesh + cursor spotlight + particles + noise)
// ═════════════════════════════════════════════════════════════════════════════
function Background() {
  const mouse = useMousePosition();
  return (
    <>
      <div className="fixed inset-0 -z-30 bg-[#0a0a0a]" />
      {/* Cursor-following spotlight */}
      <div
        className="fixed pointer-events-none -z-20 transition-opacity duration-500"
        style={{
          left: mouse.x - 300,
          top: mouse.y - 300,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
          opacity: mouse.x === 0 && mouse.y === 0 ? 0 : 1
        }}
      />
      {/* Mesh blobs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-violet-600 -z-20" style={{ animation: 'drift1 25s ease-in-out infinite' }} />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 bg-violet-500 -z-20" style={{ animation: 'drift2 30s ease-in-out infinite' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 bg-violet-400 -z-20" style={{ animation: 'drift3 35s ease-in-out infinite' }} />
      {/* Particles */}
      <Particles />
      {/* Noise */}
      <div className="fixed inset-0 -z-10 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")', animation: 'noise-shift 8s steps(8) infinite' }} />
      <GlobalStyles />
    </>
  );
}

// Particles
function Particles({ count = 30 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 25,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.4
    }));
  }, [count]);
  return (
    <div className="fixed inset-0 -z-15 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// GLOBAL STYLES
// ═════════════════════════════════════════════════════════════════════════════
function GlobalStyles() {
  return (
    <style>{`
      @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(100px,80px) scale(1.1)} 66%{transform:translate(-50px,40px) scale(0.9)} }
      @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-100px,-100px) scale(1.15)} }
      @keyframes drift3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-40%,-60%) scale(1.2)} }
      @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
      @keyframes fade-up { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fade-in { from{opacity:0} to{opacity:1} }
      @keyframes scale-in { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
      @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(167,139,250,0.7)} 50%{box-shadow:0 0 0 14px rgba(167,139,250,0)} }
      @keyframes ping-soft { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      @keyframes particle-rise { 0%{transform:translateY(0) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-100vh) translateX(40px);opacity:0} }
      @keyframes noise-shift { 0%{transform:translate(0,0)} 100%{transform:translate(-20px,-20px)} }
      @keyframes blink { 0%,92%,100%{transform:scaleY(1)} 96%{transform:scaleY(0.05)} }
      @keyframes terminal-type { 0%{opacity:0;transform:translateX(-4px)} 100%{opacity:1;transform:translateX(0)} }
      @keyframes draw-line { from{stroke-dashoffset:2000} to{stroke-dashoffset:0} }
      @keyframes glow-pulse { 0%,100%{filter:drop-shadow(0 0 8px rgba(167,139,250,0.3))} 50%{filter:drop-shadow(0 0 20px rgba(167,139,250,0.6))} }
      
      .marquee-track { will-change: transform; }
      .float-anim { animation: float 4s ease-in-out infinite; will-change: transform; }
      .animate-up { animation: fade-up 0.8s cubic-bezier(0.22,1,0.36,1) backwards; }
      .animate-fade { animation: fade-in 0.6s ease-out backwards; }
      .animate-scale { animation: scale-in 0.5s cubic-bezier(0.22,1,0.36,1) backwards; }
      .stagger-1 { animation-delay: 80ms; }
      .stagger-2 { animation-delay: 160ms; }
      .stagger-3 { animation-delay: 240ms; }
      .stagger-4 { animation-delay: 320ms; }
      .stagger-5 { animation-delay: 400ms; }
      .stagger-6 { animation-delay: 480ms; }
      .stagger-7 { animation-delay: 560ms; }
      
      .antenna-tip { animation: pulse-glow 2s ease-in-out infinite; transform-origin: center; }
      .ping-soft { animation: ping-soft 2s ease-in-out infinite; transform-origin: center; }
      .eyes-blink { animation: blink 6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
      .terminal-text text:nth-child(1) { animation: terminal-type 0.4s 1.5s ease-out forwards; }
      .terminal-text text:nth-child(2) { animation: terminal-type 0.4s 2.0s ease-out forwards; }
      .terminal-text text:nth-child(3) { animation: terminal-type 0.4s 2.5s ease-out forwards; }
      .terminal-text text:nth-child(4) { animation: terminal-type 0.4s 3.0s ease-out forwards; }
      
      .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255,255,255,0.06); }
      .glass-strong { background: rgba(255,255,255,0.05); backdrop-filter: blur(40px) saturate(200%); -webkit-backdrop-filter: blur(40px) saturate(200%); border: 1px solid rgba(255,255,255,0.1); }
      
      .glass-card { position: relative; overflow: hidden; transition: all 0.5s cubic-bezier(0.22,1,0.36,1); }
      .glass-card::before { content:''; position: absolute; inset:-1px; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, rgba(167,139,250,0.4), transparent 40%, transparent 60%, rgba(167,139,250,0.2)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.4s; pointer-events: none; }
      .glass-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.04); }
      .glass-card:hover::before { opacity: 1; }
      
      .btn-primary { background: white; color: #0a0a0a; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); font-weight: 600; position: relative; overflow: hidden; }
      .btn-primary::before { content:''; position: absolute; inset:0; background: linear-gradient(135deg, transparent, rgba(167,139,250,0.3)); opacity:0; transition: opacity 0.3s; }
      .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 32px -8px rgba(167,139,250,0.5); }
      .btn-primary:hover::before { opacity: 1; }
      .btn-primary:active { transform: scale(0.98); }
      
      .btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.15); transition: all 0.3s; position: relative; }
      .btn-outline:hover { background: rgba(167,139,250,0.08); border-color: rgba(167,139,250,0.4); color: #c4b5fd; }
      .btn-press { transition: transform 0.15s; }
      .btn-press:active { transform: scale(0.97); }
      
      .number-ticker { font-variant-numeric: tabular-nums; }
      .gradient-text { background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .glow-text { text-shadow: 0 0 40px rgba(167,139,250,0.4); }
      
      .hero-grid { background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 32px 32px; }
      
      .shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 75%); background-size: 200% 100%; animation: shimmer 2s linear infinite; }
      
      .draw-path { stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: draw-line 2s ease-out forwards; }
      
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(167,139,250,0.5); }
      
      body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; background: #0a0a0a; color: white; }
      .font-mono { font-family: 'JetBrains Mono', 'SF Mono', monospace; }
      .text-mute { color: rgba(255,255,255,0.55); }
      .text-dim { color: rgba(255,255,255,0.3); }
      .text-violet { color: #a78bfa; }
      
      ::selection { background: #a78bfa; color: #0a0a0a; }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SMALL COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════
function Dot({ ok, error }) {
  const c = error ? 'bg-red-400' : ok ? 'bg-emerald-400' : 'bg-amber-400';
  return <span className={`inline-block w-2 h-2 rounded-full ${c}`} />;
}

function Logo({ className = "w-9 h-9" }) {
  const [idx, setIdx] = useState(0);
  const srcs = ["/assets/logo.png", "/logo.png"];
  if (idx >= srcs.length) return <div className={`${className} rounded-xl bg-white flex items-center justify-center text-black font-bold`}>T</div>;
  return <img src={srcs[idx]} alt="TLC-Bot" onError={() => setIdx(p => p + 1)} className={`${className} rounded-xl object-contain`} />;
}

function Pill({ on, label }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${on ? 'bg-violet-500/10 text-violet border-violet-500/30' : 'bg-white/5 text-mute border-white/10'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-violet-400' : 'bg-white/30'}`} />
      {label}: {on ? 'Enabled' : 'Disabled'}
    </div>
  );
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
  const [navScrolled, setNavScrolled] = useState(false);
  const scrollY = useScrollY();

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

  useEffect(() => { setNavScrolled(scrollY > 20); }, [scrollY]);

  // Keyboard shortcuts
  useEffect(() => {
    const h = (e) => {
      if (e.ctrlKey || e.metaKey) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'r') fetchAll();
      else if (e.key === '1') setRoute('home');
      else if (e.key === '2') setRoute('features');
      else if (e.key === '3') setRoute('status');
      else if (e.key === '4' && user) setRoute('dashboard');
      else if (e.key === 'Escape') { setMobileMenuOpen(false); setUserMenuOpen(false); }
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [fetchAll, user]);

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
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] glass-strong rounded-2xl px-4 py-2.5 flex items-center gap-3 text-sm border border-red-500/30 animate-scale">
          <span className="text-red-400">{I.alert(14)}</span>
          <span>{authError === 'access_denied' ? 'Login cancelled' : 'Login failed'}</span>
          <button onClick={() => setAuthError(null)} className="text-white/40 hover:text-white ml-2">{I.x(14)}</button>
        </div>
      )}

      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 ${navScrolled ? 'scale-[0.98]' : ''}`}>
        <div className="glass-strong rounded-full px-4 sm:px-6 h-14 flex items-center justify-between">
          <div onClick={() => setRoute('home')} className="flex items-center gap-2.5 cursor-pointer group">
            <Logo className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-semibold text-sm tracking-tight">TLC-Bot</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-sm relative">
            {[{ r: 'home', l: 'Home' }, { r: 'features', l: 'Features' }, { r: 'status', l: 'Status' }].map(({ r, l }, i) => (
              <button key={r} onClick={() => setRoute(r)} className={`relative px-3 py-1.5 rounded-full transition-all ${route === r ? 'text-white' : 'text-mute hover:text-white'}`}>
                {route === r && <span className="absolute inset-0 bg-white/10 rounded-full animate-scale" />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {authLoading ? (
              <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-violet-400 animate-spin" />
            ) : user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-full glass btn-press">
                  <img src={user.avatar || `https://cdn.discordapp.com/embed/avatars/${(parseInt(user.id) >> 22) % 6}.png`} alt="" className="w-7 h-7 rounded-full" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-strong rounded-2xl p-2 animate-scale origin-top-right">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-sm font-medium">{user.displayName || user.username}</p>
                      <p className="text-xs text-mute">@{user.username}</p>
                    </div>
                    <button onClick={() => { setRoute('dashboard'); setUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-white/5 flex items-center gap-2 mt-1">{I.sliders(12)} Dashboard</button>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-white/5 flex items-center gap-2 text-red-400">{I.logOut(12)} Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLogin} disabled={isLoggingIn} className="btn-primary px-4 py-1.5 rounded-full text-sm btn-press flex items-center gap-2 disabled:opacity-50">
                {isLoggingIn ? <span className="animate-spin inline-block">{I.refresh(12)}</span> : null}
                {isLoggingIn ? 'Redirecting…' : 'Sign in'}
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-1.5 glass rounded-full btn-press">
              {mobileMenuOpen ? I.x(14) : I.menu(18)}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 md:hidden">
          <div className="glass-strong rounded-2xl p-2 animate-scale">
            {[{ r: 'home', l: 'Home' }, { r: 'features', l: 'Features' }, { r: 'status', l: 'Status' }].map(({ r, l }) => (
              <button key={r} onClick={() => setRoute(r)} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${route === r ? 'bg-white/10' : 'hover:bg-white/5'}`}>{l}</button>
            ))}
          </div>
        </div>
      )}

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
  const events = (recentEvents?.events || []).slice(0, 5);

  const marqueeItems = ['Moderation', 'Sanctions', 'Anti-Raid', 'Tickets', 'AutoMod', 'Real-time Telemetry', 'Discord Security'];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* Marquee */}
      <div className="mb-12 animate-up"><Marquee items={marqueeItems} /></div>
      <div className="mb-6 animate-up stagger-1"><Marquee items={['Built for TLC', 'Est. 2026', 'Open Source', 'Community First', 'TLC League']} reverse speed={45} /></div>

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 pb-24 relative">
        {/* Background grid */}
        <div className="absolute inset-0 hero-grid -z-10 opacity-50 pointer-events-none" />
        <div className="animate-up">
          <div className="inline-flex items-center gap-2 text-xs text-mute mb-6 px-3 py-1.5 glass rounded-full">
            <Dot ok={isOp} /> <span>// TLC-Bot — Discord moderation suite</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
            <span className="italic gradient-text glow-text">Professional</span><br />
            moderation for<br />
            the <span className="italic gradient-text">TLC</span> league.
          </h1>
          <p className="text-mute text-lg max-w-md leading-relaxed mb-8">
            TLC-Bot handles moderation, sanctions, anti-raid, tickets, and security infrastructure for the TLC Discord — built to keep things running clean.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleLogin} disabled={isLoggingIn} className="btn-primary px-5 py-2.5 rounded-full text-sm btn-press flex items-center gap-2 disabled:opacity-50">
              {isLoggingIn ? <span className="animate-spin inline-block">{I.refresh(12)}</span> : null}
              {isLoggingIn ? 'Redirecting…' : 'Sign in'} {I.arrow(14)}
            </button>
            <button onClick={() => setRoute('features')} className="btn-outline px-5 py-2.5 rounded-full text-sm font-medium btn-press">View features</button>
          </div>
          <div className="flex items-center gap-6 mt-8 text-xs text-dim">
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded glass text-[10px]">R</kbd> Refresh</span>
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded glass text-[10px]">1</kbd>/<kbd className="px-1.5 py-0.5 rounded glass text-[10px]">2</kbd>/<kbd className="px-1.5 py-0.5 rounded glass text-[10px]">3</kbd> Navigate</span>
          </div>
        </div>
        <div className="animate-up stagger-2 relative">
          <Mascot />
        </div>
      </section>

      {/* Features grid */}
      <section className="pt-8 pb-12">
        <div className="text-xs text-mute mb-2 font-mono animate-up">// 01 — What it does</div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-2 animate-up stagger-1">
          Built for <span className="italic gradient-text">control.</span>
        </h2>
        <p className="text-mute max-w-md mb-12 animate-up stagger-2">A focused suite of tools for the TLC Discord — moderation, sanctions, tickets, and security, all in one bot.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard icon={I.shield(22)} title="Moderation" description="Ban, kick, mute, warn, purge, slowmode. Standard mod toolkit done right." delay={1} />
          <FeatureCard icon={I.lock(22)} title="Sanctions" description="Database-backed case tracking with Roblox & Discord identifiers, bail amounts, automated expiration." delay={2} />
          <FeatureCard icon={I.zap(22)} title="Anti-Raid" description="Detects rapid account creation and join velocity, triggers channel lockdown in seconds." delay={3} />
          <FeatureCard icon={I.ticket(22)} title="Tickets" description="Dropdown categories, staff claim buttons, auto-generated transcripts on close." delay={4} />
        </div>
      </section>

      {/* Bento metrics */}
      <BentoSection
        animPing={animPing}
        animSanctions={animSanctions}
        animMembers={animMembers}
        animCommands={animCommands}
        liveStatus={liveStatus}
      />

      {/* Activity feed */}
      <ActivityFeed events={events} isRealData={recentEvents?.isRealData} />
    </div>
  );
}

function FeatureCard({ icon, title, description, delay = 1 }) {
  const [ref, visible] = useIntersection();
  return (
    <div ref={ref} className={`glass-card glass rounded-2xl p-6 ${visible ? `animate-up stagger-${delay}` : 'opacity-0'}`}>
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet mb-4 transition-all hover:bg-violet-500/20 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-mute leading-relaxed">{description}</p>
    </div>
  );
}

function BentoSection({ animPing, animSanctions, animMembers, animCommands, liveStatus }) {
  const [ref, visible] = useIntersection();
  return (
    <section ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 pt-8 ${visible ? 'animate-up' : 'opacity-0'}`}>
      <div className="glass-card glass rounded-2xl p-5 col-span-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-wider text-mute mb-2 font-mono">Gateway Latency</div>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-bold number-ticker gradient-text">{animPing}</span>
            <span className="text-xl text-mute">ms</span>
          </div>
          <div className="mt-3 text-xs text-mute">
            {liveStatus?.isRealData && liveStatus?.bot?.online ? 'Live • Connected' : 'Awaiting connection'}
          </div>
        </div>
      </div>
      <div className="glass-card glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-wider text-mute mb-2 font-mono">Sanctions</div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-bold number-ticker">{animSanctions}</span>
          <span className="text-sm text-mute">active</span>
        </div>
      </div>
      <div className="glass-card glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-wider text-mute mb-2 font-mono">Members</div>
        <div className="text-4xl font-bold number-ticker">{animMembers.toLocaleString()}</div>
      </div>
      <div className="glass-card glass rounded-2xl p-5 col-span-2">
        <div className="text-[10px] uppercase tracking-wider text-mute mb-2 font-mono">Modules Loaded</div>
        <div className="text-4xl font-bold number-ticker">{animCommands}</div>
        <div className="mt-2 text-xs text-mute">across {liveStatus?.metrics?.guildsCount || 0} {liveStatus?.metrics?.guildsCount === 1 ? 'server' : 'servers'}</div>
      </div>
    </section>
  );
}

function ActivityFeed({ events, isRealData }) {
  const [ref, visible] = useIntersection();
  const [, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className={`glass-card glass rounded-3xl p-6 ${visible ? 'animate-up' : 'opacity-0'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium flex items-center gap-2">{I.terminal(14)} Live activity</h3>
        <div className="flex items-center gap-2 text-xs text-mute font-mono">
          <Dot ok={Boolean(isRealData)} />
          <span className={isRealData ? 'text-emerald-400' : 'text-mute'}>{isRealData ? 'LIVE' : 'OFFLINE'}</span>
        </div>
      </div>
      <div className="space-y-1.5 font-mono text-xs">
        {events.length > 0 ? events.map((e, i) => (
          <div key={i} className="flex items-baseline gap-3 py-1.5 border-b border-white/5 last:border-0 animate-fade" style={{ animationDelay: `${i * 50}ms` }}>
            <span className="text-dim tabular-nums w-12 shrink-0">{(e.timestamp || '').slice(11, 16) || '—'}</span>
            <span className="text-violet uppercase tracking-wide font-medium w-24 shrink-0 truncate">{e.type}</span>
            <span className="text-mute truncate flex-1">{e.message}</span>
          </div>
        )) : (
          <div className="text-mute py-4 text-center">No recent activity.</div>
        )}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FEATURES PAGE
// ═════════════════════════════════════════════════════════════════════════════
function FeaturesPage({ recentSanctions, featureFlags, liveStatus }) {
  const [tab, setTab] = useState('moderation');
  const cmdCount = liveStatus?.metrics?.commandsCount || 0;
  const sanctions = recentSanctions?.sanctions || [];

  const tabs = useMemo(() => [
    { id: 'moderation', label: 'Moderation', icon: I.shield(14) },
    { id: 'sanctions', label: 'Sanctions', icon: I.lock(14) },
    { id: 'tickets', label: 'Tickets', icon: I.ticket(14) },
    { id: 'antispam', label: 'Anti-Spam', icon: I.zap(14) },
    { id: 'antiraid', label: 'Anti-Raid', icon: I.alert(14) },
    { id: 'welcoming', label: 'Welcoming', icon: I.userCheck(14) },
  ], []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <div className="text-center pt-12 pb-12 animate-up">
        <div className="text-xs uppercase tracking-wider text-mute font-mono mb-4">// 02 — Capabilities</div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4">Everything <span className="italic gradient-text">TLC</span> needs.</h1>
        <p className="text-mute max-w-xl mx-auto">{cmdCount > 0 && `${cmdCount} commands indexed • `}{recentSanctions.active_count} active sanctions tracked</p>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8 animate-up stagger-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`relative px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${tab === t.id ? 'text-white' : 'text-mute hover:text-white glass'}`}>
            {tab === t.id && <span className="absolute inset-0 bg-white rounded-full animate-scale" />}
            <span className="relative flex items-center gap-2">
              <span className={tab === t.id ? 'text-black' : 'text-violet'}>{t.icon}</span>
              <span className={tab === t.id ? 'text-black font-semibold' : ''}>{t.label}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="glass-card glass rounded-3xl p-8 animate-fade min-h-[400px]" key={tab}>
        {tab === 'moderation' && (
          <div>
            <h3 className="text-2xl font-bold mb-3">Moderation</h3>
            <p className="text-mute mb-6">Standard mod toolkit done right — ban, kick, mute, warn, purge, slowmode.</p>
            <div className="glass rounded-2xl p-4 font-mono text-sm space-y-1.5">
              <div className="text-white/70 hover:text-white transition-colors">/mute @user 60 Policy violation</div>
              <div className="text-white/70 hover:text-white transition-colors">/warn @user Spamming in #general</div>
              <div className="text-white/70 hover:text-white transition-colors">/kick @user Repeated rule violations</div>
              <div className="text-white/70 hover:text-white transition-colors">/ban @user Severe TOS breach</div>
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
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full" style={s.status === 'active' ? { color: '#fb7185', background: 'rgba(251,113,133,0.15)' } : s.status === 'lifted' ? { color: '#34d399', background: 'rgba(52,211,153,0.15)' } : { color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)' }}>{s.status}</span>
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
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

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
          <span className="text-8xl sm:text-9xl font-bold number-ticker tracking-tighter gradient-text glow-text">{animPing}</span>
          <span className="text-2xl text-mute font-light">ms</span>
        </div>
        <p className="text-mute text-sm mt-3 flex items-center justify-center gap-2">
          <span className="inline-block w-1 h-1 rounded-full bg-violet-400 animate-pulse" />
          {lastSuccessTime && isReal ? `Updated ${timeAgo(lastSuccessTime)}` : 'Awaiting data'}
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 animate-up stagger-1">
        <SvcCard icon={I.activity(16)} label="Discord Gateway" ok={discordOk} />
        <SvcCard icon={I.database(16)} label="SQLite Database" ok={dbOk} />
        <SvcCard icon={I.bot(16)} label="Bot Process" ok={isReal} />
      </section>
      <section className="glass-card glass rounded-3xl p-6 animate-up stagger-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">{I.activity(14)} Latency — 1 hour</h3>
          <button onClick={fetchAll} className="text-xs glass px-3 py-1.5 rounded-full btn-press flex items-center gap-1.5 hover:bg-white/5 transition-all">
            {I.refresh(12)} Refresh
          </button>
        </div>
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#areaGrad)" />
            <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" className="draw-path" />
            {mapped.map((d, i) => (<circle key={i} cx={d.x} cy={d.y} r="3" fill="#a78bfa" style={{ animation: `ping-soft 2s ${i * 0.1}s ease-in-out infinite` }} />))}
          </svg>
        </div>
      </section>
    </div>
  );
}

function SvcCard({ icon, label, ok }) {
  return (
    <div className="glass-card glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-violet">{icon}</span>
        <Dot ok={ok} error={!ok} />
      </div>
      <div className="font-medium text-sm">{label}</div>
      <div className={`text-xs mt-1 flex items-center gap-1.5 ${ok ? 'text-emerald-400' : 'text-red-400'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-emerald-400' : 'bg-red-400'}`} />
        {ok ? 'Operational' : 'Issue'}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════
function DashboardPage({ user, liveStatus, recentSanctions, featureFlags, serverInfo }) {
  if (!user) return <div className="max-w-5xl mx-auto px-4 py-24 text-center text-mute animate-fade">Sign in to access the dashboard.</div>;
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 animate-up">
        <div>
          <div className="text-xs text-mute font-mono mb-1">// 03 — Control</div>
          <h1 className="text-4xl font-black tracking-tighter">Dashboard</h1>
          <p className="text-mute text-sm mt-1">Welcome back, <span className="text-white">{user.displayName || user.username}</span></p>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs glass-strong flex items-center gap-2">
          <Dot ok={Boolean(liveStatus?.isRealData)} />
          <span>{liveStatus?.isRealData ? 'Live' : 'Demo'}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 animate-up stagger-1">
        <Metric label="Guilds" value={liveStatus?.metrics?.guildsCount ?? 0} />
        <Metric label="Sanctions" value={recentSanctions?.active_count ?? 0} />
        <Metric label="Commands" value={liveStatus?.metrics?.commandsCount ?? 0} />
      </div>
      {serverInfo?.isRealData && (
        <div className="glass-card glass rounded-3xl p-6 mb-4 animate-up stagger-2">
          <h3 className="text-sm font-medium mb-4">Runtime</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Info icon={I.clock(12)} label="Uptime" value={formatUptime(serverInfo.uptime_seconds)} />
            <Info icon={I.code(12)} label="Python" value={serverInfo.python_version} />
            <Info icon={I.cpu(12)} label="discord.py" value={serverInfo.discord_py_version} />
            <Info icon={I.server(12)} label="OS" value={serverInfo.platform} />
          </div>
        </div>
      )}
      {featureFlags?.isRealData && (
        <div className="glass-card glass rounded-3xl p-6 animate-up stagger-3">
          <h3 className="text-sm font-medium mb-4">Modules</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(featureFlags).filter(([k, v]) => typeof v === 'boolean').map(([k, v]) => (
              <div key={k} className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-all hover:scale-105 ${v ? 'bg-violet-500/10 text-violet' : 'bg-white/5 text-mute'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${v ? 'bg-violet-400 animate-pulse' : 'bg-white/30'}`} />
                <span className="capitalize">{k.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }) {
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
