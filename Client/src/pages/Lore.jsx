import { Link } from 'react-router-dom';

export default function Lore() {
  return (
    <main id="top" className="relative min-h-screen text-[var(--color-text)]">
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/ROYAUMES/HERO%20HEADER%20ASHKAR.png"
            alt=""
            aria-hidden="true"
            className="h-[320px] w-full object-cover sm:h-[380px]"
          />
          <div className="absolute inset-0 bg-black/55"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
        </div>

        <div className="mx-auto max-w-4xl px-6 pt-16 pb-10">
          <p className="text-xs tracking-[0.3em] text-[var(--color-gold)]">CHRONIQUES</p>
          <h1 className="mt-4 text-4xl font-heading sm:text-5xl">VALORITH FORGE IDLE</h1>
          <p className="mt-4 max-w-2xl text-[var(--color-muted)] leading-relaxed">
            Une enclave de braise obstinée, perdue aux frontières de VALORITH : LES 12 ROYAUMES.
            Ici, il n'y a qu'un serment : forger, encore et encore.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-[var(--color-muted)]">
          Accueil / Page Lore de l'univers / Chroniques de la Forge Obscure
        </p>

        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-5 text-[var(--color-muted)] leading-relaxed">
          La forge d'Ashkar ne dort jamais. Chaque lingot, chaque étincelle, alimente une promesse :
          un jour, le Badge Suprême changera le destin des 12 royaumes.
        </div>

        <nav className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/70 p-4 text-sm text-[var(--color-muted)]">
          <p className="text-xs tracking-[0.3em] text-[var(--color-gold)]">SOMMAIRE</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a href="#chapitre-1" className="hover:text-[var(--color-text)]">
              Chapitre I - Un monde rongé par la rouille
            </a>
            <a href="#chapitre-2" className="hover:text-[var(--color-text)]">
              Chapitre II - L'objectif unique : le Badge Suprême
            </a>
            <a href="#chapitre-3" className="hover:text-[var(--color-text)]">
              Chapitre III - Lien avec VALORITH : Les 12 Royaumes
            </a>
            <a href="#chapitre-4" className="hover:text-[var(--color-text)]">
              Chapitre IV - Vous, Forgeron
            </a>
            <a href="#chapitre-5" className="hover:text-[var(--color-text)]">
              Chapitre V - Par-delà l'écran
            </a>
          </div>
        </nav>
        <div className="my-12 flex items-center gap-4 text-[var(--color-muted)]">
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
          <span className="text-xs tracking-[0.4em]">///</span>
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
        </div>
        <span className="inline-flex rounded-full border border-[var(--color-border)] bg-black/30 px-3 py-1 text-xs tracking-[0.3em] text-[var(--color-gold)]">
          CHAPITRE I
        </span>
        <h2 id="chapitre-1" className="mt-2 border-l-2 border-[var(--color-gold)] pl-3 text-2xl font-heading sm:text-3xl">
          Un monde rongé par la rouille
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Ashkar n'est plus qu'un néant de métal brisé et de braises mourantes. Là où s'élevaient jadis
          des citadelles de fer et de pierre, il ne reste que des forges silencieuses, étouffées par une
          rouille noire qui dévore tout ce qu'elle touche.
        </p>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Pourtant, dans l'ombre, une forge demeure. Une seule. La vôtre. Une enclave de braise obstinée
          qui refuse de s'éteindre.
        </p>

        <div className="my-12 flex items-center gap-4 text-[var(--color-muted)]">
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
          <span className="text-xs tracking-[0.4em]">///</span>
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
        </div>
        <span className="inline-flex rounded-full border border-[var(--color-border)] bg-black/30 px-3 py-1 text-xs tracking-[0.3em] text-[var(--color-gold)]">
          CHAPITRE II
        </span>
        <h2 id="chapitre-2" className="mt-2 border-l-2 border-[var(--color-gold)] pl-3 text-2xl font-heading sm:text-3xl">
          L'objectif unique : le Badge Suprême
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Ici, il n'y a ni prophétie ni grand destin, seulement un serment silencieux : forger. Encore.
          Toujours. Jusqu'à ce que le métal cède, que les enclumes se fendent et que vos mains ne puissent
          plus suivre le rythme des marteaux.
        </p>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Au bout de cette obsession se trouve un seul artefact, murmuré dans les tavernes et craint des
          anciens maîtres de la forge : le Badge Suprême. Un insigne incrusté, symbole ultime de maîtrise,
          capable de boire la rouille elle-même.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-2">
            <img
              src="/GAMECAPTURE/Royaume_ressource.png"
              alt="Royaume et ressources"
              className="h-full w-full rounded-[var(--radius-md)] object-cover"
            />
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-2">
            <img
              src="/GAMECAPTURE/Usine_competence.png"
              alt="Forge et usines"
              className="h-full w-full rounded-[var(--radius-md)] object-cover"
            />
          </div>
        </div>

        <div className="my-12 flex items-center gap-4 text-[var(--color-muted)]">
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
          <span className="text-xs tracking-[0.4em]">///</span>
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
        </div>
        <span className="inline-flex rounded-full border border-[var(--color-border)] bg-black/30 px-3 py-1 text-xs tracking-[0.3em] text-[var(--color-gold)]">
          CHAPITRE III
        </span>
        <h2 id="chapitre-3" className="mt-2 border-l-2 border-[var(--color-gold)] pl-3 text-2xl font-heading sm:text-3xl">
          Lien avec VALORITH : Les 12 Royaumes
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          On raconte que le Badge Suprême n'est pas né pour Ashkar seulement. Dans les profondeurs des
          grimoires des Arcanistes de Valorith, il est décrit comme un artefact-pont : un fragment de forge
          capable de déverser ses ressources au-delà de ce monde mourant.
        </p>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Dans VALORITH : LES 12 ROYAUMES, ce badge aurait le pouvoir d'alimenter les guerres, les pactes
          et les ascensions silencieuses des Rois et des Sœurs de l'Ombre. Chaque lingot forgé ici, chaque
          goutte de sueur et de sang versée dans cette forge obscure, prépare en secret la chute ou le
          triomphe de ceux qui règnent là-bas.
        </p>

        <div className="my-12 flex items-center gap-4 text-[var(--color-muted)]">
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
          <span className="text-xs tracking-[0.4em]">///</span>
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
        </div>
        <span className="inline-flex rounded-full border border-[var(--color-border)] bg-black/30 px-3 py-1 text-xs tracking-[0.3em] text-[var(--color-gold)]">
          CHAPITRE IV
        </span>
        <h2 id="chapitre-4" className="mt-2 border-l-2 border-[var(--color-gold)] pl-3 text-2xl font-heading sm:text-3xl">
          Vous, Forgeron
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Vous n'êtes ni héros ni élu. Vous êtes celui qui reste lorsque tous les autres ont fui. Celui
          qui accepte de laisser tourner la forge jusqu'à ce que le temps lui-même se fissure.
        </p>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Tant que les braises rougeoient, votre tâche est simple : nourrir la Forge, la pousser au-delà
          de ses limites, et gravir seul les marches qui mènent au Badge Suprême. Qu'il devienne votre
          fardeau ou votre couronne.
        </p>

        <div className="my-10 flex items-center gap-4 text-[var(--color-muted)]">
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
          <span className="text-xs tracking-[0.4em]">///</span>
          <span className="h-px flex-1 bg-[var(--color-border)]/60"></span>
        </div>
        <span className="inline-flex rounded-full border border-[var(--color-border)] bg-black/30 px-3 py-1 text-xs tracking-[0.3em] text-[var(--color-gold)]">
          CHAPITRE V
        </span>
        <h2 id="chapitre-5" className="mt-2 border-l-2 border-[var(--color-gold)] pl-3 text-2xl font-heading sm:text-3xl">
          Par-delà l'écran
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          VALORITH FORGE IDLE n'est qu'un fragment, un éclat de métal détaché du monde principal de
          VALORITH : LES 12 ROYAUMES. Une excroissance de forge née du besoin d'observer ce qui se passe
          lorsque l'on confie le pouvoir à la patience, à l'endurance et à l'obsession.
        </p>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Que vous laissiez tourner la forge en silence ou que vous surveilliez chaque étincelle,
          souvenez-vous : quelque part, dans un autre royaume, quelqu'un bénéficiera des fruits de votre
          acharnement.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-block rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)] hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)]"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/game"
            className="inline-block rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-[var(--color-text)] hover:brightness-110"
          >
            Commencer le jeu
          </Link>
          <a
            href="#top"
            className="inline-block rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/30 px-4 py-2 text-[var(--color-text)] hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)]"
          >
            Retour en haut
          </a>
        </div>
      </div>
    </main>
  );
}
