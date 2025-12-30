import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const baseLinkClass =
  'text-[var(--color-muted)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60';
const activeLinkClass =
  'text-[var(--color-text)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-4';

function linkClass(isActive) {
  return `${baseLinkClass} ${isActive ? activeLinkClass : ''}`.trim();
}

export default function AdminNavbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activeTable = new URLSearchParams(location.search).get('table');

  function isTableActive(tableName) {
    return location.pathname === '/admin' && activeTable === tableName;
  }

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
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
        <Link to="/admin" className="flex items-center gap-2 md:gap-3">
          <img src="/LOGO/Logo_gauche.png" alt="Valorith" className="h-10" />
          <span className="rounded-[var(--radius-md)] border border-red-500/60 bg-red-600/30 px-1.5 py-0.5 text-[10px] font-semibold text-red-100 md:px-2 md:py-1 md:text-xs">
            ⚠ MODE ADMIN
          </span>
        </Link>

        <div className="flex min-w-0 items-center gap-4">
          <NavLink
            className={() =>
              `hidden md:inline-flex ${linkClass(location.pathname === '/admin' && !activeTable)}`.trim()
            }
            to="/admin"
          >
            Tableau de bord
          </NavLink>
          <span className="hidden text-[var(--color-border)] md:inline" aria-hidden="true">
            |
          </span>
          <div className="hidden items-center gap-4 md:flex">
            <NavLink className={() => linkClass(isTableActive('Utilisateurs'))} to="/admin?table=Utilisateurs">
              Utilisateurs
            </NavLink>
            <NavLink className={() => linkClass(isTableActive('skills'))} to="/admin?table=skills">
              Tables/CRUD
            </NavLink>
            <NavLink
              className={() => linkClass(isTableActive('support_tickets'))}
              to="/admin?table=support_tickets"
            >
              Tickets support
            </NavLink>
            <NavLink
              className={() => linkClass(isTableActive('system_settings'))}
              to="/admin?table=system_settings"
            >
              Paramètres système
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link
            className="inline-flex h-9 min-w-[72px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
            to="/game"
          >
            <span className="md:hidden">Retour</span>
            <span className="hidden md:inline">Retour au jeu</span>
          </Link>
          <button
            className="inline-flex h-9 min-w-[72px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="admin-menu"
          >
            Menu
          </button>
          <button
            className="hidden h-9 items-center justify-center rounded-[var(--radius-md)] border border-red-500/40 bg-red-600/10 px-3 py-1 text-xs text-red-100 hover:bg-red-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 md:inline-flex"
            onClick={onLogout}
          >
            Quitter
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="admin-menu"
          role="menu"
          aria-label="Navigation"
          className="mt-4 grid gap-4 rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-black/80 px-4 py-4 text-sm text-[var(--color-muted)] md:hidden"
        >
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={() => linkClass(location.pathname === '/admin' && !activeTable)}
            to="/admin"
          >
            Tableau de bord
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={() => linkClass(isTableActive('Utilisateurs'))}
            to="/admin?table=Utilisateurs"
          >
            Utilisateurs
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={() => linkClass(isTableActive('skills'))}
            to="/admin?table=skills"
          >
            Tables/CRUD
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={() => linkClass(isTableActive('support_tickets'))}
            to="/admin?table=support_tickets"
          >
            Tickets support
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={() => linkClass(isTableActive('system_settings'))}
            to="/admin?table=system_settings"
          >
            Paramètres système
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
        </div>
      )}
    </nav>
  );
}


