import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-[var(--color-muted)]">Accueil / Contact</p>

        <h1 className="mt-4 text-4xl font-heading">Contact & Support</h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Une question sur le jeu, un bug, ou un compte bloque ? Laisse-nous un message.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-4">
              <label className="text-sm">
                <span className="text-[var(--color-muted)]">Nom</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-[var(--color-text)]"
                />
              </label>

              <label className="text-sm">
                <span className="text-[var(--color-muted)]">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-[var(--color-text)]"
                  required
                />
              </label>

              <label className="text-sm">
                <span className="text-[var(--color-muted)]">Sujet</span>
                <select
                  name="topic"
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-[var(--color-text)]"
                >
                  <option value="support">Support</option>
                  <option value="bug">Signaler un bug</option>
                  <option value="feedback">Suggestion</option>
                  <option value="account">Compte</option>
                </select>
              </label>

              <label className="text-sm">
                <span className="text-[var(--color-muted)]">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-[var(--color-text)]"
                  required
                />
              </label>

              <p className="text-xs text-[var(--color-muted)]">
                Formulaire non connecte. Tu peux aussi passer par la FAQ.
              </p>

              <button
                type="submit"
                className="rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
              >
                Envoyer
              </button>
            </div>
          </form>

          <aside className="space-y-4">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-5">
              <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">RESSOURCES</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                <li>
                  <Link to="/faq" className="hover:text-[var(--color-text)]">
                    Lire la FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[var(--color-text)]">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[var(--color-text)]">
                    Confidentialite
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-5">
              <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">DELAI</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                Reponse sous 48h en moyenne.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
