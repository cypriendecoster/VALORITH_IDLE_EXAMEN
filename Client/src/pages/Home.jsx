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
            <section className="mx-auto max-w-6xl px-6 pt-8 pb-14 lg:pt-12 lg:pb-20">
                <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">
                            IDLE FORGE - ROYAUMES A DEBLOQUER
                        </p>
                        <h1 className="mt-4 text-4xl font-heading md:text-6xl">
                            VALORITH <span className="text-[var(--color-gold)]">FORGE</span> IDLE
                        </h1>
                        <p className="mt-5 text-lg text-[var(--color-muted)]">
                            Batis ton empire d'usines, optimise tes chaines de production et laisse
                            la forge travailler pendant que tu es hors-ligne.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-4">
                            <Link
                                to="/login"
                                className="rounded-[var(--radius-md)] bg-[var(--color-gold)] px-6 py-3 font-semibold text-black"
                            >
                                Jouer maintenant
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-6 py-3 text-[var(--color-text)]"
                            >
                                Creer un compte
                            </Link>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                Progression longue
                            </span>
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                Sans microtransactions
                            </span>
                            <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1">
                                Idle rewards
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-3 rounded-[var(--radius-lg)] bg-[var(--color-gold)]/10 blur-2xl"></div>
                        <div className="relative rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/80 p-4">
                            <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
                                <span className="font-heading text-[var(--color-text)]">Apercu du royaume</span>
                                <span>Forge active</span>
                            </div>
                            <div className="mt-3 h-48 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/50 p-2">
                                <img
                                    src="/MOCKUP/mockup.png"
                                    alt="Apercu complet"
                                    className="h-full w-full rounded-[var(--radius-md)] object-cover"
                                />
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-[var(--color-muted)] sm:text-xs">
                                <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1 text-center">
                                    12 royaumes
                                </div>
                                <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1 text-center">
                                    +2h idle
                                </div>
                                <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1 text-center">
                                    x2 bonus
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Presentation */}
            <section className="mx-auto max-w-6xl px-6 pb-4">
                <div className="grid gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
                    <div>
                        <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">PRESENTATION</p>
                        <h2 className="mt-3 text-3xl font-heading">Une forge vivante</h2>
                        <p className="mt-3 text-[var(--color-muted)]">
                            Chaque royaume apporte des ressources et des synergies. Tu choisis ton
                            rythme, tu optimises tes usines, tu recoltes des bonus durables.
                        </p>
                    </div>
                    <div className="grid gap-3 text-sm text-[var(--color-muted)]">
                        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3">
                            Synergies entre royaumes pour booster la production.
                        </div>
                        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3">
                            Skills progressifs pour specialiser ta strategie.
                        </div>
                        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3">
                            Un objectif final: debloquer le badge ultime.
                        </div>
                    </div>
                </div>
            </section>

            {/* Comment ca marche */}
            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">COMMENT CA MARCHE</p>
                        <h2 className="mt-3 text-3xl font-heading">Ta boucle de progression</h2>
                        <p className="mt-3 text-[var(--color-muted)]">
                            Simple a apprendre, profonde a maitriser. Trois etapes, un rythme
                            satisfaisant.
                        </p>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {[
                        [
                            '01',
                            'Debloque un royaume',
                            'Des ressources uniques, des bonus croises et de nouvelles usines.'
                        ],
                        [
                            '02',
                            'Optimise tes usines',
                            'Investis, ameliore, puis maximise ta production.'
                        ],
                        [
                            '03',
                            "Laisse l'Idle faire",
                            'Reviens plus tard et collecte une forge pleine.'
                        ]
                    ].map(([num, title, desc]) => (
                        <div
                            key={title}
                            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6"
                        >
                            <div className="text-xs text-[var(--color-gold)]">{num}</div>
                            <h3 className="mt-2 text-lg font-heading">{title}</h3>
                            <p className="mt-2 text-sm text-[var(--color-muted)]">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fonctionnalites */}
            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">FONCTIONNALITES</p>
                        <h2 className="mt-3 text-3xl font-heading">Tout pour garder l'envie</h2>
                        <p className="mt-3 text-[var(--color-muted)]">
                            Des objectifs clairs, des recompenses tangibles, et une progression
                            toujours visible.
                        </p>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        ['Royaumes a debloquer', 'Decouvre de nouvelles ressources a chaque monde.'],
                        ['Usines & Skills', 'Combine usines et competences pour booster la prod.'],
                        ['Idle gains', 'La forge continue meme hors-ligne.'],
                        ['Badge final', 'Un bonus permanent apres les 12 royaumes.']
                    ].map(([title, desc]) => (
                        <div
                            key={title}
                            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6"
                        >
                            <h3 className="text-lg font-heading">{title}</h3>
                            <p className="mt-2 text-sm text-[var(--color-muted)]">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Apercu */}
            <section className="mx-auto max-w-6xl px-6 pb-14">
                <div className="grid gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
                    <div>
                        <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">APERCU</p>
                        <h2 className="mt-3 text-3xl font-heading">Un monde qui evolue</h2>
                        <p className="mt-3 text-[var(--color-muted)]">
                            Lance une partie, observe ta progression, et reviens pour declencher des
                            boosts majeurs.
                        </p>
                        <div className="mt-5 space-y-3 text-sm text-[var(--color-muted)]">
                            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3">
                                Ressources uniques par royaume.
                            </div>
                            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3">
                                Usines specialisees et upgrades visibles.
                            </div>
                            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3">
                                Objectifs clairs jusqu'au badge final.
                            </div>
                        </div>
                    </div>
                    <div className="max-h-[360px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/50 p-2">
                        <img
                            src="/GAMECAPTURE/Royaume_ressource.png"
                            alt="Apercu royaume"
                            className="h-full w-full rounded-[var(--radius-md)] object-cover"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
