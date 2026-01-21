import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SECTIONS = [
  {
    title: 'Principe du jeu',
    items: [
      {
        q: "C'est quoi VALORITH FORGE IDLE ?",
        a: "Un idle game où tu développes des forges, débloques des royaumes et fais grandir ta production même hors ligne."
      },
      {
        q: "Quel est l'objectif final ?",
        a: 'Débloquer tous les royaumes, optimiser tes usines, puis obtenir le badge final.'
      }
    ]
  },
  {
    title: 'Comment jouer',
    items: [
      {
        q: 'Comment gagner des ressources ?',
        a: 'Laisse tourner la forge, améliore tes usines et active les skills passifs.'
      },
      {
        q: 'Que faire au début ?',
        a: 'Lance ta production de base, investis dans les upgrades et débloque tes premières compétences.'
      },
      {
        q: 'Que se passe-t-il quand je ferme le jeu ?',
        a: "Une production hors ligne continue, avec un cap de 2h pour garder l'équilibre."
      }
    ]
  },
  {
    title: 'Progression',
    items: [
      {
        q: 'À quoi servent les upgrades ?',
        a: 'Ils augmentent la production, réduisent les coûts et débloquent de nouvelles mécaniques.'
      },
      {
        q: 'Comment debloquer un nouveau royaume ?',
        a: 'Rassemble les ressources demandées pour débloquer le prochain royaume.'
      },
      {
        q: 'Je suis bloqué, que faire ?',
        a: 'Revois tes upgrades, active tes skills et privilégie les boosts long terme.'
      }
    ]
  },
  {
    title: 'Interface et comptes',
    items: [
      {
        q: 'Où trouver mes stats et mon profil ?',
        a: "Dans l'onglet Profil pour suivre ta progression globale."
      },
      {
        q: 'Comment sécuriser mon compte ?',
        a: 'Utilise un mot de passe solide et ne partage jamais ton token.'
      }
    ]
  },
  {
    title: 'Problemes frequents',
    items: [
      {
        q: 'Ma production est à zéro',
        a: 'Vérifie que tes usines sont actives et que les ressources de base sont disponibles.'
      },
      {
        q: 'Je ne vois pas mes gains hors ligne',
        a: "Recharge la page et vérifie que l'heure système est correcte."
      },
      {
        q: 'Le jeu est lent',
        a: 'Ferme les onglets lourds et relance le jeu.'
      }
    ]
  }
];

export default function Faq() {
  const location = useLocation();
  const activeHash = location.hash || '';

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">AIDE ET FAQ</p>
        <h1 className="mt-4 text-4xl font-heading">Guide du forgeron patient</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Des réponses courtes et claires pour avancer vite, optimiser ta forge et reprendre la
          progression sans stress.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
          <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
            Idle
          </span>
          <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
            Progression
          </span>
          <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
            Comptes
          </span>
          <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
            Dépannage
          </span>
        </div>

        <nav className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-4 text-sm text-[var(--color-muted)]">
          <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">SOMMAIRE</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SECTIONS.map((section) => (
              <a
                key={section.title}
                href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`hover:text-[var(--color-text)] ${
                  activeHash === `#${section.title.toLowerCase().replace(/\s+/g, '-')}`
                    ? 'text-[var(--color-text)] underline underline-offset-4'
                    : ''
                }`}
                aria-current={
                  activeHash === `#${section.title.toLowerCase().replace(/\s+/g, '-')}`
                    ? 'true'
                    : undefined
                }
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6">
          {SECTIONS.map((section, index) => (
            <Fragment key={section.title}>
              <div
                id={section.title.toLowerCase().replace(/\s+/g, '-')}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6"
              >
                <h2 className="text-2xl font-heading">{section.title}</h2>
                <div className="mt-4 grid gap-4">
                  {section.items.map((item) => (
                    <details
                      key={item.q}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3"
                    >
                      <summary className="cursor-pointer text-sm font-heading text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60">
                        {item.q}
                      </summary>
                      <p className="mt-2 text-sm text-[var(--color-muted)]">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
              {index < SECTIONS.length - 1 && (
                <div className="h-px w-full bg-[var(--color-border)]/40" />
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-heading">Toujours bloqué ?</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Envoie un message au support, on te répond rapidement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 font-semibold text-black"
            >
              Contacter le support
            </Link>
            <Link
              to="/"
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)]"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
