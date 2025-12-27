import { Link } from 'react-router-dom';

export default function Lore() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-[var(--color-muted)]">
          Accueil / Page Lore de l'univers / Chroniques de la Forge Obscure
        </p>

        <h1 className="mt-6 text-4xl font-heading">VALORITH FORGE IDLE</h1>
        <p className="mt-4 text-[var(--color-muted)]">
          Une enclave de braise obstinée, perdue aux frontières de VALORITH : LES 12 ROYAUMES.
          Ici, il n'y a qu'un serment : forger, encore et encore.
        </p>

        <h2 className="mt-10 text-2xl font-heading">Un monde rongé par la rouille</h2>
        <p className="mt-3 text-[var(--color-muted)]">
          Ashkar n'est plus qu'un néant de métal brisé et de braises mourantes. Là où s'élevaient jadis
          des citadelles de fer et de pierre, il ne reste que des forges silencieuses, étouffées par une
          rouille noire qui dévore tout ce qu'elle touche.
        </p>
        <p className="mt-3 text-[var(--color-muted)]">
          Pourtant, dans l'ombre, une forge demeure. Une seule. La vôtre. Une enclave de braise obstinée
          qui refuse de s'éteindre.
        </p>

        <h2 className="mt-10 text-2xl font-heading">L'objectif unique : le Badge Suprême</h2>
        <p className="mt-3 text-[var(--color-muted)]">
          Ici, il n'y a ni prophétie ni grand destin, seulement un serment silencieux : forger. Encore.
          Toujours. Jusqu'à ce que le métal cède, que les enclumes se fendent et que vos mains ne puissent
          plus suivre le rythme des marteaux.
        </p>
        <p className="mt-3 text-[var(--color-muted)]">
          Au bout de cette obsession se trouve un seul artefact, murmuré dans les tavernes et craint des
          anciens maîtres de la forge : le Badge Suprême. Un insigne incréé, symbole ultime de maîtrise,
          capable de boire la rouille elle-même.
        </p>

        <h2 className="mt-10 text-2xl font-heading">Lien avec VALORITH : Les 12 Royaumes</h2>
        <p className="mt-3 text-[var(--color-muted)]">
          On raconte que le Badge Suprême n'est pas né pour Ashkar seulement. Dans les profondeurs des
          grimoires des Arcanistes de Valorith, il est décrit comme un artefact-pont : un fragment de forge
          capable de déverser ses ressources au-delà de ce monde mourant.
        </p>
        <p className="mt-3 text-[var(--color-muted)]">
          Dans VALORITH : LES 12 ROYAUMES, ce badge aurait le pouvoir d'alimenter les guerres, les pactes
          et les ascensions silencieuses des Rois et des Sœurs de l'Ombre. Chaque lingot forgé ici, chaque
          goutte de sueur et de sang versée dans cette forge obscure, prépare en secret la chute ou le
          triomphe de ceux qui règnent là-bas.
        </p>

        <h2 className="mt-10 text-2xl font-heading">Vous, Forgeron</h2>
        <p className="mt-3 text-[var(--color-muted)]">
          Vous n'êtes ni héros ni élu. Vous êtes celui qui reste lorsque tous les autres ont fui. Celui
          qui accepte de laisser tourner la forge jusqu'à ce que le temps lui-même se fissure.
        </p>
        <p className="mt-3 text-[var(--color-muted)]">
          Tant que les braises rougeoient, votre tâche est simple : nourrir la Forge, la pousser au-delà
          de ses limites, et gravir seul les marches qui mènent au Badge Suprême. Qu'il devienne votre
          fardeau… ou votre couronne.
        </p>

        <h2 className="mt-10 text-2xl font-heading">Par-delà l'écran</h2>
        <p className="mt-3 text-[var(--color-muted)]">
          VALORITH FORGE IDLE n'est qu'un fragment, un éclat de métal détaché du monde principal de
          VALORITH : LES 12 ROYAUMES. Une excroissance de forge née du besoin d'observer ce qui se passe
          lorsque l'on confie le pouvoir à la patience, à l'endurance… et à l'obsession.
        </p>
        <p className="mt-3 text-[var(--color-muted)]">
          Que vous laissiez tourner la forge en silence ou que vous surveilliez chaque étincelle,
          souvenez-vous : quelque part, dans un autre royaume, quelqu'un bénéficiera des fruits de votre
          acharnement.
        </p>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-block rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)]"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
