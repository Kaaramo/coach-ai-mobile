/* global React, Icons */
const { useState, useEffect, useMemo, useRef } = React;

// ============================================================
// MOCK DATA
// ============================================================
const CONVERSATIONS = [
  // Today
  { id: "c_001", title: "Résumé de ma journée",        preview: "Hier (lundi 28), tu as eu une journée plus dense…", time: "15:00", group: "today",     count: 6 },
  { id: "c_002", title: "Mes habitudes de la semaine", preview: "Tu as réduit ton temps de réunion de 18 % cette…", time: "11:20", group: "today",     count: 12 },
  // This week
  { id: "c_003", title: "Réunion de lundi",            preview: "3 décisions extraites : (1) avancer la roadmap…",  time: "lun.",  group: "week",      count: 4 },
  { id: "c_004", title: "Combien de temps de code ?",  preview: "Sur les 7 derniers jours, 18h42 en code dont 62 %…", time: "dim.",  group: "week",      count: 8 },
  // Older
  { id: "c_005", title: "Comparer avec mars",          preview: "En mars tu codais 22 h/semaine en moyenne…",         time: "23 avr.", group: "older",   count: 5 },
];

const MESSAGES_BY_CONV = {
  c_001: [
    { id: "m1", role: "user",      text: "Sur quoi j'ai passé le plus de temps mardi ?", time: "14:35" },
    { id: "m2", role: "assistant", text: "Mardi, tu as passé 3h45 en code (matin) et 1h en réunion (après-midi). Le reste s'est réparti entre 50 minutes de pause repas et 35 minutes en transit. Pic de concentration entre 9h et 11h.", time: "14:35", sources: 3 },
    { id: "m3", role: "user",      text: "Et hier ?", time: "14:36" },
    { id: "m4", role: "assistant", text: "Hier (lundi 28), tu as eu une journée plus dense : 5h10 de code (réparties matin + soir), 1h30 en réunion, 30 min de pause. Tu n'as pas pris de marche, alors que tu en fais en moyenne 25 min.", time: "14:37", sources: 2 },
  ],
  c_002: [
    { id: "m1", role: "user",      text: "Quelles habitudes je dois améliorer ?", time: "11:18" },
    { id: "m2", role: "assistant", text: "Trois points ressortent cette semaine : (1) ton hydratation est en baisse — 4 verres/jour en moyenne contre 6 la semaine d'avant ; (2) tu enchaînes plus de 90 min sans pause sur 60 % de tes blocs de code ; (3) tu te couches 45 min plus tard que ta moyenne du mois.", time: "11:19", sources: 4 },
  ],
};

const SUGGESTIONS = [
  "Résume-moi ma journée d'hier",
  "Combien de temps en réunion cette semaine ?",
  "Quelles habitudes je dois améliorer ?",
  "Sur quoi j'ai passé le plus de temps lundi ?",
];

// ============================================================
// CHAT SCREEN
// ============================================================
function UserBubble({ text, time }) {
  return (
    <div className="ch-bubble-row user">
      <div className="ch-bubble user">{text}</div>
      {time && <div className="ch-ts">{time}</div>}
    </div>
  );
}

function AssistantBubble({ text, time, streaming, showLabel, sources }) {
  return (
    <div className="ch-bubble-row assistant">
      {showLabel && (
        <div className="ch-bot-label">
          <Icons.Sparkles size={14} /> Coach
        </div>
      )}
      <div className="ch-bubble assistant">
        {text}
        {streaming && <span className="ch-cursor"></span>}
      </div>
      {sources && !streaming && (
        <button className="ch-sources">
          <span className="ic-lead"><Icons.Database size={16} /></span>
          {sources} sources utilisées
          <span className="ic-trail"><Icons.ChevronRight size={16} /></span>
        </button>
      )}
      {time && !streaming && <div className="ch-ts">{time}</div>}
    </div>
  );
}

