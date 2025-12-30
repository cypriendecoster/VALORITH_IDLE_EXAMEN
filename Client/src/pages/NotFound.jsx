export default function NotFound() {
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

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-4xl">404</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Page introuvable. Retournez a l'accueil.
        </p>
      </div>
    </main>
  );
}
