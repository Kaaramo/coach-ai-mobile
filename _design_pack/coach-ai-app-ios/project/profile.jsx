/* global React, Icons */
const { useState } = React;

const USER = {
  name: "Karamo Sylla",
  email: "karamo.sylla@coach-ai.com",
  initials: "KS",
};

const DEVICE = {
  type: "Raspberry Pi 5 — Edge AI",
  id: "rpi5-aghzout-001",
};

// ============================================================
// Reusable bits
// ============================================================
function SettingsListItem({ icon, label, value, onClick, danger, last }) {
  const Ic = Icons[icon];
  return (
    <button
      className={"pr-item" + (danger ? " danger" : "")}
      onClick={onClick}
      style={last ? { borderBottom: "none" } : null}
    >
      {Ic && <span className="lead"><Ic size={20} /></span>}
      <span className="label">{label}</span>
      {value && <span className="value">{value}</span>}
      {!danger && <span className="trail"><Icons.ChevronRight size={20} /></span>}
    </button>
  );
}

function Switch({ on, onChange }) {
  return (
    <button
      className={"pr-switch" + (on ? " on" : "")}
      onClick={() => onChange && onChange(!on)}
      role="switch"
      aria-checked={on}
    />
  );
}

// ============================================================
// SCREEN 1 — PROFILE MAIN
// ============================================================
function ProfileScreen({ onNavigate }) {
  return (
    <div className="pr-screen">
      <div className="pr-scroll">
        <div className="pr-user">
          <div className="pr-avatar">{USER.initials}</div>
          <div className="pr-name">{USER.name}</div>
          <div className="pr-email">{USER.email}</div>
          <button className="pr-edit" disabled>Modifier le profil</button>
        </div>

        <div className="pr-device">
          <div className="caps">Boîtier associé</div>
          <div className="pr-device-row">
            <span className="ic"><Icons.Cpu size={24} /></span>
            <div className="col">
              <div className="name">{DEVICE.type}</div>
              <div className="id">{DEVICE.id}</div>
              <div className="pr-device-pill"><span className="live"></span>En ligne</div>
            </div>
          </div>
        </div>

        <div className="pr-section-h">Compte</div>
        <div className="pr-group">
          <SettingsListItem icon="BellRing" label="Préférences notifications" value="Santé, Productivité, Réunion" onClick={() => onNavigate && onNavigate("notifications")} />
          <SettingsListItem icon="Download" label="Export de mes données" onClick={() => onNavigate && onNavigate("export")} />
          <SettingsListItem icon="Info" label="À propos" value="v1.0.0" onClick={() => onNavigate && onNavigate("about")} last />
        </div>

        <div className="pr-section-h">Apparence</div>
        <div className="pr-group">
          <SettingsListItem icon="Palette" label="Mode" value="Sombre" last />
        </div>

        <div className="pr-bottom">
          <button className="pr-btn-ghost"><Icons.LogOut size={20} />Déconnexion</button>
          <button className="pr-btn-danger"><Icons.Trash2 size={20} />Supprimer mon compte</button>
        </div>
      </div>
      <TabBar active="profile" />
    </div>
  );
}

// ============================================================
// SCREEN 2 — NOTIFICATIONS
// ============================================================
function ToggleRow({ icon, color, title, desc, value, onChange }) {
  const Ic = Icons[icon];
  return (
    <div className={"tog-card" + (value ? " on" : "")} style={{ "--accent": color, borderLeftColor: color }}>
      <span className="ic" style={{ color }}><Ic size={22} /></span>
      <div className="text">
        <div className="ttl">{title}</div>
        <div className="desc">{desc}</div>
      </div>
      <button className="switch" onClick={() => onChange(!value)} aria-pressed={value}></button>
    </div>
  );
}

