export default function Tutorial() {
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

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-heading">Tutoriel</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Guide rapide pour demarrer dans Valorith Idle.
        </p>

        <div className="mt-6 grid gap-4 text-sm text-[var(--color-muted)]">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="font-heading text-[var(--color-text)]">1. Debloquer un royaume</p>
            <p className="mt-1">
              Gagne des ressources pour debloquer le prochain royaume.
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="font-heading text-[var(--color-text)]">2. Monter les usines</p>
            <p className="mt-1">
              Chaque usine augmente la production de sa ressource principale.
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="font-heading text-[var(--color-text)]">3. Acheter des skills</p>
            <p className="mt-1">
              Les skills boostent la production et reduisent les couts.
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="font-heading text-[var(--color-text)]">4. Endgame</p>
            <p className="mt-1">
              Remplis toutes les exigences et debloque le badge final.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