function SuggestionsList({ onPick }) {
  return (
    <div className="ch-suggestions">
      {SUGGESTIONS.map((s, i) => (
        <button
          key={i}
          className="ch-sugg"
          style={{ "--d": (i * 80) + "ms" }}
          onClick={() => onPick && onPick(s)}
        >
          <span className="lead"><Icons.Sparkles size={20} /></span>
          <span className="text">{s}</span>
          <span className="trail"><Icons.ArrowUpRight size={16} /></span>
        </button>
      ))}
    </div>
  );
}

function ChatComposer({ disabled, streaming, onSend }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const taRef = useRef(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 96) + "px";
  }, [value]);

  const submit = () => {
    if (!value.trim() || streaming) return;
    onSend && onSend(value.trim());
    setValue("");
  };
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const isEmpty = !value.trim();
  const showCounter = value.length > 1800;

  return (
    <div className={"ch-composer" + (disabled ? " disabled" : "")} style={{ position: "relative" }}>
      <button className="ch-attach" disabled aria-label="Pièce jointe">
        <Icons.Plus size={20} />
      </button>
      <div className={"ch-input-wrap" + (focused ? " focused" : "")}>
        <textarea
          ref={taRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 2000))}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Pose ta question"
        />
      </div>
      <button
        className={"ch-send" + (isEmpty && !streaming ? " disabled" : "")}
        onClick={streaming ? () => onSend && onSend("__stop__") : submit}
        disabled={isEmpty && !streaming}
        aria-label={streaming ? "Stop" : "Envoyer"}
      >
        {streaming ? <Icons.Square size={16} /> : <Icons.ArrowUp size={20} />}
      </button>
      {showCounter && (
        <div className="ch-counter">{value.length} / 2000</div>
      )}
    </div>
  );
}

function ChatScreen({
  conversationId = "c_001",
  state = "default",      // default | new | loading | rag-error | offline | rate-limit
  streaming = false,
  onOpenDrawer,
  onNewConversation,
}) {
  const conv = CONVERSATIONS.find(c => c.id === conversationId) || CONVERSATIONS[0];
  const isNew = state === "new";
  const isLoading = state === "loading";
  const messages = isNew || isLoading ? [] : (MESSAGES_BY_CONV[conversationId] || []);

  const showRagError = state === "rag-error";
  const showOffline = state === "offline";
  const showRateLimit = state === "rate-limit";
  const composerDisabled = showRagError || showOffline || showRateLimit;

  const messagesRef = useRef(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [conversationId, state, streaming]);

  // Streaming demo: append a partial last bubble
  const liveMessages = useMemo(() => {
    if (!streaming) return messages;
    return [
      ...messages,
      { id: "user-pending", role: "user", text: "Et qu'est-ce que je peux améliorer demain ?", time: "" },
      { id: "stream", role: "assistant", text: "D'après ton historique, deux ajustements simples auraient le plus d'impact : commencer par 30 min de code avant ta première", time: "", streaming: true },
    ];
  }, [messages, streaming]);

  return (
    <div className="chat-screen">
      <div className="ch-header">
        <button className="ch-iconbtn" onClick={onOpenDrawer} aria-label="Conversations">
          <Icons.Menu size={22} />
        </button>
        <h1 className="ch-title">{isNew ? "Nouvelle conversation" : conv.title}</h1>
        <button className="ch-iconbtn accent" onClick={onNewConversation} aria-label="Nouvelle conversation">
          <Icons.Plus size={22} />
        </button>
      </div>

      {showRagError && (
        <div className="ch-banner" style={{ "--c": "#FF3B5C" }}>
          <span className="ic"><Icons.AlertTriangle size={18} /></span>
          Le coach est temporairement indisponible
        </div>
      )}
      {showOffline && (
        <div className="ch-banner" style={{ "--c": "#FFB020" }}>
          <span className="ic"><Icons.WifiOff size={18} /></span>
          Mode hors ligne — tu peux relire tes conversations
        </div>
      )}
      {showRateLimit && (
        <div className="ch-toast">
          <Icons.AlertTriangle size={18} />
          Tu as atteint la limite de questions. Réessaie dans 5 minutes.
        </div>
      )}

      <div className="ch-messages" ref={messagesRef}>
        {isLoading && (
          <>
            <div className="ch-sk-bubble assistant" style={{ width: "70%", height: 64 }}></div>
            <div className="ch-sk-bubble user"      style={{ width: "55%", height: 44, marginTop: 8 }}></div>
            <div className="ch-sk-bubble assistant" style={{ width: "82%", height: 96, marginTop: 8 }}></div>
            <div className="ch-sk-bubble user"      style={{ width: "40%", height: 40, marginTop: 8 }}></div>
          </>
        )}

        {isNew && !isLoading && (
          <>
            <div className="ch-welcome">
              <h2>Pose-moi une question</h2>
              <p>Je connais ta semaine, demande-moi ce que tu veux.</p>
            </div>
            <SuggestionsList onPick={() => {}} />
          </>
        )}

        {!isLoading && !isNew && liveMessages.map((m, i) => {
          if (m.role === "user") return <UserBubble key={m.id} text={m.text} time={m.time} />;
          const prev = liveMessages[i - 1];
          const showLabel = !prev || prev.role !== "assistant";
          return (
            <AssistantBubble
              key={m.id}
              text={m.text}
              time={m.time}
              streaming={m.streaming}
              showLabel={showLabel}
              sources={m.sources}
            />
          );
        })}
      </div>

      <ChatComposer disabled={composerDisabled} streaming={streaming} onSend={() => {}} />
    </div>
  );
}

