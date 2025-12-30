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
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3">
          <img src="/LOGO/Logo_gauche.png" alt="Valorith" className="h-10" />
          <span className="rounded-[var(--radius-md)] border border-red-500/60 bg-red-600/30 px-2 py-1 text-xs font-semibold text-red-100">
            ⚠ ADMIN MODE
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <NavLink className={() => linkClass(location.pathname === '/admin' && !activeTable)} to="/admin">
            Dashboard
          </NavLink>
          <span className="hidden text-[var(--color-border)] md:inline" aria-hidden="true">
            |
          </span>
          <div className="hidden items-center gap-4 md:flex">
            <NavLink className={() => linkClass(isTableActive('users'))} to="/admin?table=users">
              Users
            </NavLink>
            <NavLink className={() => linkClass(isTableActive('skills'))} to="/admin?table=skills">
              Tables/CRUD
            </NavLink>
            <NavLink
              className={() => linkClass(isTableActive('support_tickets'))}
              to="/admin?table=support_tickets"
            >
              Support Tickets
            </NavLink>
            <NavLink
              className={() => linkClass(isTableActive('system_settings'))}
              to="/admin?table=system_settings"
            >
              System Settings
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
          <Link
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
            to="/game"
          >
            Retour jeu
          </Link>
          <button
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="admin-menu"
          >
            Menu
          </button>
          <button
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
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
          className="mt-4 grid gap-3 rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-black/80 px-4 py-4 text-sm text-[var(--color-muted)] md:hidden"
        >
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={() => linkClass(isTableActive('users'))}
            to="/admin?table=users"
          >
            Users
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
            Support Tickets
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={() => linkClass(isTableActive('system_settings'))}
            to="/admin?table=system_settings"
          >
            System Settings
          </NavLink>
        </div>
      )}
    </nav>
  );
}
