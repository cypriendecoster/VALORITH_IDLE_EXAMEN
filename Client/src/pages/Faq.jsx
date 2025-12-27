import { Link } from 'react-router-dom';

export default function Faq() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-[var(--color-muted)]">
          Accueil / Aide & FAQ / Guide du Forgeron Patient
        </p>

        <h1 className="mt-6 text-4xl font-heading">Aide & FAQ VALORITH FORGE IDLE</h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Cette page répond aux questions les plus fréquentes sur le fonctionnement du jeu,
          la progression et ce qu'il faut faire lorsque vous avez l'impression d'être bloqué.
        </p>

        <h2 className="mt-10 text-2xl font-heading">1. Principe du jeu</h2>
        <p className="mt-3 text-[var(--color-muted)]">
          VALORITH FORGE IDLE est un jeu de type idle : vous gérez des forges, produisez des ressources,
          améliorez vos installations et laissez la production tourner même lorsque vous n'êtes pas devant l'écran.
        </p>
        <p className="mt-3 text-[var(--color-muted)]">
          Votre objectif est simple : faire grandir vos forges, débloquer de nouveaux paliers de puissance et des Royaumes,
          et vous rapprocher, lentement mais sûrement, du Badge Suprême.
        </p>

        <h2 className="mt-10 text-2xl font-heading">2. Comment jouer ?</h2>
        <h3 className="mt-4 font-heading">Comment gagner des ressources ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Vous gagnez des ressources principalement en laissant la forge travailler. Selon votre progression, vous pouvez
          produire du Charbon de Guerre, de l'Essence Abyssale ou d'autres ressources. Certaines actions demandent un clic,
          d'autres sont entièrement automatisées.
        </p>

        <h3 className="mt-4 font-heading">Que faire au début ?</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[var(--color-muted)]">
          <li>Commencez par lancer la production de base de votre forge.</li>
          <li>Utilisez les ressources produites pour acheter des améliorations.</li>
          <li>Débloquez vos premieres compétences pour que la forge tourne plus facilement.</li>
          <li>Revenez régulièrement pour investir vos gains dans de nouveaux paliers.</li>
        </ul>

        <h3 className="mt-4 font-heading">Que se passe-t-il quand je ferme le jeu ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Le jeu est pensé pour continuer à produire lorsque vous êtes déconnecté. Lorsque vous relancez VALORITH FORGE IDLE,
          le jeu calcule ce que votre forge a produit pendant votre absence, avec des limites pour éviter les abus
          (par exemple un maximum de production hors-ligne et sous cote par rapport au jeu allumé).
        </p>

        <h2 className="mt-10 text-2xl font-heading">3. Améliorations & progression</h2>
        <h3 className="mt-4 font-heading">À quoi servent les améliorations ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Les améliorations augmentent votre production, réduisent les temps d'attente, débloquent de nouvelles ressources
          ou de nouvelles mécaniques de jeu. Investir régulièrement dans vos upgrades est indispensable pour ne pas plafonner.
        </p>

        <h3 className="mt-4 font-heading">Comment débloquer de nouvelles zones / machines ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Certains contenus se débloquent lorsque vous atteignez un certain niveau, accumulez assez de ressources ou complétez
          des objectifs. Si une zone est encore verrouillée, survolez ou cliquez dessus : une condition d'accès devrait être indiquée.
        </p>

        <h3 className="mt-4 font-heading">Je suis bloqué, je ne progresse plus, que faire ?</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[var(--color-muted)]">
          <li>Vérifiez que toutes vos machines / lignes de forge sont bien actives.</li>
          <li>Investissez dans des améliorations qui augmentent la production automatique.</li>
          <li>Regardez si une nouvelle mécanique (compétence, usine, Royaume) est déblocable.</li>
          <li>Ralentissez le spam de clics et concentrez-vous sur l'optimisation à long terme.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-heading">4. Compétences & talents</h2>
        <h3 className="mt-4 font-heading">À quoi servent les compétences ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Les compétences vous permettent de spécialiser votre forgeron : augmenter la production, réduire les coûts,
          améliorer les gains hors-ligne, sécuriser certaines actions, etc. Elles complètent les améliorations classiques de la forge.
        </p>

        <h3 className="mt-4 font-heading">Comment améliorer mes compétences ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Chaque compétence a un coût de ressources pour les compétences passives, et un coût de temps (qui est le vôtre)
          pour les compétences actives.
        </p>

        <h3 className="mt-4 font-heading">Puis-je réinitialiser mes compétences ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Il n'est pas possible de réinitialiser les compétences passives, mais vous devez attendre un certain laps de temps
          pour réutiliser les compétences actives.
        </p>

        <h2 className="mt-10 text-2xl font-heading">5. Interface & onglets</h2>
        <p className="mt-2 text-[var(--color-muted)]">
          L'interface est organisée en plusieurs sections, pour simplifier la lisibilité et la continuité d'un IDLE traditionnel.
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[var(--color-muted)]">
          <li>Usines : zone principale de production.</li>
          <li>Compétences passives : amélioration des machines, de la production, réduction des coûts, etc.</li>
          <li>Compétences actives : grande amélioration de la production, réduction des coûts, etc. pendant un temps limité.</li>
          <li>Profil : progression globale, statistiques et éventuellement d'autres systèmes liés au compte.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-heading">6. Problèmes fréquents</h2>
        <h3 className="mt-4 font-heading">Ma production est à 0, que se passe-t-il ?</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Vérifiez que la machine ou la ligne concernée est bien activée. Assurez-vous que vous avez assez de ressources d'entrée.
          Si ce souci se présente, veuillez contacter la page support rapidement.
        </p>

        <h3 className="mt-4 font-heading">Je ne vois pas mes gains hors-ligne.</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Certains navigateurs ou paramètres peuvent limiter la précision du calcul hors-ligne. Assurez-vous d'utiliser un navigateur
          récent, de ne pas changer l'heure de votre système et de bien recharger le jeu complètement.
        </p>

        <h3 className="mt-4 font-heading">Le jeu semble lent ou buggé.</h3>
        <p className="mt-2 text-[var(--color-muted)]">
          Essayez de recharger la page du jeu. Fermez d'autres onglets très gourmands en ressources.
          Si le problème persiste, contactez le développeur en indiquant votre navigateur et ce que vous faisiez juste avant le bug.
        </p>

        <h2 className="mt-10 text-2xl font-heading">7. Contact & retours</h2>
        <p className="mt-2 text-[var(--color-muted)]">
          Vous avez trouvé un bug, une idée d'amélioration ou une question qui n'apparaît pas ici ? N'hésitez pas à utiliser
          la page support pour nous envoyer un message.
        </p>

        <div className="mt-4">
          <Link
            to="/support"
            className="inline-block rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 font-semibold text-black"
          >
            Ouvrir Contact / Support
          </Link>
        </div>

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
