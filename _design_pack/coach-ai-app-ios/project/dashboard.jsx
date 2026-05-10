/* global React, Icons */
const { useState, useEffect, useMemo } = React;

// ============================================================
// MOCK DATA
// ============================================================
const mockInsightToday = {
  generatedAt: "2026-04-29T15:00:00Z",
  text: "Tu as passé 3 h 45 en code ce matin et pris 2 pauses. Bien parti pour la journée — pense à boire.",
};

const habitsByRange = {
  day: {
    totalMin: 432, // 7h12
    categories: [
      { name: "Code",    duration: 225, percentage: 52, color: "#4A53FF" },
      { name: "Réunion", duration: 86,  percentage: 20, color: "#00C8E6" },
      { name: "Pause",   duration: 65,  percentage: 15, color: "#41FF31" },
      { name: "Autre",   duration: 56,  percentage: 13, color: "#6E6E76" },
    ],
  },
  week: {
    totalMin: 2340, // 39h
    categories: [
      { name: "Code",    duration: 1260, percentage: 54, color: "#4A53FF" },
      { name: "Réunion", duration: 540,  percentage: 23, color: "#00C8E6" },
      { name: "Pause",   duration: 320,  percentage: 14, color: "#41FF31" },
      { name: "Autre",   duration: 220,  percentage: 9,  color: "#6E6E76" },
    ],
  },
  month: {
    totalMin: 9600, // 160h
    categories: [
      { name: "Code",    duration: 5280, percentage: 55, color: "#4A53FF" },
      { name: "Réunion", duration: 2160, percentage: 23, color: "#00C8E6" },
      { name: "Pause",   duration: 1200, percentage: 12, color: "#41FF31" },
      { name: "Autre",   duration: 960,  percentage: 10, color: "#6E6E76" },
    ],
  },
};

const mockUseCases = [
  { id: "health-hydra",   icon: "Droplet",        title: "Hydratation", kpi: "3 alertes",      color: "#FF3B5C" },
  { id: "health-posture", icon: "PersonStanding", title: "Posture",     kpi: "1 alerte",       color: "#FF3B5C" },
  { id: "meeting",        icon: "Users",          title: "Réunion",     kpi: "2 résumés",      color: "#00C8E6" },
  { id: "tasks",          icon: "TimerReset",     title: "Tâches",      kpi: "0 dépassement",  color: "#FFB020" },
];

const CAT_COLOR = {
  health:       "#FF3B5C",
  productivity: "#FFB020",
  meeting:      "#00C8E6",
  rag:          "#9D5CFF",
};
const CAT_ICON = {
  health:       "Droplet",
  productivity: "Timer",
  meeting:      "Users",
  rag:          "Sparkles",
};
const CAT_LABEL = {
  health:       "SANTÉ",
  productivity: "PRODUCTIVITÉ",
  meeting:      "RÉUNION",
  rag:          "RAG",
};

const mockRecentAlerts = [
  { id: "a_001", category: "health",       title: "Hydratation rappel",  body: "Tu n'as pas bu depuis 2 h. Pense à t'hydrater.",   time: "14:32" },
  { id: "a_002", category: "productivity", title: "Pause recommandée",   body: "1 h 45 sans bouger. Lève-toi 5 minutes.",          time: "13:15" },
  { id: "a_003", category: "meeting",      title: "Synthèse de réunion", body: "3 décisions extraites de ta réunion de 11 h.",     time: "12:08" },
];

