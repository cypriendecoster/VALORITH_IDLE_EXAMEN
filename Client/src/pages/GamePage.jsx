import { useEffect, useState } from 'react';
import { useGameData } from '../hooks/useGameData.js';
import { useIdleTick } from '../hooks/useIdleTick.js';
import { getGameSnapshot, upgradeFactory, upgradeSkill } from '../services/gameService.js';
import { useRealms } from '../hooks/useRealms.js';
import { unlockRealm } from '../services/gameService.js';
import { activateRealm } from '../services/realmService.js';
import { useLocation } from 'react-router-dom';
import { useRequireAuth } from '../hooks/useRequireAuth.js';

import RealmPanel from '../components/Panel/RealmPanel.jsx';
import ResourcesPanel from '../components/Panel/ResourcesPanel.jsx';
import FactoryPanel from '../components/Panel/FactoryPanel.jsx';
import SkillPanel from '../components/Panel/SkillPanel.jsx';
import ProgressPanel from '../components/Panel/ProgressPanel.jsx';

export default function GamePage() {
  const normalizeError = (err) => {
    const message = err?.message || '';
    if (message === 'Not enough resources') return 'Ressources insuffisantes';
    return message || 'Ressources insuffisantes';
  };
  const formatDuration = (totalSeconds) => {
    const total = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    if (hours > 0) {
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    }
    return `${minutes}m`;
  };
  const formatNumber = (value) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Number(value || 0));
  const formatCompact = (value) => {
    const numeric = Number(value || 0);
    const abs = Math.abs(numeric);
    if (!Number.isFinite(numeric)) return '0';
    if (abs >= 1e12) return `${formatNumber(numeric / 1e12)} Bn`;
    if (abs >= 1e9) return `${formatNumber(numeric / 1e9)} Md`;
    if (abs >= 1e6) return `${formatNumber(numeric / 1e6)} M`;
    if (abs >= 1e3) return `${formatNumber(numeric / 1e3)} K`;
    return formatNumber(numeric);
  };
  const { data, loading, error, setData } = useGameData();
  const { data: realms, loading: realmsLoading, error: realmsError } = useRealms();
  const [actionError, setActionError] = useState('');
  const [inlineError, setInlineError] = useState(null);
  const [notice, setNotice] = useState('');
  const [idleSummary, setIdleSummary] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(
    () => localStorage.getItem('hideOnboarding') !== '1'
  );
  const [dismissedIdleSignature, setDismissedIdleSignature] = useState(
    () => localStorage.getItem('idleSummaryDismissed') || ''
  );
  const location = useLocation();

  useRequireAuth();

  useEffect(() => {
    if (location.state?.notice) {
      setNotice(location.state.notice);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  useIdleTick(setData, setIdleSummary, dismissedIdleSignature);
  const activeRealmId = data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ?? null;
  const activeRealm = data?.realms?.find((r) => r.id === activeRealmId);
  const activeRealmName = activeRealm ? activeRealm.name : 'Royaume';
  const normalizeKey = (value = '') =>
    value
      .toLowerCase()
      .replace(/[œ]/g, 'oe')
      .replace(/[æ]/g, 'ae')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  const normalizedRealmName = normalizeKey(activeRealmName);
  const heroHeaderByRealm = [
    { key: 'aquerus', file: 'HERO HEADER AQUERUS.png' },
    { key: 'ashkar', file: 'HERO HEADER ASHKAR.png' },
    { key: 'berseris', file: 'HERO HEADER BERSERIS.png' },
    { key: 'drakaerys', file: 'HERO HEADER DRAKAERYS.png' },
    { key: 'elyndar', file: 'HERO HEADER ELYNDAR.png' },
    { key: 'feralis', file: 'HERO HEADER FERALIS.png' },
    { key: 'glaceryon', file: 'HERO HEADER GLACERYON.png' },
    { key: 'kharim', file: 'HERO HEADER KHARIM.png' },
    { key: 'morbudis', file: 'HERO HEADER MORBUDIS.png' },
    { key: 'nebilis', file: 'HERO HEADER NEBILIS.png' },
    { key: 'verdelance', file: 'HERO HEADER Verdelance.png' },
    { key: 'zephyron', file: 'HERO HEADER ZEPHYRON.png' },
  ];
  const heroHeaderFile =
    heroHeaderByRealm.find((entry) => normalizedRealmName.includes(entry.key))?.file ??
    'HERO HEADER ASHKAR.png';
  const heroHeaderSrc = `/ROYAUMES/${encodeURIComponent(heroHeaderFile)}`;

  async function handleUpgrade(factoryId) {
    try {
      setActionError('');
      setInlineError(null);
      await upgradeFactory(factoryId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      const message = normalizeError(err);
      if (message === 'Ressources insuffisantes') {
        setInlineError({ scope: 'factory', id: factoryId, message });
      } else {
        setActionError(message);
      }
    }
  }

  async function handleUnlock(realmId) {
    try {
      setActionError('');
      setInlineError(null);
      await unlockRealm(realmId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      const message = normalizeError(err);
      if (message === 'Ressources insuffisantes') {
        setInlineError({ scope: 'realm', id: realmId, message });
      } else {
        setActionError(message);
      }
    }
  }

  async function handleSkillUpgrade(skillId) {
    try {
      setActionError('');
      setInlineError(null);
      await upgradeSkill(skillId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      const message = normalizeError(err);
      if (message === 'Ressources insuffisantes') {
        setInlineError({ scope: 'skill', id: skillId, message });
      } else {
        setActionError(message);
      }
    }
  }

  async function handleActivate(realmId) {
    try {
      setActionError('');
      setInlineError(null);
      await activateRealm(realmId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      const message = normalizeError(err);
      setActionError(message);
    }
  }

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={heroHeaderSrc}
          alt={activeRealmName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-heading">{activeRealmName} - Forge Active</h1>
        {showOnboarding && (
          <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-3 text-sm text-[var(--color-muted)]">
            <div className="flex items-center justify-between">
              <p className="font-heading text-[var(--color-text)]">Boucle de progression</p>
              <button
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-muted)]"
                onClick={() => {
                  localStorage.setItem('hideOnboarding', '1');
                  setShowOnboarding(false);
                }}
                aria-label="Fermer l'encart de bienvenue"
              >
                Fermer
              </button>
            </div>
            <p className="mt-1">
              Debloque un royaume, ameliore ses usines, achete des skills, puis remplis
              les exigences endgame pour obtenir le badge final.
            </p>
          </div>
        )}
        {notice && (
          <div
            className="mt-3 flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-sm text-[var(--color-text)]"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">
                i
              </span>
              <span>{notice}</span>
            </div>
            <button
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-muted)]"
              onClick={() => setNotice('')}
              aria-label="Fermer la notification"
            >
              Fermer
            </button>
          </div>
        )}
        {idleSummary && idleSummary.signature !== dismissedIdleSignature && (
          <div
            className="mt-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/25 px-3 py-2 text-sm text-[var(--color-muted)]"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[var(--color-text)]">
                <span className="text-base" aria-hidden="true">
                  i
                </span>
                <span>Hors ligne: +{formatDuration(idleSummary.seconds)}</span>
              </div>
              <button
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-text)]/80 hover:border-[var(--color-gold)]/60 hover:text-[var(--color-text)]"
                onClick={() => {
                  if (idleSummary.signature) {
                    localStorage.setItem('idleSummaryDismissed', idleSummary.signature);
                    setDismissedIdleSignature(idleSummary.signature);
                  }
                  setIdleSummary(null);
                }}
                aria-label="Fermer le resume hors ligne"
              >
                Fermer
              </button>
            </div>
            <div className="mt-1 text-xs text-[var(--color-muted)]">
              Cap 2h, multiplicateur +{Math.round((idleSummary.offlineMultiplier || 0) * 100)}%,
              bonus hors-ligne: {idleSummary.idleBonusApplied ? 'oui' : 'non'}
            </div>
            {data && data.resources && (
              <div className="mt-1 text-xs text-[var(--color-muted)]">
                {idleSummary.updated
                  .map((u) => {
                    const res = data.resources.find((r) => r.id === u.resourceId);
                    const name = res ? res.name : 'Ressource';
                    return `+${formatCompact(Math.floor(u.gain))} ${name}`;
                  })
                  .join(', ')}
              </div>
            )}
          </div>
        )}

        <RealmPanel
          realms={realms}
          loading={realmsLoading}
          error={realmsError}
          onUnlock={handleUnlock}
          onActivate={handleActivate}
          playerRealms={data?.player?.realms}
          resources={data?.resources}
          playerResources={data?.player?.resources}
          inlineError={inlineError}
        />

        <ResourcesPanel data={data} loading={loading} error={error} />
        <ProgressPanel data={data} loading={loading} error={error} />

        <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
          <FactoryPanel
            data={data}
            loading={loading}
            error={error}
            onUpgrade={handleUpgrade}
            inlineError={inlineError}
          />
          <SkillPanel
            data={data}
            loading={loading}
            error={error}
            onUpgrade={handleSkillUpgrade}
            inlineError={inlineError}
          />
        </div>
      </div>
    </main>
  );
}
