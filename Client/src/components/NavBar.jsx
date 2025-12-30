import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const baseLinkClass =
  'text-[var(--color-muted)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60';
const activeLinkClass =
  'text-[var(--color-text)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-4';

function linkClass(isActive) {
  return `${baseLinkClass} ${isActive ? activeLinkClass : ''}`.trim();
}

export default function Navbar() {
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
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img src="/LOGO/Logo_gauche.png" alt="Valorith" className="h-10" />
          <span className="hidden text-[10px] font-semibold tracking-[0.3em] text-[var(--color-muted)] sm:inline md:text-xs">
            VALORITH
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/lore" className={({ isActive }) => linkClass(isActive)}>
            Lore
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => linkClass(isActive)}>
            FAQ
          </NavLink>
          <span className="text-[var(--color-border)]" aria-hidden="true">
            |
          </span>
          <NavLink
            to="/patchnotes"
            className={({ isActive }) => `hidden lg:inline-flex ${linkClass(isActive)}`.trim()}
          >
            PatchNotes
          </NavLink>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden items-center gap-4 md:flex">
            <NavLink to="/login" className={({ isActive }) => linkClass(isActive)}>
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => `hidden lg:inline-flex ${linkClass(isActive)}`.trim()}
            >
              Register
            </NavLink>
          </div>
          <Link
            className="inline-flex h-9 min-w-[72px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-gold)] bg-[var(--color-gold)] px-3 py-1 text-xs font-semibold text-black shadow-[0_0_18px_rgba(214,159,59,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(214,159,59,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
            to="/game"
          >
            Jouer
          </Link>
          <button
            className="inline-flex h-9 min-w-[72px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="visitor-menu"
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="visitor-menu"
          role="menu"
          aria-label="Navigation"
          className="mt-4 grid gap-4 rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-black/80 px-4 py-4 text-sm text-[var(--color-muted)] lg:hidden"
        >
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            to="/"
            end
            className={({ isActive }) => linkClass(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            to="/lore"
            className={({ isActive }) => linkClass(isActive)}
          >
            Lore
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            to="/patchnotes"
            className={({ isActive }) => linkClass(isActive)}
          >
            PatchNotes
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            to="/faq"
            className={({ isActive }) => linkClass(isActive)}
          >
            FAQ
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            to="/login"
            className={({ isActive }) => linkClass(isActive)}
          >
            Login
          </NavLink>
          <NavLink
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            to="/register"
            className={({ isActive }) => linkClass(isActive)}
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
}
