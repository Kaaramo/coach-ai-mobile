/* global React, Icons */
const { useState, useEffect, useMemo, useRef } = React;

// ============================================================
// MOCK DATA — 20 alertes sur 3 jours
// ============================================================
const ALL_ALERTS = [
  // Aujourd'hui
  { id: "a_001", category: "health",       title: "Hydratation rappel",  body: "Tu n'as pas bu depuis 2 h. Pense à t'hydrater pour rester focus sur ton bloc de code.", time: "14:32", day: "today", read: false, actioned: false,
    ctx: { activity: "Code (laptop, écran, deux moniteurs)", audio: "Mots-clés : « deadline », « fix bug »", location: "Bureau · 33.5731° N, 7.5898° W", duration: "1 h 45 sans interruption", confidence: "92%" } },
  { id: "a_002", category: "productivity", title: "Pause recommandée",   body: "1 h 45 sans bouger. Lève-toi 5 minutes pour t'aérer.", time: "13:15", day: "today", read: true, actioned: false,
    ctx: { activity: "Position assise prolongée", audio: "—", location: "Bureau", duration: "1 h 45", confidence: "88%" } },
  { id: "a_003", category: "meeting",      title: "Synthèse de réunion", body: "3 décisions extraites de ta réunion de 11 h. Tap pour voir le résumé.", time: "12:08", day: "today", read: true, actioned: true,
    ctx: { activity: "Réunion (4 personnes détectées)", audio: "Mots-clés : « roadmap », « Q3 », « deadline »", location: "Salle de réunion", duration: "52 min", confidence: "95%" } },
  { id: "a_004", category: "rag",          title: "Insight matinal",     body: "Tu codes plus vite après une marche. Pense à sortir 10 min avant ton bloc de l'après-midi.", time: "10:42", day: "today", read: false, actioned: false,
    ctx: { activity: "Pattern hebdomadaire", audio: "—", location: "—", duration: "—", confidence: "78%" } },
  { id: "a_005", category: "health",       title: "Posture ajustée",     body: "Tu es penché en avant depuis 30 min. Redresse-toi.", time: "09:58", day: "today", read: true, actioned: false,
    ctx: { activity: "Posture assise", audio: "—", location: "Bureau", duration: "32 min", confidence: "84%" } },
  // Hier
  { id: "a_006", category: "productivity", title: "Tâche dépassée",      body: "« Refactor auth » prend 2× le temps estimé. Veux-tu re-prioriser ?", time: "17:21", day: "yesterday", read: true, actioned: false,
    ctx: { activity: "Code", audio: "—", location: "Bureau", duration: "4 h 12", confidence: "90%" } },
  { id: "a_007", category: "meeting",      title: "Réunion sans agenda", body: "Standup 1-1 a duré 38 min sans agenda partagé.", time: "15:02", day: "yesterday", read: true, actioned: true,
    ctx: { activity: "Réunion (2 personnes)", audio: "—", location: "—", duration: "38 min", confidence: "87%" } },
  { id: "a_008", category: "health",       title: "Hydratation rappel",  body: "Bois un verre d'eau.", time: "11:15", day: "yesterday", read: true, actioned: true,
    ctx: { activity: "—", audio: "—", location: "Bureau", duration: "—", confidence: "92%" } },
  // Plus ancien
  { id: "a_009", category: "rag",          title: "Pattern détecté",     body: "Tes meilleures sessions de code arrivent entre 9 h et 11 h.", time: "18:00", day: "lundi 27 avril", read: true, actioned: false,
    ctx: { activity: "Pattern hebdomadaire", audio: "—", location: "—", duration: "—", confidence: "81%" } },
  { id: "a_010", category: "productivity", title: "Distraction Slack",   body: "12 interruptions Slack en 1 h. Mode focus ?", time: "14:48", day: "lundi 27 avril", read: true, actioned: true,
    ctx: { activity: "—", audio: "—", location: "Bureau", duration: "—", confidence: "76%" } },
];

