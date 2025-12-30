export default function Privacy() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL_2.png"
          alt="Valorith"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-heading">Politique de confidentialite</h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Placeholder confidentialite. Remplace ce texte par ta politique finale.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-[var(--color-muted)]">
          <p>1. Donnees collectees.</p>
          <p>2. Finalites et conservation.</p>
          <p>3. Partage et hebergement.</p>
          <p>4. Droits des utilisateurs.</p>
          <p>5. Contact et mise a jour.</p>
        </div>
      </div>
    </main>
  );
}
