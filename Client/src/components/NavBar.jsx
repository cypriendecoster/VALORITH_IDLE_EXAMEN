import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-black/35 backdrop-blur border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/LOGO/Logo_gauche.png" alt="Valorith" className="h-10" />
        </Link>

        <div className="flex items-center gap-4">
          <Link className="text-[var(--color-muted)] hover:text-[var(--color-text)]" to="/login">
            Jouer
          </Link>
          <Link className="text-[var(--color-muted)] hover:text-[var(--color-text)]" to="/register">
            S'inscrire
          </Link>
          <Link className="text-[var(--color-muted)] hover:text-[var(--color-text)]" to="/lore">
            À propos / Lore
          </Link>
          <Link className="text-[var(--color-muted)] hover:text-[var(--color-text)]" to="/patchnotes">
            PatchNotes
          </Link>
          <Link className="text-[var(--color-muted)] hover:text-[var(--color-text)]" to="/faq">
            FAQ/Aide
          </Link>
        </div>
      </div>
    </nav>
  );
}
