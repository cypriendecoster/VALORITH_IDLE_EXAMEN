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

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-heading">Conditions generales d'utilisation</h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Placeholder CGU. Remplace ce texte par tes conditions finales.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-[var(--color-muted)]">
          <p>1. Objet du service.</p>
          <p>2. Acces et compte utilisateur.</p>
          <p>3. Donnees et responsabilites.</p>
          <p>4. Regles de conduite.</p>
          <p>5. Limitation de responsabilite.</p>
        </div>
      </div>
    </main>
  );
}
