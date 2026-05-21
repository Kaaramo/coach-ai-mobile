/* global React, Icons, CoachLogo, GoogleG */
const { useState, useEffect, useRef } = React;

// ============================================================
// SCREEN 1 — SPLASH
// ============================================================
function SplashScreen({ onNext }) {
  useEffect(() => {
    if (!onNext) return;
    const t = setTimeout(() => onNext(), 1800);
    return () => clearTimeout(t);
  }, [onNext]);
  return (
    <div className="screen splash" onClick={onNext}>
      <CoachLogo size={96} />
      <div className="splash-title">Coach AI</div>
      <div className="splash-loader">
        <div className="d"></div>
        <div className="d"></div>
        <div className="d"></div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 2 — WELCOME
// ============================================================
const FEATURES = [
  { ic: "Eye",      color: "#4A53FF", t: "Il observe", b: "Le boîtier capte vision, audio et localisation en continu." },
  { ic: "BellRing", color: "#FF3B5C", t: "Il alerte",  b: "Tu reçois une notification dès qu'une situation l'exige." },
  { ic: "Sparkles", color: "#9D5CFF", t: "Il répond",  b: "Pose-lui n'importe quelle question sur ta journée." },
];

function WelcomeScreen({ onNext }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / 252); // 240 + 12 gap
      setActive(Math.min(2, Math.max(0, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="screen">
      <div style={{ height: 48 }}></div>
      <CoachLogo size={56} />
      <div style={{ height: 40 }}></div>
      <h1 className="hero-title">
        Ton coach personnel,<br />
        <span className="accent">qui te voit vraiment.</span>
      </h1>
      <div style={{ height: 16 }}></div>
      <p className="subtitle">
        L'assistant qui observe ton environnement, détecte les bons moments d'agir,
        et répond à tes questions sur ta journée.
      </p>
      <div className="flex-spacer"></div>
      <div className="carousel">
        <div className="carousel-track" ref={trackRef}>
          {FEATURES.map((f, i) => {
            const Ic = Icons[f.ic];
            return (
              <div className="feat-card" key={i}>
                <div className="ic" style={{ color: f.color }}><Ic size={28} /></div>
                <div className="ttl">{f.t}</div>
                <div className="body">{f.b}</div>
              </div>
            );
          })}
        </div>
        <div className="dots">
          {FEATURES.map((_, i) => (
            <div key={i} className={"d" + (i === active ? " active" : "")} />
          ))}
        </div>
      </div>
      <div style={{ height: 24 }}></div>
      <button className="btn btn-primary" onClick={onNext}>Commencer</button>
      <button className="link" style={{ marginTop: 8 }} onClick={onNext}>J'ai déjà un compte</button>
      <div className="safe-bot"></div>
    </div>
  );
}

// ============================================================
// SCREEN 3 — LOGIN
// ============================================================
function LoginScreen({ state = "default", onNext, onBack }) {
  const [localState, setLocalState] = useState(state);
  useEffect(() => { setLocalState(state); }, [state]);
  const isLoading = localState === "loading";
  const showError = localState === "error";
  const handleGoogle = () => {
    if (!onNext) return;
    setLocalState("loading");
    setTimeout(() => onNext(), 1400);
  };
  return (
    <div className="screen">
      {showError && (
        <div className="toast">
          <Icons.AlertTriangle size={18} />
          Connexion impossible. Réessaie.
        </div>
      )}
      <div style={{ height: 8 }}></div>
      <button className="back-btn" onClick={onBack}><Icons.ChevronLeft size={22} /></button>
      <div style={{ height: 40 }}></div>
      <CoachLogo size={56} />
      <div style={{ height: 40 }}></div>
      <h1 className="hero-title" style={{ fontSize: 28 }}>Connecte-toi</h1>
      <div style={{ height: 12 }}></div>
      <p className="subtitle">
        Un seul compte Google suffit. Tes données restent privées et chiffrées.
      </p>
      <div style={{ height: 40 }}></div>
      <button className="btn btn-google" disabled={isLoading} onClick={handleGoogle}>
        {isLoading ? (
          <>
            <Spinner color="#0A0A0F" />
            <span>Connexion…</span>
          </>
        ) : (
          <>
            <GoogleG size={22} />
            <span>Continuer avec Google</span>
          </>
        )}
      </button>
      <div className="flex-spacer"></div>
      <div className="legal">
        En continuant, tu acceptes nos <a href="#">Conditions d'utilisation</a><br />
        et notre <a href="#">Politique de confidentialité</a>.
      </div>
      <div className="safe-bot"></div>
    </div>
  );
}

function Spinner({ color = "#fff", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "spin 0.9s linear infinite" }}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeOpacity="0.2" strokeWidth="2.5" fill="none"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// ============================================================
// SCREEN 4 — PERMISSIONS
// ============================================================
function PermissionsScreen({ refused: refusedProp = false, onNext }) {
  const [refused, setRefused] = useState(refusedProp);
  useEffect(() => { setRefused(refusedProp); }, [refusedProp]);
  return (
    <div className="screen">
      {refused && (
        <div className="toast warn">
          <Icons.AlertTriangle size={18} />
          Sans notifications, tu rateras les alertes en arrière-plan.
        </div>
      )}
      <div className="safe-top"></div>
      <Stepper step={1} total={3} />
      <div style={{ height: 32 }}></div>
      <div className="hero-icon" style={{ "--halo": "#4A53FF" }}>
        <span className="ic hero-bell"><Icons.BellRing size={88} /></span>
      </div>
      <div style={{ height: 24 }}></div>
      <h1 className="hero-title" style={{ fontSize: 28, textAlign: "center" }}>
        Active les notifications
      </h1>
      <div style={{ height: 12 }}></div>
      <p className="subtitle" style={{ textAlign: "center" }}>
        On a besoin de pouvoir te prévenir en temps réel quand quelque chose mérite ton attention.
      </p>
      <div style={{ height: 32 }}></div>
      <div className="card">
        <div className="card-list">
          <div className="card-list-row">
            <span className="ic"><Icons.Droplet size={18} /></span>
            <span>Rappel d'hydratation</span>
          </div>
          <div className="card-list-row">
            <span className="ic" style={{ color: "#FFB020" }}><Icons.Timer size={18} /></span>
            <span>Dépassement de tâche</span>
          </div>
          <div className="card-list-row">
            <span className="ic" style={{ color: "#00C8E6" }}><Icons.Users size={18} /></span>
            <span>Synthèse de réunion</span>
          </div>
        </div>
      </div>
      <div className="flex-spacer"></div>
      <button className="btn btn-primary" onClick={onNext}>
        <Icons.BellRing size={20} />
        Activer les notifications
      </button>
      <button
        className="btn btn-ghost"
        style={{ marginTop: 4 }}
        onClick={() => {
          if (!refused && !refusedProp) { setRefused(true); return; }
          onNext && onNext();
        }}
      >
        {refused ? "Continuer quand même" : "Plus tard"}
      </button>
      <div className="safe-bot"></div>
    </div>
  );
}

// ============================================================
// SCREEN 5 — PREFERENCES
// ============================================================
function PreferencesScreen({ initial = { health: true, productivity: true, meetings: true }, onNext }) {
  const [v, setV] = useState(initial);
  const t = (k) => setV(s => ({ ...s, [k]: !s[k] }));
  const anyOn = v.health || v.productivity || v.meetings;
  return (
    <div className="screen">
      <div className="safe-top"></div>
      <Stepper step={2} total={3} />
      <div style={{ height: 36 }}></div>
      <h1 className="hero-title" style={{ fontSize: 28 }}>
        Quelles alertes<br />tu veux ?
      </h1>
      <div style={{ height: 12 }}></div>
      <p className="subtitle">
        Active les catégories qui t'intéressent. Tu pourras tout changer plus tard.
      </p>
      <div style={{ height: 28 }}></div>
      <div>
        <ToggleCard
          c="#FF3B5C" icon="HeartPulse"
          title="Santé"
          desc="Hydratation, posture, sédentarité"
          on={v.health} onToggle={() => t("health")}
        />
        <ToggleCard
          c="#FFB020" icon="Timer"
          title="Productivité"
          desc="Dépassement de tâche, distractions"
          on={v.productivity} onToggle={() => t("productivity")}
        />
        <ToggleCard
          c="#00C8E6" icon="Users"
          title="Réunion"
          desc="Synthèses automatiques, décisions clés"
          on={v.meetings} onToggle={() => t("meetings")}
        />
      </div>
      <div className="flex-spacer"></div>
      <button className="btn btn-primary" disabled={!anyOn} onClick={onNext}>Continuer</button>
      <div className="safe-bot"></div>
    </div>
  );
}

function ToggleCard({ c, icon, title, desc, on, onToggle }) {
  const Ic = Icons[icon];
  return (
    <div className={"tog-card" + (on ? " on" : "")}
         style={{ "--c": c }}
         onClick={onToggle}
         role="switch"
         aria-checked={on}>
      <div className="ico"><Ic size={22} /></div>
      <div className="body">
        <div className="ttl">{title}</div>
        <div className="desc">{desc}</div>
      </div>
      <div className="switch"></div>
    </div>
  );
}

// ============================================================
// SCREEN 6 — DEVICE
// ============================================================
function DeviceScreen({ error = false, onNext }) {
  if (error) {
    return (
      <div className="screen">
        <div className="safe-top"></div>
        <Stepper step={3} total={3} />
        <div style={{ height: 32 }}></div>
        <div className="hero-icon" style={{ "--halo": "#FF3B5C" }}>
          <span className="ic"><Icons.AlertTriangle size={84} /></span>
        </div>
        <div style={{ height: 24 }}></div>
        <h1 className="hero-title" style={{ fontSize: 28, textAlign: "center" }}>
          Aucun boîtier associé
        </h1>
        <div style={{ height: 12 }}></div>
        <p className="subtitle" style={{ textAlign: "center" }}>
          Contacte ton équipe IoT pour qu'ils lient ton appareil.
        </p>
        <div className="flex-spacer"></div>
        <button className="btn btn-secondary" onClick={onNext}>Continuer sans boîtier</button>
        <div className="safe-bot"></div>
      </div>
    );
  }
  return (
    <div className="screen">
      <div className="safe-top"></div>
      <Stepper step={3} total={3} />
      <div style={{ height: 32 }}></div>
      <div className="hero-icon" style={{ "--halo": "#41FF31" }}>
        <span className="ic hero-cpu"><Icons.Cpu size={88} /></span>
      </div>
      <div style={{ height: 24 }}></div>
      <h1 className="hero-title" style={{ fontSize: 28, textAlign: "center" }}>
        Ton boîtier est lié
      </h1>
      <div style={{ height: 12 }}></div>
      <p className="subtitle" style={{ textAlign: "center" }}>
        L'appareil IoT associé à ton compte est prêt à observer.
      </p>
      <div style={{ height: 32 }}></div>
      <div className="card">
        <div className="dev-card-hd">Boîtier associé</div>
        <div className="dev-row">
          <span className="ic"><Icons.Cpu size={18} /></span>
          <span>Raspberry Pi 5 — Edge AI</span>
        </div>
        <div className="dev-mono">device_id: rpi5-aghzout-001</div>
        <div className="dev-pill">
          <span className="dot"></span>
          EN LIGNE
        </div>
      </div>
      <div className="flex-spacer"></div>
      <button className="btn btn-vital" onClick={onNext}>Tout est prêt</button>
      <div className="safe-bot"></div>
    </div>
  );
}

// ============================================================
// Stepper
// ============================================================
function Stepper({ step, total }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW((step / total) * 100), 60);
    return () => clearTimeout(t);
  }, [step, total]);
  return (
    <div className="stepper">
      <div className="stepper-fill" style={{ width: `${w}%` }}></div>
    </div>
  );
}

window.SplashScreen = SplashScreen;
window.WelcomeScreen = WelcomeScreen;
window.LoginScreen = LoginScreen;
window.PermissionsScreen = PermissionsScreen;
window.PreferencesScreen = PreferencesScreen;
window.DeviceScreen = DeviceScreen;