function NotificationsScreen({ onBack }) {
  const [prefs, setPrefs] = useState({ health: true, productivity: true, meetings: true });
  const [silent, setSilent] = useState(true);

  return (
    <div className="pr-screen">
      <div className="pr-header">
        <button className="pr-back" onClick={onBack}><Icons.ChevronLeft size={22} /></button>
        <h1>Notifications</h1>
        <div style={{ width: 40 }}></div>
      </div>
      <div className="pr-scroll">
        <div className="pr-section-h">Catégories</div>
        <div className="pr-tog-stack">
          <ToggleRow icon="HeartPulse" color="#FF3B5C" title="Santé" desc="Hydratation, posture, alertes critiques" value={prefs.health} onChange={v => setPrefs({...prefs, health: v})} />
          <ToggleRow icon="TimerReset" color="#FFB020" title="Productivité" desc="Pauses, distractions, focus" value={prefs.productivity} onChange={v => setPrefs({...prefs, productivity: v})} />
          <ToggleRow icon="Users" color="#00C8E6" title="Réunion" desc="Synthèses, décisions, suivi" value={prefs.meetings} onChange={v => setPrefs({...prefs, meetings: v})} />
        </div>

        <div className="pr-section-h">Mode silencieux</div>
        <div className="pr-silent-card">
          <div className="pr-silent-row">
            <span className="ic"><Icons.Moon size={20} /></span>
            <div className="col">
              <div className="ttl">Activer le mode silencieux</div>
              <div className="desc">Aucune notif sauf urgences</div>
            </div>
            <Switch on={silent} onChange={setSilent} />
          </div>
          {silent && (
            <div className="pr-time-range">
              <div className="pr-time-block"><div className="lbl">Début</div><div className="val">22:00</div></div>
              <span className="pr-time-arrow"><Icons.ArrowRight size={18} /></span>
              <div className="pr-time-block"><div className="lbl">Fin</div><div className="val">07:00</div></div>
            </div>
          )}
        </div>

        <div className="pr-section-h">Urgences</div>
        <div className="pr-urgency-card">
          <div className="pr-urgency-h">
            <span className="ic"><Icons.AlertTriangle size={20} /></span>
            <h3>Toujours actives</h3>
          </div>
          <p>Les alertes critiques (chute, urgence santé) passent même en mode silencieux.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 3 — EXPORT
// ============================================================
function ExportScreen({ onBack }) {
  const [period, setPeriod] = useState("30d");
  const [format, setFormat] = useState("csv");
  const [items, setItems] = useState({ alerts: true, conversations: true, habits: true });

  return (
    <div className="pr-screen">
      <div className="pr-header">
        <button className="pr-back" onClick={onBack}><Icons.ChevronLeft size={22} /></button>
        <h1>Export</h1>
        <div style={{ width: 40 }}></div>
      </div>
      <div className="pr-scroll">
        <div className="pr-hero">
          <div className="ic-wrap"><Icons.Download size={40} /></div>
          <h2>Exporte tes données</h2>
          <p>Récupère ton historique sous forme de fichier que tu peux ouvrir partout.</p>
        </div>

        <div className="pr-section-h">Période</div>
        <div className="pr-chips">
          <button className={"chip" + (period === "7d" ? " active" : "")} onClick={() => setPeriod("7d")}>7 derniers jours</button>
          <button className={"chip" + (period === "30d" ? " active" : "")} onClick={() => setPeriod("30d")}>30 derniers jours</button>
          <button className={"chip" + (period === "custom" ? " active" : "")} onClick={() => setPeriod("custom")}>Personnalisée</button>
        </div>

        <div className="pr-section-h">Format</div>
        <div className="pr-radio-grid">
          <button className={"pr-radio-card" + (format === "csv" ? " active" : "")} onClick={() => setFormat("csv")}>
            <span className="ic" style={{ "--c": "#41FF31" }}><Icons.FileSpreadsheet size={28} /></span>
            <div className="ttl">CSV</div>
            <div className="desc">Excel, Google Sheets</div>
          </button>
          <button className={"pr-radio-card" + (format === "json" ? " active" : "")} onClick={() => setFormat("json")}>
            <span className="ic" style={{ "--c": "#9D5CFF" }}><Icons.FileCode size={28} /></span>
            <div className="ttl">JSON</div>
            <div className="desc">Données brutes</div>
          </button>
        </div>

        <div className="pr-section-h">Que souhaites-tu exporter ?</div>
        <div className="pr-check-stack">
          <button className={"pr-check-card" + (items.alerts ? " active" : "")} onClick={() => setItems({...items, alerts: !items.alerts})}>
            <span className="ic"><Icons.BellRing size={20} /></span>
            <div className="col"><div className="ttl">Mes alertes</div><div className="desc">Historique de notifications</div></div>
            <div className="pr-checkbox"><Icons.Check size={14} /></div>
          </button>
          <button className={"pr-check-card" + (items.conversations ? " active" : "")} onClick={() => setItems({...items, conversations: !items.conversations})}>
            <span className="ic"><Icons.MessageCircle size={20} /></span>
            <div className="col"><div className="ttl">Mes conversations</div><div className="desc">Échanges avec le coach</div></div>
            <div className="pr-checkbox"><Icons.Check size={14} /></div>
          </button>
          <button className={"pr-check-card" + (items.habits ? " active" : "")} onClick={() => setItems({...items, habits: !items.habits})}>
            <span className="ic"><Icons.BarChart3 size={20} /></span>
            <div className="col"><div className="ttl">Mes habitudes</div><div className="desc">Données quotidiennes agrégées</div></div>
            <div className="pr-checkbox"><Icons.Check size={14} /></div>
          </button>
        </div>

        <div className="pr-export-cta">
          <button className="btn btn-primary" style={{ width: "100%" }}>
            <Icons.Download size={20} />
            Exporter
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 4 — ABOUT
// ============================================================
function AboutScreen({ onBack }) {
  return (
    <div className="pr-screen">
      <div className="pr-header">
        <button className="pr-back" onClick={onBack}><Icons.ChevronLeft size={22} /></button>
        <h1>À propos</h1>
        <div style={{ width: 40 }}></div>
      </div>
      <div className="pr-scroll">
        <div className="pr-about-hero">
          <div className="pr-about-logo"><Icons.Sparkles size={32} /></div>
          <h2>Coach AI</h2>
          <div className="ver">Version 1.0.0 (build 1)</div>
        </div>

        <div className="pr-section-h">Équipe</div>
        <div className="pr-team-card">
          <div className="pr-team-section">
            <div className="caps">Projet encadré par</div>
            <div className="name">Prof. Dr. Otman Aghzout</div>
          </div>
          <div className="pr-team-section">
            <div className="caps">Pôle application mobile</div>
            <div className="name sm">Karamo Sylla</div>
          </div>
        </div>

        <div className="pr-section-h">Documents légaux</div>
        <div className="pr-group">
          <SettingsListItem icon="FileText" label="Politique de confidentialité" />
          <SettingsListItem icon="FileText" label="Conditions d'utilisation" />
          <SettingsListItem icon="Shield" label="Sécurité et chiffrement" last />
        </div>

        <div className="pr-section-h">Open Source</div>
        <div className="pr-group">
          <SettingsListItem icon="Github" label="Code source" />
          <SettingsListItem icon="Heart" label="Licences open source" last />
        </div>

        <div className="pr-credits">Coach AI · Construit avec attention</div>
      </div>
    </div>
  );
}

const TabBar = window.TabBar;
window.ProfileScreen = ProfileScreen;
window.NotificationsScreen = NotificationsScreen;
window.ExportScreen = ExportScreen;
window.AboutScreen = AboutScreen;
