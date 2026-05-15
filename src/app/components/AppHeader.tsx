import imgAvatar from "figma:asset/a93cda2f1a85bd04e48c7e5edac2b4cbb11f136a.png";

export function AppHeader() {
  return (
    <header
      className="flex items-center justify-between px-6 shrink-0"
      style={{ height: 64, background: '#FFFCFF', borderBottom: '1px solid #E7DFEE' }}
    >
      {/* Menu */}
      <button className="flex items-center gap-3 bg-transparent border-0 cursor-pointer">
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
          <path d="M1 1H21M1 9H21M1 17H21" stroke="#FF7500" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#FF7500', letterSpacing: 0.15 }}>
          Menu
        </span>
      </button>

      {/* School selector */}
      <button className="flex items-center gap-2 bg-transparent border-0 cursor-pointer">
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#787878', letterSpacing: 0.5 }}>
          Colégio iônica
        </span>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M1 1L6 6L11 1" stroke="#FF7500" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Avatar */}
      <img
        src={imgAvatar}
        alt="Avatar"
        className="rounded-full object-cover shrink-0"
        style={{ width: 44, height: 44 }}
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.style.display = 'none';
          const next = t.nextElementSibling as HTMLElement;
          if (next) next.style.display = 'flex';
        }}
      />
      <span
        className="rounded-full items-center justify-center shrink-0"
        style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#ab4ef7,#ff0098)', display: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, color: '#fff', fontWeight: 600 }}
      >
        P
      </span>
    </header>
  );
}
