import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-black/40 text-[var(--color-text)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div aria-labelledby="footer-brand">
          <h2 id="footer-brand" className="sr-only">
            Marque
          </h2>
          <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">VALORITH</p>
          <p className="mt-2 font-heading text-lg">Forge Idle</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Idle fantasy sur 12 royaumes. Progresse a ton rythme, meme hors ligne.
          </p>
        </div>

        <div aria-labelledby="footer-explorer">
          <h2 id="footer-explorer" className="sr-only">
            Explorer
          </h2>
          <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">EXPLORER</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link to="/" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/lore" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Univers
              </Link>
            </li>
            <li>
              <Link to="/tutorial" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Tutoriel
              </Link>
            </li>
            <li>
              <Link to="/patchnotes" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Notes de patch
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div aria-labelledby="footer-community">
          <h2 id="footer-community" className="sr-only">
            Communaute
          </h2>
          <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">COMMUNAUTE</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link to="/rankings" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Classements
              </Link>
            </li>
            <li>
              <Link to="/badges" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Badges
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Support
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Compte
              </Link>
            </li>
          </ul>
        </div>

        <div aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="sr-only">
            Legal
          </h2>
          <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">LEGAL</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link to="/terms" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Confidentialite
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                Parametres
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>(c) {year} Valorith Forge Idle. Tous droits reserves.</span>
          <a href="#top" className="hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
            Retour en haut
          </a>
        </div>
      </div>
    </footer>
  );
}
