/* global React */
// Lucide-style icons (outline, stroke 1.5, currentColor)
const SvgIcon = ({ children, size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
       style={style}>
    {children}
  </svg>
);

const Icons = {
  Eye:        (p) => <SvgIcon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></SvgIcon>,
  BellRing:   (p) => <SvgIcon {...p}><path d="M5.27 16.73a8 8 0 1 1 13.46 0"/><path d="M9 18h6"/><path d="M10 21h4"/><path d="M19 4l1.5 1.5"/><path d="M5 4 3.5 5.5"/></SvgIcon>,
  Sparkles:   (p) => <SvgIcon {...p}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 14l.7 1.9L21.6 17l-1.9.7L19 19.6l-.7-1.9L16.4 17l1.9-1.1z"/></SvgIcon>,
  Droplet:    (p) => <SvgIcon {...p}><path d="M12 2.5s6 6.7 6 11.5a6 6 0 1 1-12 0c0-4.8 6-11.5 6-11.5z"/></SvgIcon>,
  Timer:      (p) => <SvgIcon {...p}><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></SvgIcon>,
  Users:      (p) => <SvgIcon {...p}><circle cx="9" cy="7" r="4"/><path d="M3 21a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="3"/><path d="M22 19a5 5 0 0 0-7-4.6"/></SvgIcon>,
  HeartPulse: (p) => <SvgIcon {...p}><path d="M3.4 12H7l2-4 3 8 2-4h6.6"/><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></SvgIcon>,
  Cpu:        (p) => <SvgIcon {...p}><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></SvgIcon>,
  ChevronLeft:(p) => <SvgIcon {...p}><path d="M15 18l-6-6 6-6"/></SvgIcon>,
  AlertTriangle: (p) => <SvgIcon {...p}><path d="M10.3 3.7 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></SvgIcon>,
  Shield:     (p) => <SvgIcon {...p}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/></SvgIcon>,
  PersonStanding: (p) => <SvgIcon {...p}><circle cx="12" cy="4" r="2"/><path d="M9 22 12 12l3 10"/><path d="M8 11h8"/><path d="M12 12V7"/></SvgIcon>,
  TimerReset: (p) => <SvgIcon {...p}><path d="M10 2h4"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"/><path d="M9 17H4v5"/></SvgIcon>,
  LayoutDashboard: (p) => <SvgIcon {...p}><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></SvgIcon>,
  MessageCircle: (p) => <SvgIcon {...p}><path d="M21 12a9 9 0 1 1-3.2-6.9L21 4l-1 4.2A9 9 0 0 1 21 12z"/></SvgIcon>,
  User: (p) => <SvgIcon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></SvgIcon>,
  WifiOff: (p) => <SvgIcon {...p}><path d="M2 2l20 20"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/><path d="M5 12.5a10 10 0 0 1 4-2.5"/><path d="M14 6.6a10 10 0 0 1 7 3.9"/><path d="M2 8.8a10 10 0 0 1 4-2.7"/><circle cx="12" cy="20" r="0.6" fill="currentColor"/></SvgIcon>,
  ChevronRight: (p) => <SvgIcon {...p}><path d="M9 18l6-6-6-6"/></SvgIcon>,
  ArrowRight: (p) => <SvgIcon {...p}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></SvgIcon>,
  Search: (p) => <SvgIcon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></SvgIcon>,
  X: (p) => <SvgIcon {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></SvgIcon>,
  BellOff: (p) => <SvgIcon {...p}><path d="M8.7 3a8 8 0 0 1 13 6.5"/><path d="M19 17H4a8 8 0 0 0 1.5-2"/><path d="M5 5a8 8 0 0 0-2 5"/><path d="M2 2l20 20"/><path d="M9 18a3 3 0 0 0 6 0"/></SvgIcon>,
  SearchX: (p) => <SvgIcon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="m9 9 4 4"/><path d="m13 9-4 4"/></SvgIcon>,
  Mail: (p) => <SvgIcon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></SvgIcon>,
  Trash2: (p) => <SvgIcon {...p}><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></SvgIcon>,
  Check: (p) => <SvgIcon {...p}><path d="M20 6 9 17l-5-5"/></SvgIcon>,
  Clock: (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></SvgIcon>,
  MapPin: (p) => <SvgIcon {...p}><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></SvgIcon>,
  Volume2: (p) => <SvgIcon {...p}><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/></SvgIcon>,
  Activity: (p) => <SvgIcon {...p}><path d="M3 12h4l3-9 4 18 3-9h4"/></SvgIcon>,
  MoreVertical: (p) => <SvgIcon {...p}><circle cx="12" cy="5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></SvgIcon>,
  XCircle: (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></SvgIcon>,
  Undo2: (p) => <SvgIcon {...p}><path d="M9 14 4 9l5-5"/><path d="M4 9h11a6 6 0 0 1 0 12h-3"/></SvgIcon>,
  Share: (p) => <SvgIcon {...p}><path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/></SvgIcon>,
  Menu: (p) => <SvgIcon {...p}><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></SvgIcon>,
  Plus: (p) => <SvgIcon {...p}><path d="M12 5v14"/><path d="M5 12h14"/></SvgIcon>,
  MessageCircleDashed: (p) => <SvgIcon {...p}><path d="M3.7 8.4A9 9 0 0 1 7 4.5"/><path d="M2.6 13a9 9 0 0 1 .2-3.4"/><path d="M4.5 17a9 9 0 0 1-1.6-3"/><path d="M9 20.5a9 9 0 0 1-3-1.7"/><path d="M14.6 21a9 9 0 0 1-3.4 0"/><path d="M21 14a9 9 0 0 1-3.5 6"/><path d="M21.6 11a9 9 0 0 1-.6 3.4"/><path d="M11 3.1a9 9 0 0 1 8.8 4.8"/></SvgIcon>,
  ArrowUp: (p) => <SvgIcon {...p}><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></SvgIcon>,
  ArrowUpRight: (p) => <SvgIcon {...p}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></SvgIcon>,
  Square: (p) => <SvgIcon {...p}><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" stroke="none"/></SvgIcon>,
  Database: (p) => <SvgIcon {...p}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></SvgIcon>,
  Download: (p) => <SvgIcon {...p}><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></SvgIcon>,
  Info: (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 16v-5"/><path d="M12 8h.01"/></SvgIcon>,
  Palette: (p) => <SvgIcon {...p}><circle cx="13.5" cy="6.5" r="1" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r="1" fill="currentColor" stroke="none"/><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 10 10c0 2.4-3 3-5 3-2.5 0-2 2-2 3 0 1.6-1.5 4-3 4z"/></SvgIcon>,
  LogOut: (p) => <SvgIcon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></SvgIcon>,
  Moon: (p) => <SvgIcon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></SvgIcon>,
  FileSpreadsheet: (p) => <SvgIcon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M11 13v8"/></SvgIcon>,
  FileCode: (p) => <SvgIcon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 14-2 2 2 2"/><path d="m15 14 2 2-2 2"/></SvgIcon>,
  FileText: (p) => <SvgIcon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h4"/></SvgIcon>,
  BarChart3: (p) => <SvgIcon {...p}><path d="M3 3v18h18"/><path d="M8 17V9"/><path d="M13 17V5"/><path d="M18 17v-7"/></SvgIcon>,
  Github: (p) => <SvgIcon {...p}><path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 5v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.6a5.1 5.1 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.5s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C6.7 1.5 5.6 1.8 5.6 1.8a4.8 4.8 0 0 0-.1 3.5 5.1 5.1 0 0 0-1.4 3.6c0 5 3 6.3 6 6.6a3 3 0 0 0-.8 2.3V21"/></SvgIcon>,
  Heart: (p) => <SvgIcon {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></SvgIcon>,
};

// Coach AI logo — gradient brain monogram (radial spokes)
function CoachLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="cg" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4A53FF"/>
          <stop offset="0.5" stopColor="#33C0B8"/>
          <stop offset="1" stopColor="#41FF31"/>
        </linearGradient>
        <radialGradient id="ccore" cx="60" cy="60" r="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5DFF52"/>
          <stop offset="1" stopColor="#33C0B8"/>
        </radialGradient>
      </defs>
      <path d="M 54.77 10.27 A 50 50 0 0 1 98.86 28.53 L 72.43 49.93 A 16 16 0 0 0 58.33 44.09 Z" fill="url(#cg)" opacity="1"/>
      <path d="M 91.47 21.14 A 50 50 0 0 1 109.73 65.23 L 75.91 61.67 A 16 16 0 0 0 70.07 47.57 Z" fill="url(#cg)" opacity="0.92"/>
      <path d="M 109.73 54.77 A 50 50 0 0 1 91.47 98.86 L 70.07 72.43 A 16 16 0 0 0 75.91 58.33 Z" fill="url(#cg)" opacity="0.78"/>
      <path d="M 98.86 91.47 A 50 50 0 0 1 54.77 109.73 L 58.33 75.91 A 16 16 0 0 0 72.43 70.07 Z" fill="url(#cg)" opacity="0.62"/>
      <path d="M 65.23 109.73 A 50 50 0 0 1 21.14 91.47 L 47.57 70.07 A 16 16 0 0 0 61.67 75.91 Z" fill="url(#cg)" opacity="0.55"/>
      <path d="M 28.53 98.86 A 50 50 0 0 1 10.27 54.77 L 44.09 58.33 A 16 16 0 0 0 49.93 72.43 Z" fill="url(#cg)" opacity="0.68"/>
      <path d="M 10.27 65.23 A 50 50 0 0 1 28.53 21.14 L 49.93 47.57 A 16 16 0 0 0 44.09 61.67 Z" fill="url(#cg)" opacity="0.85"/>
      <path d="M 21.14 28.53 A 50 50 0 0 1 65.23 10.27 L 61.67 44.09 A 16 16 0 0 0 47.57 49.93 Z" fill="url(#cg)" opacity="0.97"/>
      <circle cx="60" cy="60" r="14" fill="#0A0A0F"/>
      <circle cx="60" cy="60" r="6" fill="url(#ccore)"/>
    </svg>
  );
}

// Google "G" logo
function GoogleG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC04" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
      <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
    </svg>
  );
}

window.Icons = Icons;
window.CoachLogo = CoachLogo;
window.GoogleG = GoogleG;
