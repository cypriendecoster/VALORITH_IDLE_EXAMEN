import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    title: 'Principe du jeu',
    items: [
      {
        q: 'C est quoi VALORITH FORGE IDLE ?',
        a: "Un idle game ou tu developpes des forges, debloques des royaumes et fais grandir ta production meme hors ligne."
      },
      {
        q: 'Quel est l objectif final ?',
        a: 'Debloquer tous les royaumes, optimiser tes usines, puis obtenir le badge final.'
      }
    ]
  },
  {
    title: 'Comment jouer',
    items: [
      {
        q: 'Comment gagner des ressources ?',
        a: 'Laisse tourner la forge, ameliore tes usines et active les bonuses de skills.'
      },
      {
        q: 'Que faire au debut ?',
        a: 'Lance ta production de base, investis dans les upgrades et debloque tes premieres competences.'
      },
      {
        q: "Que se passe t il quand je ferme le jeu ?",
        a: 'Une production hors ligne continue, avec un cap pour garder l equilibre.'
      }
    ]
  },
  {
    title: 'Progression',
    items: [
      {
        q: 'A quoi servent les upgrades ?',
        a: 'Ils augmentent la production, reduisent les couts et debloquent de nouvelles mecaniques.'
      },
      {
        q: 'Comment debloquer un nouveau royaume ?',
        a: 'Atteins le niveau requis et rassemble les ressources demandees.'
      },
      {
        q: 'Je suis bloque, que faire ?',
        a: 'Revois tes upgrades, active tes skills et privilegie les boosts long terme.'
      }
    ]
  },
  {
    title: 'Interface et comptes',
    items: [
      {
        q: 'Ou trouver mes stats et mon profil ?',
        a: 'Dans l onglet Profil pour suivre ta progression globale.'
      },
      {
        q: 'Comment securiser mon compte ?',
        a: 'Utilise un mot de passe solide et ne partage jamais ton token.'
      }
    ]
  },
  {
    title: 'Problemes frequents',
    items: [
      {
        q: 'Ma production est a zero',
        a: 'Verifie que tes usines sont actives et que les ressources de base sont disponibles.'
      },
      {
        q: 'Je ne vois pas mes gains hors ligne',
        a: 'Recharge la page et verifie que l heure systeme est correcte.'
      },
      {
        q: 'Le jeu est lent',
        a: 'Ferme les onglets lourds et relance le jeu.'
      }
    ]
  }
];

export default function Faq() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">AIDE ET FAQ</p>
        <h1 className="mt-4 text-4xl font-heading">Guide du forgeron patient</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Des reponses courtes et claires pour avancer vite, optimiser ta forge et reprendre la
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
            Depannage
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="grid gap-6">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6"
            >
              <h2 className="text-2xl font-heading">{section.title}</h2>
              <div className="mt-4 grid gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3"
                  >
                    <h3 className="text-sm font-heading text-[var(--color-text)]">{item.q}</h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-heading">Toujours bloque ?</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Envoie un message au support, on te repond rapidement.
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
              Retour a l accueil
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
