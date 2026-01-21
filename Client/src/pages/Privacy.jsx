export default function Privacy() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL_2.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 shadow-lg">
          <h1 className="text-3xl font-heading">Politique de confidentialité</h1>
          <p className="mt-2 text-xs text-[var(--color-muted)]">Dernière mise à jour : 12/03/2025</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Cette politique décrit comment nous collectons, utilisons et protégeons tes données lorsque
            tu joues à VALORITH FORGE IDLE. Elle s’applique au site, au jeu et aux services associés.
          </p>
          <nav className="mt-6 text-sm text-[var(--color-muted)]">
            <p className="font-semibold text-[var(--color-text)]">Sommaire</p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#donnees">Données collectées</a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#finalites">
                  Finalités et conservation
                </a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#partage">
                  Partage et hébergement
                </a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#droits">
                  Droits des utilisateurs
                </a>
              </li>
              <li>
                <a className="hover:text-[var(--color-gold)]" href="#contact">
                  Contact et mise à jour
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-6 grid gap-6 text-sm text-[var(--color-muted)]">
            <section id="donnees">
              <h2 className="text-base font-semibold text-[var(--color-text)]">1. Données collectées</h2>
              <p className="mt-2">
                Nous collectons les informations nécessaires au fonctionnement du jeu : identifiants de
                compte (email, pseudo), progression (royaumes, usines, skills, badges), paramètres de
                jeu, et données techniques de base (adresse IP, type d’appareil, navigateur).
              </p>
            </section>
            <section id="finalites">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                2. Finalités et conservation
              </h2>
              <p className="mt-2">
                Ces données servent à fournir le service, sécuriser les comptes, améliorer l’expérience
                et gérer le support. Nous conservons les données tant que le compte est actif ou aussi
                longtemps que nécessaire pour répondre à nos obligations légales.
              </p>
            </section>
            <section id="partage">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                3. Partage et hébergement
              </h2>
              <p className="mt-2">
                Nous ne vendons pas tes données. Elles peuvent être partagées avec des prestataires
                techniques strictement nécessaires (hébergement, sécurité, support), soumis à des
                obligations de confidentialité.
              </p>
            </section>
            <section id="droits">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                4. Droits des utilisateurs
              </h2>
              <p className="mt-2">
                Tu peux demander l’accès, la rectification ou la suppression de tes données, ainsi que
                la limitation de certains traitements. Pour exercer ces droits, contacte-nous via la
                page de support.
              </p>
            </section>
            <section id="contact">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                5. Contact et mise à jour
              </h2>
              <p className="mt-2">
                Pour toute question relative à la confidentialité, utilise la page de contact. Cette
                politique peut évoluer ; la date de mise à jour sera indiquée en haut de page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}