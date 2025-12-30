import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const baseLinkClass =
  'text-[var(--color-muted)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60';
const activeLinkClass =
  'text-[var(--color-text)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-4';

function linkClass(isActive) {
  return `${baseLinkClass} ${isActive ? activeLinkClass : ''}`.trim();
}

export default function PlayerNavbar({ activeRealmName, totalResources, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
    return undefined;
  }, [menuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-black/35 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <NavLink to="/game" className="flex items-center gap-2 md:gap-3">
          <img src="/LOGO/Logo_gauche.png" alt="Valorith" className="h-10" />
        </NavLink>

        <div className="flex items-center gap-4">
          <NavLink className={({ isActive }) => linkClass(isActive)} to="/game">
            {({ isActive }) => (
              <span className="relative inline-flex flex-col items-center">
                <span>Game</span>
                {isActive && <span className="sr-only">Page active</span>}
                <span
                  className={
                    isActive
                      ? 'mt-1 h-1 w-1 rounded-full bg-[var(--color-gold)] md:hidden'
                      : 'hidden'
                  }
                  aria-hidden="true"
                />
              </span>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hidden md:inline-flex ${linkClass(isActive)}`.trim()
            }
            to="/profile"
          >
            Profil
          </NavLink>
          <span className="hidden text-[var(--color-border)] md:inline" aria-hidden="true">
            |
          </span>
          <div className="hidden items-center gap-4 md:flex">
            <NavLink className={({ isActive }) => linkClass(isActive)} to="/badges">
              Badges
            </NavLink>
            <NavLink className={({ isActive }) => linkClass(isActive)} to="/rankings">
              Classement
            </NavLink>
            <NavLink className={({ isActive }) => linkClass(isActive)} to="/settings">
              Parametres
            </NavLink>
            <NavLink className={({ isActive }) => linkClass(isActive)} to="/account">
              Compte
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
          <button
            className="inline-flex h-9 min-w-[72px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="player-menu"
          >
            Menu
          </button>
          <button
            className="hidden h-9 min-w-[72px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 md:inline-flex"
            onClick={onLogout}
          >
            Quitter
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="player-menu"
          role="menu"
          aria-label="Navigation"
          className="mt-4 grid gap-4 rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-black/80 px-4 py-4 text-sm text-[var(--color-muted)] md:hidden"
        >
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
            to="/profile"
          >
            Profil
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
            to="/badges"
          >
            Badges
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
            to="/rankings"
          >
            Classement
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
            to="/settings"
          >
            Parametres
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
            to="/account"
          >
            Compte
          </NavLink>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onLogout();
            }}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius-md)] border border-red-500/40 bg-red-600/10 px-3 py-1 text-xs text-red-100 hover:bg-red-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
          >
            Quitter
          </button>
          {activeRealmName && (
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-[var(--color-text)]">
              Royaume: {activeRealmName}
            </span>
          )}
          {typeof totalResources === 'number' && (
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-[var(--color-text)]">
              Total: {Math.floor(totalResources)}
            </span>
          )}
        </div>
      )}
    </nav>
  );
}
