/* global React */
function IOSFrame({ children, scale = 1 }) {
  return (
    <div className="frame-wrap" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
      <div className="ios-bezel">
        <div className="ios-screen">
          <div className="dyn-island"></div>
          <div className="status-bar">
            <span>9:41</span>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <svg width="18" height="11" viewBox="0 0 18 11" fill="#fff">
                <rect x="0" y="6.5" width="3" height="4.5" rx="0.6"/>
                <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.6"/>
                <rect x="9" y="2.5" width="3" height="8.5" rx="0.6"/>
                <rect x="13.5" y="0" width="3" height="11" rx="0.6"/>
              </svg>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="#fff" strokeWidth="1.2">
                <path d="M2 6 a 6 6 0 0 1 12 0" fill="none"/>
                <path d="M4.5 7.5 a 3.5 3.5 0 0 1 7 0" fill="none"/>
                <circle cx="8" cy="9" r="1" fill="#fff" stroke="none"/>
              </svg>
              <svg width="26" height="12" viewBox="0 0 26 12">
                <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#fff" fill="none" opacity="0.5"/>
                <rect x="2" y="2" width="19" height="8" rx="1.5" fill="#fff"/>
                <path d="M24 4v4c0.6-0.3 1-1 1-2s-0.4-1.7-1-2z" fill="#fff" opacity="0.5"/>
              </svg>
            </span>
          </div>
          <div className="screen-content">
            {children}
          </div>
          <div className="home-ind"></div>
        </div>
      </div>
    </div>
  );
}
window.IOSFrame = IOSFrame;
