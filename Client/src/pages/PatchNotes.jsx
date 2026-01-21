import { Link } from 'react-router-dom';

const PATCHES = [
  {
    version: '1.0.4',
    date: '08/12/2025',
    tag: 'Nouveau',
    items: [
      'Résumé des gains hors ligne avec cap de 2h et multiplicateur affiché.',
      'Panneau de progression global et badge final mis en avant.',
      'Lisibilité de la page de jeu améliorée.'
    ]
  },
  {
    version: '1.0.3',
    date: '06/12/2025',
    items: [
      'Skills passifs par royaume avec upgrades.',
      'Coûts et effets des skills visibles dans l’interface.'
    ]
  },
  {
    version: '1.0.2',
    date: '04/12/2025',
    items: [
      'Usines par royaume avec production affichée.',
      'Ressources principales et production par seconde.'
    ]
  },
  {
    version: '1.0.1',
    date: '02/12/2025',
    items: [
      'Déblocage et activation des royaumes.',
      'Progression endgame reliée au badge final.'
    ]
  },
  {
    version: '1.0.0',
    date: '01/12/2025',
    items: [
      'Lancement de VALORITH FORGE IDLE.',
      'Boucle de progression : royaumes, usines, skills, badge final.'
    ]
  }
];

export default function PatchNotes() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="text-sm text-[var(--color-muted)]">Accueil / PatchNotes</p>

        <h1 className="mt-6 text-4xl font-heading">PatchNotes</h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Dernières mises à jour de la forge.
        </p>

        <div className="mt-10 space-y-6">
          {PATCHES.map((patch, index) => (
            <div key={patch.version}>
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl">Version {patch.version}</h2>
                  <span className="text-xs text-[var(--color-muted)]">{patch.date}</span>
                </div>
                {patch.tag && (
                  <div className="mt-2">
                    <span className="rounded-full border border-[var(--color-border)] bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      {patch.tag}
                    </span>
                  </div>
                )}
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
                  {patch.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {index < PATCHES.length - 1 && (
                <div className="mt-6 border-t border-[var(--color-border)]/40" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-block rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)]"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
