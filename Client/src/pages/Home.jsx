import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main className="relative min-h-screen text-[var(--color-text)]">
            {/* Background global */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <img
                    src="/HERO_HEADER/HERO_HEADER_ACCUEIL_2.png"
                    alt="Valorith"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"></div>
            </div>

            {/* Hero */}
            <section className="mx-auto max-w-6xl px-6 pt-6 pb-16 lg:pt-10 lg:pb-24">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <p className="text-xs tracking-[0.15em] sm:tracking-[0.3em] text-[var(--color-gold)]">
                            IDLE FORGE - ROYAUMES A DEBLOQUER
                        </p>
                        <h1 className="mt-4 text-4xl font-heading md:text-5xl">
                            VALORITH <span className="text-[var(--color-gold)]">FORGE</span> IDLE
                        </h1>
                        <p className="mt-5 text-[var(--color-muted)]">
                            Debloque des royaumes, construis tes usines et laisse ta forge produire
                            pendant que tu es hors-ligne. Une progression chill, orientee long terme.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link
                                to="/login"
                                className="rounded-[var(--radius-md)] bg-[var(--color-gold)] px-6 py-3 font-semibold text-black"
                            >
                                Jouer
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-6 py-3 text-[var(--color-text)]"
                            >
                                Creer un compte
                            </Link>
                        </div>

                        <p className="mt-4 text-sm text-[var(--color-muted)]">
                            Pas de microtransactions. Une progression longue et satisfaisante.
                        </p>
                    </div>

                    {/* Apercu royaume */}
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/80 p-5">
                        <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
                            <span className="font-heading text-[var(--color-text)]">Apercu du Royaume</span>
                            <span>Forge en activite - Idle ON</span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-[var(--color-muted)] sm:text-xs">
                            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1">
                                12 royaumes
                            </div>
                            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1">
                                +2h idle
                            </div>
                            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1">
                                x2 bonus
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className="h-40 max-h-[240px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/50 p-2 md:h-48">
                                <img
                                    src="/MOCKUP/mockup.png"
                                    alt="Apercu complet"
                                    className="h-full w-full rounded-[var(--radius-md)] object-cover"
                                />
                            </div>

                            <div className="grid gap-3 md:grid-cols-3">
                                <div className="h-24 max-h-[140px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/50 p-2 md:h-28">
                                    <img
                                        src="/MOCKUP/Royaumes.png"
                                        alt="Royaumes"
                                        className="h-full w-full rounded-[var(--radius-md)] object-cover"
                                    />
                                </div>
                                <div className="h-24 max-h-[140px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/50 p-2 md:h-28">
                                    <img
                                        src="/MOCKUP/Usines.png"
                                        alt="Usines"
                                        className="h-full w-full rounded-[var(--radius-md)] object-cover"
                                    />
                                </div>
                                <div className="h-24 max-h-[140px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/50 p-2 md:h-28">
                                    <img
                                        src="/MOCKUP/Idle_gains.png"
                                        alt="Idle gains"
                                        className="h-full w-full rounded-[var(--radius-md)] object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature phare */}
            <section className="mx-auto max-w-6xl px-6 pb-4">
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/90 p-6 lg:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.15em] sm:tracking-[0.3em] text-[var(--color-gold)]">FEATURE PHARE</p>
                            <h2 className="mt-2 text-3xl font-heading">Synergies entre royaumes</h2>
                            <p className="mt-3 text-[var(--color-muted)]">
                                Active un royaume pour booster la production d'un autre. Choix clairs,
                                impact immediat, progression visible.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-[var(--color-muted)]">
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                +10% production
                            </span>
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                Bonus croises
                            </span>
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                Choix strategiques
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Etapes */}
            <section className="mx-auto max-w-6xl px-6 py-12 text-center">
                <p className="text-xs tracking-[0.15em] sm:tracking-[0.3em] text-[var(--color-gold)]">ETAPES</p>
                <h2 className="mt-3 text-3xl font-heading">COMMENT CA MARCHE ?</h2>
                <p className="mt-3 text-[var(--color-muted)]">
                    En quelques etapes, ta forge passe de braises hesitantes a un reseau d'usines automatisees.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {[
                        [
                            '1',
                            'Debloque les Royaumes',
                            'Progresse a travers differents royaumes et decouvre des ressources uniques.'
                        ],
                        [
                            '2',
                            'Construis tes usines',
                            'Investis, ameliore et debloque des competences pour booster ta production.'
                        ],
                        [
                            '3',
                            "Laisse l'Idle travailler",
                            'Quitte le jeu, la forge continue. Reviens pour recuperer tes gains.'
                        ]
                    ].map(([num, title, desc]) => (
                        <div
                            key={title}
                            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 text-left"
                        >
                            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-gold)]">
                                {num}
                            </div>
                            <h3 className="font-heading">{title}</h3>
                            <p className="mt-2 text-sm text-[var(--color-muted)]">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature phare */}
            <section className="mx-auto max-w-6xl px-6 pb-4">
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/90 p-6 lg:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.15em] sm:tracking-[0.3em] text-[var(--color-gold)]">FEATURE PHARE</p>
                            <h2 className="mt-2 text-3xl font-heading">Synergies entre royaumes</h2>
                            <p className="mt-3 text-[var(--color-muted)]">
                                Active un royaume pour booster la production d'un autre. Choix clairs,
                                impact immediat, progression visible.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-[var(--color-muted)]">
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                +10% production
                            </span>
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                Bonus croises
                            </span>
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                Choix strategiques
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fonctionnalites */}
            <section className="mx-auto max-w-6xl px-6 py-12 text-center">
                <p className="text-xs tracking-[0.15em] sm:tracking-[0.3em] text-[var(--color-gold)]">GAMEPLAY</p>
                <h2 className="mt-3 text-3xl font-heading">FONCTIONNALITES CLES</h2>
                <p className="mt-3 text-[var(--color-muted)]">
                    Tout ce qui fait tourner ta forge et rend la progression satisfaisante.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--color-muted)]">
                    <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                        Classement joueurs
                    </span>
                    <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                        Badge final
                    </span>
                    <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                        Defis hebdo
                    </span>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        ['Royaumes a debloquer', 'Enchaine les mondes et decouvre de nouvelles ressources.'],
                        ['Usines & Skills', 'Combine usines et competences pour booster la prod.'],
                        ['Idle gains', 'La forge continue meme hors-ligne.'],
                        ['Badge final', 'Un bonus permanent apres les 12 royaumes.']
                    ].map(([title, desc]) => (
                        <div
                            key={title}
                            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 text-left"
                        >
                            <h3 className="font-heading">{title}</h3>
                            <p className="mt-2 text-sm text-[var(--color-muted)]">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Apercu + nouveautes */}
            <section id="apercu" className="mx-auto max-w-6xl px-6 py-12 lg:flex lg:items-center lg:gap-10">
                <div className="lg:w-1/2">
                    <p className="text-xs tracking-[0.15em] sm:tracking-[0.3em] text-[var(--color-gold)]">APERCU</p>
                    <h2 className="mt-3 text-3xl font-heading">APERCU DU JEU</h2>
                    <p className="mt-3 text-[var(--color-muted)]">
                        Progression long terme sans microtransactions agressives.
                    </p>
                    <p className="mt-4 text-sm text-[var(--color-muted)]">
                        Pas de microtransactions. Une progression longue et satisfaisante.
                    </p>
                </div>

                <div className="max-h-[320px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/50 p-2">
                    <img
                        src="/GAMECAPTURE/Royaume_ressource.png"
                        alt="Apercu royaume"
                        className="h-full w-full rounded-[var(--radius-md)] object-cover"
                    />
                </div>
                <div className="max-h-[320px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/50 p-2">
                    <img
                        src="/GAMECAPTURE/Usine_competence.png"
                        alt="Apercu usines"
                        className="h-full w-full rounded-[var(--radius-md)] object-cover"
                    />
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-6 py-12">
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-heading text-xl">Dernieres nouveautes</h3>
                        <span className="text-xs text-[var(--color-muted)]">Derniere mise a jour : 10/12/2025</span>
                    </div>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
                        <li>Barre x10 / x100 / max pour les ameliorations.</li>
                        <li>Bonus x2 tous les 50 niveaux sur les usines.</li>
                        <li>Les royaumes affichent desormais leur ressource unique.</li>
                        <li>Ameliorations de lisibilite de la Game Page.</li>
                    </ul>
                </div>
            </section>

            {/* CTA final */}
            <section className="mx-auto max-w-5xl px-6 py-12">
                <div className="flex flex-col items-center justify-between gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 md:flex-row">
                    <div>
                        <h3 className="font-heading text-xl">Pret a rallumer la forge ?</h3>
                        <p className="mt-2 text-sm text-[var(--color-muted)]">
                            Rejoins ton royaume et laisse la forge travailler pour toi.
                        </p>
                    </div>
                    <a
                        href="#apercu"
                        className="rounded-[var(--radius-md)] bg-[var(--color-gold)] px-6 py-3 font-semibold text-black"
                    >
                        Voir un apercu
                    </a>
                </div>
            </section>

        </main>
    );
}