const CAT_COLOR = { health: "#FF3B5C", productivity: "#FFB020", meeting: "#00C8E6", rag: "#9D5CFF" };
const CAT_ICON  = { health: "Droplet", productivity: "Timer",   meeting: "Users",   rag: "Sparkles" };
const CAT_LABEL = { health: "SANTÉ",   productivity: "PRODUCTIVITÉ", meeting: "RÉUNION", rag: "RAG" };
const CAT_HERO_ICON = { health: "Droplet", productivity: "TimerReset", meeting: "Users", rag: "Sparkles" };

const DAY_LABEL = { today: "Aujourd'hui", yesterday: "Hier" };
const dayLabel = (k) => DAY_LABEL[k] || k;

// ============================================================
// LIST SCREEN
// ============================================================
function CategoryChips({ active, onChange }) {
  const items = [
    { id: "all",          label: "Toutes" },
    { id: "health",       label: "Santé",        color: "#FF3B5C", textDark: false },
    { id: "productivity", label: "Productivité", color: "#FFB020", textDark: true  },
    { id: "meeting",      label: "Réunion",      color: "#00C8E6", textDark: true  },
    { id: "rag",          label: "RAG",          color: "#9D5CFF", textDark: false },
  ];
  return (
    <div className="al-chips-wrap">
      <div className="al-chips">
        {items.map(it => {
          const isActive = active === it.id;
          const cls = "chip"
            + (isActive ? " active" : "")
            + (isActive && it.textDark ? " text-dark" : "");
          return (
            <button
              key={it.id}
              className={cls}
              style={it.color ? { "--c": it.color } : null}
              onClick={() => onChange(it.id)}
              role="tab"
              aria-selected={isActive}
            >
              {it.color && <span className="dot"></span>}
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AlertSearchBar({ value, onChange, collapsed, onFocus, onBlur, focused }) {
  return (
    <div className={"al-search-wrap" + (collapsed ? " collapsed" : "")}>
      <div className={"al-search" + (focused ? " focused" : "")}>
        <span className="ic"><Icons.Search size={20} /></span>
        <input
          type="text"
          placeholder="Rechercher dans tes alertes"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {value && (
          <button className="clear" onClick={() => onChange("")} aria-label="Effacer">
            <Icons.X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function AlertRow({ a, onPress }) {
  const Ic = Icons[CAT_ICON[a.category]];
  return (
    <div className="al-row">
      <div className={"al-card" + (!a.read ? " unread" : "")} style={{ "--c": CAT_COLOR[a.category] }} onClick={() => onPress && onPress(a)}>
        <span className="ic"><Ic size={22} /></span>
        <div className="body">
          <div className="cat">{CAT_LABEL[a.category]}</div>
          <div className="ttl">{a.title}</div>
          <div className="desc">{a.body}</div>
        </div>
        <div className="right">
          <div className="ts">{a.time}</div>
          {!a.read && <div className="udot"></div>}
        </div>
      </div>
    </div>
  );
}

function AlertsListScreen({
  category: initialCategory = "all",
  initialSearch = "",
  state = "loaded",
  onOpenDetail,
}) {
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const listRef = useRef(null);

  useEffect(() => { setCategory(initialCategory); }, [initialCategory]);

  const filtered = useMemo(() => {
    if (state === "empty-all" || state === "loading") return [];
    let list = ALL_ALERTS;
    if (category !== "all") list = list.filter(a => a.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q));
    }
    return list;
  }, [category, search, state]);

  // Group by day, preserving order
  const grouped = useMemo(() => {
    const out = [];
    const seen = new Set();
    filtered.forEach(a => {
      if (!seen.has(a.day)) { seen.add(a.day); out.push({ day: a.day, items: [] }); }
      out[out.length - 1].items.push(a);
    });
    return out;
  }, [filtered]);

  const unreadCount = ALL_ALERTS.filter(a => !a.read).length;
  const collapsed = scrollTop > 80;

  const isLoading = state === "loading";
  const showEmptyAll = state === "empty-all" || (filtered.length === 0 && category === "all" && !search);
  const showEmptyFilter = filtered.length === 0 && category !== "all" && !search;
  const showEmptySearch = filtered.length === 0 && search.trim().length > 0;

  return (
    <div className="alerts-screen">
      <div className="al-header">
        <h1>Alertes</h1>
        {unreadCount > 0 && <button className="al-mark-all">Tout marquer lu</button>}
      </div>

      <AlertSearchBar
        value={search}
        onChange={setSearch}
        collapsed={collapsed}
        focused={searchFocused}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />

      <CategoryChips active={category} onChange={setCategory} />

      <div className="al-list" ref={listRef} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
        {isLoading && (
          <>
            <div className="al-day">Aujourd'hui</div>
            {[1,2,3].map(i => <div className="al-skeleton" key={i}></div>)}
            <div className="al-day">Hier</div>
            {[1,2].map(i => <div className="al-skeleton" key={"y"+i}></div>)}
          </>
        )}

        {!isLoading && showEmptyAll && (
          <div className="al-empty">
            <span className="ic"><Icons.BellOff size={48} /></span>
            <h3>Aucune alerte</h3>
            <p>On t'enverra une notif dès qu'une situation l'exige.</p>
          </div>
        )}

        {!isLoading && showEmptyFilter && (
          <div className="al-empty">
            <span className="ic"><Icons.SearchX size={48} /></span>
            <h3>Rien dans cette catégorie</h3>
            <p>Essaie un autre filtre.</p>
            <button onClick={() => { setCategory("all"); setSearch(""); }}>Réinitialiser les filtres</button>
          </div>
        )}

        {!isLoading && showEmptySearch && (
          <div className="al-empty">
            <span className="ic"><Icons.SearchX size={48} /></span>
            <h3>Aucun résultat pour « {search} »</h3>
            <p>Essaie d'autres mots-clés.</p>
          </div>
        )}

        {!isLoading && !showEmptyAll && !showEmptyFilter && !showEmptySearch && (
          <>
            {grouped.map(group => (
              <React.Fragment key={group.day}>
                <div className="al-day">{dayLabel(group.day)}</div>
                {group.items.map(a => (
                  <AlertRow key={a.id} a={a} onPress={onOpenDetail} />
                ))}
              </React.Fragment>
            ))}
            <div className="al-end">C'est tout pour le moment</div>
          </>
        )}
      </div>

      <TabBar active="alerts" unread={unreadCount} />
    </div>
  );
}

// ============================================================
// DETAIL SCREEN
// ============================================================
function AlertDetailScreen({ alertId = "a_001", state = "default", onClose }) {
  const a = ALL_ALERTS.find(x => x.id === alertId) || ALL_ALERTS[0];
  const color = CAT_COLOR[a.category];
  const HeroIc = Icons[CAT_HERO_ICON[a.category]];
  const [actioned, setActioned] = useState(state === "actioned" || a.actioned);
  const [showToast, setShowToast] = useState(false);

  const handleAction = () => {
    if (actioned) { setActioned(false); return; }
    setActioned(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  if (state === "404") {
    return (
      <div className="ad-screen">
        <div className="ad-header">
          <button className="ad-iconbtn" onClick={onClose}><Icons.X size={20} /></button>
          <div></div>
        </div>
        <div className="al-empty" style={{ flex: 1 }}>
          <span className="ic"><Icons.BellOff size={48} /></span>
          <h3>Cette alerte n'existe plus</h3>
          <p>Elle a été supprimée ou a expiré.</p>
          <button onClick={onClose}>Retour</button>
        </div>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="ad-screen">
        <div className="ad-header">
          <button className="ad-iconbtn"><Icons.X size={20} /></button>
          <button className="ad-iconbtn"><Icons.MoreVertical size={20} /></button>
        </div>
        <div className="ad-scroll" style={{ paddingTop: 76 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px", gap: 16 }}>
            <div style={{ width: 200, height: 200, borderRadius: "50%", background: "#151518" }}></div>
            <div className="sk-line" style={{ width: 240, height: 22 }}></div>
            <div className="sk-line" style={{ width: 200, height: 14 }}></div>
          </div>
          <div style={{ margin: "32px 24px 0", display: "flex", flexDirection: "column", gap: 12 }}>
            {[1,2,3,4].map(i => <div key={i} className="sk-line" style={{ height: 16 }}></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ad-screen">
      <div className="ad-header">
        <button className="ad-iconbtn" onClick={onClose} aria-label="Fermer"><Icons.X size={20} /></button>
        <button className="ad-iconbtn" aria-label="Plus"><Icons.MoreVertical size={20} /></button>
      </div>

      {actioned && (
        <div className="ad-actioned-badge">
          <Icons.Check size={12} /> Actionnée
        </div>
      )}

      <div className="ad-scroll">
        <div className="ad-hero" style={{ "--c": color }}>
          <div className="ad-hero-icon">
            <span className="ic"><HeroIc size={88} /></span>
          </div>
          <div className="ad-cat">{CAT_LABEL[a.category]}</div>
          <h1 className="ad-title">{a.title}</h1>
          <div className="ad-meta">
            <div className="ad-meta-row">
              <Icons.Clock size={14} />
              <span className="mono">{dayLabel(a.day)} · {a.time}</span>
            </div>
            {a.ctx.location && a.ctx.location !== "—" && (
              <div className="ad-meta-row">
                <Icons.MapPin size={14} />
                <span>{a.ctx.location.split(" · ")[0]}</span>
              </div>
            )}
          </div>
        </div>

        <div className="ad-body">{a.body}</div>

        <div className="ad-section">
          <div className="ad-section-h">Contexte au moment de l'alerte</div>
          <div className="ctx-card">
            <div className="ctx-row" style={{ "--c": "#4A53FF" }}>
              <span className="ic"><Icons.Eye size={16} /></span>
              <div className="col">
                <div className="lbl">Activité détectée</div>
                <div className="val">{a.ctx.activity}</div>
              </div>
            </div>
            <div className="ctx-row" style={{ "--c": "#00C8E6" }}>
              <span className="ic"><Icons.Volume2 size={16} /></span>
              <div className="col">
                <div className="lbl">Audio</div>
                <div className="val">{a.ctx.audio}</div>
              </div>
            </div>
            <div className="ctx-row" style={{ "--c": "#FFB020" }}>
              <span className="ic"><Icons.MapPin size={16} /></span>
              <div className="col">
                <div className="lbl">Lieu</div>
                <div className="val">{a.ctx.location}</div>
              </div>
            </div>
            <div className="ctx-row" style={{ "--c": "#41FF31" }}>
              <span className="ic"><Icons.Clock size={16} /></span>
              <div className="col">
                <div className="lbl">Durée</div>
                <div className="val">{a.ctx.duration}</div>
              </div>
            </div>
            <div className="ctx-row" style={{ "--c": "#9D5CFF" }}>
              <span className="ic"><Icons.Activity size={16} /></span>
              <div className="col">
                <div className="lbl">Confiance LLM</div>
                <div className="val">{a.ctx.confidence}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ad-actions">
          <button className="btn btn-primary" onClick={handleAction}>
            {actioned ? <Icons.Undo2 size={20} /> : <Icons.Check size={20} />}
            {actioned ? "Désactiver l'action" : "Marquer comme actionnée"}
          </button>
          <button className="ad-btn-secondary">
            <Icons.Sparkles size={20} />
            Demander à mon coach
          </button>
          <button className="ad-btn-destructive">
            <Icons.XCircle size={18} />
            Ignorer cette alerte
          </button>
        </div>
      </div>

      {showToast && (
        <div className="toast-success">
          <Icons.Check size={18} />
          Alerte actionnée
        </div>
      )}
    </div>
  );
}

// Reuse TabBar from dashboard.jsx
const TabBar = window.TabBar;

window.AlertsListScreen = AlertsListScreen;
window.AlertDetailScreen = AlertDetailScreen;
