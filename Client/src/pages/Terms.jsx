export default function Terms() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL.png"
          alt="Valorith"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 shadow-lg">
          <h1 className="text-3xl font-heading">Conditions generales d'utilisation</h1>
          <p className="mt-2 text-xs text-[var(--color-muted)]">Derniere mise a jour : 12/03/2025</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Placeholder CGU. Remplace ce texte par tes conditions finales.
          </p>
          <nav className="mt-6 text-sm text-[var(--color-muted)]">
            <p className="font-semibold text-[var(--color-text)]">Sommaire</p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#objet">Objet du service</a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#acces-compte">
                  Acces et compte utilisateur
                </a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#donnees">
                  Donnees et responsabilites
                </a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#regles">
                  Regles de conduite
                </a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#limitation">
                  Limitation de responsabilite
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-6 grid gap-6 text-sm text-[var(--color-muted)]">
            <section id="objet">
              <h2 className="text-base font-semibold text-[var(--color-text)]">1. Objet du service</h2>
              <p className="mt-2">Description generale du service.</p>
            </section>
            <section id="acces-compte">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                2. Acces et compte utilisateur
              </h2>
              <p className="mt-2">Conditions d'acces et de creation de compte.</p>
            </section>
            <section id="donnees">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                3. Donnees et responsabilites
              </h2>
              <p className="mt-2">Gestion des donnees et responsabilites.</p>
            </section>
            <section id="regles">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                4. Regles de conduite
              </h2>
              <p className="mt-2">Regles d'usage du service.</p>
            </section>
            <section id="limitation">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                5. Limitation de responsabilite
              </h2>
              <p className="mt-2">Limites de responsabilite.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