// ============================================================
// HELPERS
// ============================================================
function fmtDuration(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${String(m).padStart(2, "0")}`;
}

// ============================================================
// HEADER
// ============================================================
function DashboardHeader({ unread = 3, onBell }) {
  return (
    <div className="dash-header">
      <div className="dash-header-left">
        <div className="dash-avatar">K</div>
        <div className="dash-greet">
          <div className="dash-greet-caps">Bonjour</div>
          <div className="dash-greet-name">Karamo</div>
        </div>
      </div>
      <button className="dash-bell" onClick={onBell} aria-label="Notifications">
        <Icons.BellRing size={22} />
        {unread > 0 && <span className="badge">{unread}</span>}
      </button>
    </div>
  );
}

// ============================================================
// INSIGHT CARD
// ============================================================
function InsightCard({ loading = false, empty = false, text }) {
  if (loading) {
    return (
      <div className="insight-card">
        <div className="insight-head">
          <span className="ic"><Icons.Sparkles size={18} /></span>
          <span className="caps">Insight du jour</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="sk-line" style={{ width: "100%" }}></div>
          <div className="sk-line" style={{ width: "92%" }}></div>
          <div className="sk-line" style={{ width: "60%", height: 12 }}></div>
        </div>
      </div>
    );
  }
  if (empty) {
    return (
      <div className="insight-card">
        <div className="insight-head">
          <span className="ic" style={{ opacity: 0.45 }}><Icons.Sparkles size={28} /></span>
          <span className="caps" style={{ opacity: 0.6 }}>Insight du jour</span>
        </div>
        <div className="insight-body" style={{ color: "#B7B7BD" }}>
          On apprend tes habitudes — reviens dans quelques heures pour ton premier insight.
        </div>
      </div>
    );
  }
  return (
    <div className="insight-card">
      <div className="insight-head">
        <span className="ic"><Icons.Sparkles size={18} /></span>
        <span className="caps">Insight du jour</span>
      </div>
      <div className="insight-body">{text}</div>
      <button className="insight-link">
        Demande à mon coach
        <Icons.ArrowRight size={14} />
      </button>
    </div>
  );
}

// ============================================================
// SEGMENTED CONTROL
// ============================================================
function PeriodSegmentedControl({ value, onChange }) {
  const opts = [
    { id: "day",   label: "Jour" },
    { id: "week",  label: "Semaine" },
    { id: "month", label: "Mois" },
  ];
  const idx = opts.findIndex(o => o.id === value);
  return (
    <div className="seg" role="tablist">
      <div
        className="seg-indicator"
        style={{ transform: `translateX(calc(${idx} * 100%))` }}
      />
      {opts.map(o => (
        <button
          key={o.id}
          className={value === o.id ? "active" : ""}
          onClick={() => onChange(o.id)}
          role="tab"
          aria-selected={value === o.id}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// ACTIVITY RING + LEGEND
// ============================================================
function ActivityRing({ categories, totalMin, animate = true }) {
  const size = 200, stroke = 16, r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;

  const [progress, setProgress] = useState(animate ? 0 : 1);
  useEffect(() => {
    if (!animate) { setProgress(1); return; }
    setProgress(0);
    const t = setTimeout(() => setProgress(1), 60);
    return () => clearTimeout(t);
  }, [categories, animate]);

  let acc = 0;

  const a11yLabel = useMemo(() => {
    const h = Math.floor(totalMin / 60), m = totalMin % 60;
    return `Total ${h} heures ${m}. ` + categories.map(c => `${c.name} ${c.percentage} pourcent`).join(". ");
  }, [categories, totalMin]);

  return (
    <div className="ring-wrap" role="img" aria-label={a11yLabel}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#27272A" strokeWidth={stroke} />
        {categories.map((c, i) => {
          const len = (c.percentage / 100) * C * progress;
          const offset = -((acc / 100) * C);
          acc += c.percentage;
          return (
            <circle
              key={i}
              cx={size/2} cy={size/2} r={r}
              fill="none"
              stroke={c.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dasharray 800ms cubic-bezier(0.215, 0.61, 0.355, 1)" }}
            />
          );
        })}
      </svg>
      <div className="ring-center">
        <div className="ring-kpi">{fmtDuration(totalMin)}</div>
        <div className="ring-kpi-caps">Total actif</div>
      </div>
    </div>
  );
}

function ActivityLegend({ categories }) {
  return (
    <div className="legend">
      {categories.map((c, i) => (
        <div className="legend-row" key={i} style={{ "--c": c.color }}>
          <div className="dot"></div>
          <div className="lbl">{c.name}</div>
          <div className="dur">{fmtDuration(c.duration)}</div>
          <div className="pct">{c.percentage}%</div>
        </div>
      ))}
    </div>
  );
}

const ACTIVITY_CAPS = {
  day:   "Activité du jour",
  week:  "Activité de la semaine",
  month: "Activité du mois",
};

function ActivitySection({ data, loading, period = "day" }) {
  return (
    <>
      <SectionHeader caps={ACTIVITY_CAPS[period] || "Activité"} />
      {loading ? (
        <div className="activity">
          <div className="ring-skeleton"></div>
          <div className="legend">
            {[1,2,3,4].map(i => (
              <div key={i} className="sk-line" style={{ height: 14, width: "85%" }}></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="activity">
          <ActivityRing categories={data.categories} totalMin={data.totalMin} />
          <ActivityLegend categories={data.categories} />
        </div>
      )}
    </>
  );
}

// ============================================================
// SECTION HEADER
// ============================================================
function SectionHeader({ caps, link, onLinkPress }) {
  return (
    <div className="sec-h">
      <div className="caps">{caps}</div>
      {link && (
        <button className="link" onClick={onLinkPress}>
          {link}
          <Icons.ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}

// ============================================================
// USE CASE GRID
// ============================================================
function UseCaseCard({ icon, title, kpi, color, onPress }) {
  const Ic = Icons[icon] || Icons.Sparkles;
  return (
    <div className="uc-card" style={{ "--c": color }} onClick={onPress} role="button">
      <div className="ic"><Ic size={24} /></div>
      <div className="ttl">{title}</div>
      <div className="kpi">{kpi}</div>
    </div>
  );
}

function UseCaseGrid({ items }) {
  return (
    <>
      <SectionHeader caps="Cas d'usage" />
      <div className="usecase-grid">
        {items.map(it => <UseCaseCard key={it.id} {...it} />)}
      </div>
    </>
  );
}

// ============================================================
// ALERT CARD + LIST
// ============================================================
function AlertCard({ category, title, body, time, onPress }) {
  const Ic = Icons[CAT_ICON[category]] || Icons.BellRing;
  const color = CAT_COLOR[category];
  return (
    <div className="alert-card" style={{ "--c": color }} onClick={onPress} role="button">
      <span className="ic"><Ic size={22} /></span>
      <div className="body">
        <div className="cat">{CAT_LABEL[category]}</div>
        <div className="ttl">{title}</div>
        <div className="desc">{body}</div>
      </div>
      <div className="ts">{time}</div>
    </div>
  );
}

function RecentAlertsSection({ alerts, onSeeAll }) {
  return (
    <>
      <SectionHeader caps="Alertes récentes" link="Voir tout" onLinkPress={onSeeAll} />
      <div className="alerts-list">
        {alerts.map(a => <AlertCard key={a.id} {...a} />)}
      </div>
    </>
  );
}

// ============================================================
// OFFLINE BANNER
// ============================================================
function OfflineBanner({ onRetry }) {
  return (
    <div className="offline-banner">
      <span className="ob-ic"><Icons.WifiOff size={18} /></span>
      <span className="ob-text">Connexion indisponible — données en cache</span>
      <button className="ob-retry" onClick={onRetry}>Réessayer</button>
    </div>
  );
}

// ============================================================
// TAB BAR
// ============================================================
function TabBar({ active = "home", unread = 3, onChange }) {
  const tabs = [
    { id: "home",     icon: "LayoutDashboard", label: "Accueil" },
    { id: "alerts",   icon: "BellRing",        label: "Alertes", badge: unread },
    { id: "chat",     icon: "MessageCircle",   label: "Coach" },
    { id: "profile",  icon: "User",            label: "Profil" },
  ];
  return (
    <div className="tabbar" role="tablist">
      {tabs.map(t => {
        const Ic = Icons[t.icon];
        return (
          <button
            key={t.id}
            className={"tab" + (active === t.id ? " active" : "")}
            onClick={() => onChange && onChange(t.id)}
            role="tab"
            aria-selected={active === t.id}
          >
            <Ic size={22} />
            <span className="lbl">{t.label}</span>
            {t.badge > 0 && <span className="pill">{t.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// DASHBOARD SCREEN
// ============================================================
function DashboardScreen({
  loading = false,
  empty = false,
  offline = false,
  initialPeriod = "day",
}) {
  const [period, setPeriod] = useState(initialPeriod);
  const [activeTab, setActiveTab] = useState("home");
  const data = habitsByRange[period];

  return (
    <div className="dash">
      <DashboardHeader unread={3} />
      <div className="dash-scroll">
        {offline && <OfflineBanner />}
        <div className="dash-stagger">
          <InsightCard
            loading={loading}
            empty={empty}
            text={mockInsightToday.text}
          />
          <PeriodSegmentedControl value={period} onChange={setPeriod} />
          <div key={period}>
            <ActivitySection data={data} loading={loading} period={period} />
          </div>
          <UseCaseGrid items={mockUseCases} />
          <RecentAlertsSection alerts={mockRecentAlerts} />
        </div>
      </div>
      <TabBar active={activeTab} unread={3} onChange={setActiveTab} />
    </div>
  );
}

window.DashboardScreen = DashboardScreen;
window.DashboardHeader = DashboardHeader;
window.InsightCard = InsightCard;
window.PeriodSegmentedControl = PeriodSegmentedControl;
window.ActivityRing = ActivityRing;
window.ActivityLegend = ActivityLegend;
window.UseCaseCard = UseCaseCard;
window.AlertCard = AlertCard;
window.SectionHeader = SectionHeader;
window.OfflineBanner = OfflineBanner;
window.TabBar = TabBar;
