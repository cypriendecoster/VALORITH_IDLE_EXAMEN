export default function Terms() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 shadow-lg">
          <h1 className="text-3xl font-heading">Conditions generales d'utilisation</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Derniere mise a jour : 08/03/2026</p>
          <p className="mt-3 text-base text-[var(--color-muted)]">
            Les presentes conditions generales d'utilisation (CGU) encadrent l'acces et l'usage du jeu IDLE
            (ci-apres le "Service"). En creant un compte ou en utilisant le Service, l'utilisateur accepte sans
            reserve les presentes CGU.
          </p>
          <nav className="mt-6 text-base text-[var(--color-muted)]" aria-label="Sommaire des conditions">
            <p className="font-semibold text-[var(--color-text)]">Sommaire</p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#objet"
                >
                  Objet du service
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#editeur"
                >
                  Editeur du service
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#acces-compte"
                >
                  Acces et compte utilisateur
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#fonctionnement"
                >
                  Fonctionnement du service
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#propriete"
                >
                  Propriete intellectuelle
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#donnees"
                >
                  Donnees personnelles et cookies
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#regles"
                >
                  Regles de conduite
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#responsabilite"
                >
                  Responsabilite
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#resiliation"
                >
                  Suspension et suppression de compte
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#hebergement"
                >
                  Hebergement
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
                  href="#modifications"
                >
                  Modification des CGU
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-6 grid gap-6 text-base text-[var(--color-muted)]">
            <section id="objet">
              <h2 className="text-base font-semibold text-[var(--color-text)]">1. Objet du service</h2>
              <p className="mt-2">
                Le Service est un jeu IDLE gratuit accessible en ligne. Il permet a l'utilisateur de creer un compte,
                de progresser dans le jeu et de sauvegarder ses donnees de progression.
              </p>
            </section>
            <section id="editeur">
              <h2 className="text-base font-semibold text-[var(--color-text)]">2. Editeur du service</h2>
              <p className="mt-2">
                Editeur : Cyprien Decoster, auto-entrepreneur.
                Adresse : 121 avenue fin de la guerre, 59200 Tourcoing, France.
                Email : cyprien.decoster@hotmail.com.
                Telephone : 07 25 25 25 25.
              </p>
            </section>
            <section id="acces-compte">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                3. Acces et compte utilisateur
              </h2>
              <p className="mt-2">
                L'acces au Service est gratuit et ouvert a tout age. La creation d'un compte est necessaire pour
                enregistrer la progression. L'utilisateur s'engage a fournir des informations exactes et a les tenir
                a jour.
              </p>
            </section>
            <section id="fonctionnement">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                4. Fonctionnement du service
              </h2>
              <p className="mt-2">
                Le Service est fourni en l'etat, avec un objectif de disponibilite sans garantie d'absence d'erreurs
                ou d'interruptions. Des maintenances ou mises a jour peuvent etre effectuees a tout moment.
              </p>
            </section>
            <section id="propriete">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                5. Propriete intellectuelle
              </h2>
              <p className="mt-2">
                L'ensemble des contenus, elements visuels, textes, logos et mecanismes de jeu sont la propriete de
                l'editeur, sauf mention contraire. Toute reproduction, modification ou reutilisation sans autorisation
                est interdite.
              </p>
            </section>
            <section id="donnees">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                6. Donnees personnelles et cookies
              </h2>
              <p className="mt-2">
                Le Service collecte des donnees de compte et des donnees de jeu strictement necessaires au
                fonctionnement et a la sauvegarde de la progression. Des cookies peuvent etre utilises pour le bon
                fonctionnement du Service. Ces donnees ne sont pas utilisees a des fins publicitaires.
              </p>
            </section>
            <section id="regles">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                7. Regles de conduite
              </h2>
              <p className="mt-2">
                Il est interdit d'utiliser des bots, scripts ou tout moyen automatisant la progression ou perturbant
                l'equite du jeu. Toute tentative de contournement, fraude ou exploitation de bug est interdite.
              </p>
            </section>
            <section id="responsabilite">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                8. Responsabilite
              </h2>
              <p className="mt-2">
                L'editeur ne pourra etre tenu responsable des dommages directs ou indirects lies a l'utilisation du
                Service, notamment en cas de perte de donnees, interruption, indisponibilite ou incompatibilite.
              </p>
            </section>
            <section id="resiliation">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                9. Suspension et suppression de compte
              </h2>
              <p className="mt-2">
                L'utilisateur peut supprimer son compte depuis la section "Mon profil" dans le jeu. L'editeur se
                reserve le droit de suspendre ou supprimer un compte en cas de non-respect des presentes CGU.
              </p>
            </section>
            <section id="hebergement">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                10. Hebergement
              </h2>
              <p className="mt-2">
                Le Service est heberge par OVH, Lille, France.
              </p>
            </section>
            <section id="modifications">
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                11. Modification des CGU
              </h2>
              <p className="mt-2">
                Les presentes CGU peuvent etre modifiees a tout moment. La date de mise a jour est indiquee en haut de
                page. La poursuite de l'utilisation du Service vaut acceptation des CGU mises a jour.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