// ============================================================
// CONVERSATION DRAWER
// ============================================================
function ConversationDrawer({ activeId, onClose, onSelect, onNew, empty }) {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const groups = useMemo(() => {
    const list = empty ? [] : CONVERSATIONS.filter(c =>
      !search.trim() || c.title.toLowerCase().includes(search.toLowerCase())
    );
    const out = { today: [], week: [], older: [] };
    list.forEach(c => out[c.group].push(c));
    return out;
  }, [search, empty]);

  const sectionLabels = { today: "Aujourd'hui", week: "Cette semaine", older: "Plus ancien" };
  const isEmpty = empty || (groups.today.length + groups.week.length + groups.older.length === 0);

  return (
    <>
      <div className="dr-overlay" onClick={onClose}></div>
      <div className="dr-panel">
        <div className="dr-header">
          <div className="dr-logo"><Icons.Sparkles size={18} /></div>
          <h2 className="dr-title">Mes conversations</h2>
          <button className="dr-close" onClick={onClose} aria-label="Fermer">
            <Icons.X size={20} />
          </button>
        </div>

        <button className="dr-cta" onClick={onNew}>
          <Icons.Plus size={18} />
          Nouvelle conversation
        </button>

        <div className="dr-search-wrap">
          <div className={"al-search" + (searchFocused ? " focused" : "")}>
            <span className="ic"><Icons.Search size={20} /></span>
            <input
              type="text"
              placeholder="Rechercher une conversation"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {search && (
              <button className="clear" onClick={() => setSearch("")} aria-label="Effacer">
                <Icons.X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="dr-list">
          {isEmpty && !search && (
            <div className="dr-empty">
              <span className="ic"><Icons.MessageCircleDashed size={48} /></span>
              <h3>Tu n'as pas encore de conversation</h3>
              <p>Pose ta première question à ton coach.</p>
            </div>
          )}
          {!isEmpty && Object.keys(groups).map(key => groups[key].length > 0 && (
            <React.Fragment key={key}>
              <div className="dr-section-h">{sectionLabels[key]}</div>
              {groups[key].map(c => (
                <div
                  key={c.id}
                  className={"dr-item" + (c.id === activeId ? " active" : "")}
                  onClick={() => onSelect && onSelect(c.id)}
                >
                  <div className="col">
                    <div className="ttl">{c.title}</div>
                    <div className="preview">{c.preview}</div>
                  </div>
                  <div className="ts">{c.time}</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

window.ChatScreen = ChatScreen;
window.ConversationDrawer = ConversationDrawer;
