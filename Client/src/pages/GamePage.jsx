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
  const { data, loading, error, setData } = useGameData();
  const { data: realms, loading: realmsLoading, error: realmsError } = useRealms();
  const [actionError, setActionError] = useState('');
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

  async function handleUpgrade(factoryId) {
    try {
      setActionError('');
      await upgradeFactory(factoryId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      setActionError(err.message || 'Action impossible');
    }
  }

  async function handleUnlock(realmId) {
    try {
      setActionError('');
      await unlockRealm(realmId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      setActionError(err.message || 'Action impossible');
    }
  }

  async function handleSkillUpgrade(skillId) {
    try {
      setActionError('');
      await upgradeSkill(skillId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      setActionError(err.message || 'Action impossible');
    }
  }

  async function handleActivate(realmId) {
    try {
      setActionError('');
      await activateRealm(realmId);
      const snapshot = await getGameSnapshot();
      setData(snapshot);
    } catch (err) {
      setActionError(err.message || 'Action impossible');
    }
  }

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/ROYAUMES/HERO%20HEADER%20ASHKAR.png"
          alt="Ashkar"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-heading">{activeRealmName} - Forge Active</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Game UI (UX). Data wiring comes next.
        </p>
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
        {actionError && (
          <div
            className="mt-3 flex items-center gap-2 rounded-[var(--radius-md)] border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            aria-live="polite"
          >
            <span className="text-base" aria-hidden="true">
              !
            </span>
            <span>{actionError}</span>
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
            className="mt-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-sm text-[var(--color-muted)]"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[var(--color-text)]">
                <span className="text-base" aria-hidden="true">
                  i
                </span>
                <span>Hors ligne: +{Math.floor(idleSummary.seconds)}s</span>
              </div>
              <button
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-muted)]"
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
              Cap: 2h | Multiplicateur: {Math.round((idleSummary.offlineMultiplier || 0) * 100)}%
              {' | Idle bonus: '}
              {idleSummary.idleBonusApplied ? 'oui' : 'non'}
            </div>
            {data && data.resources && (
              <div className="mt-1 text-xs text-[var(--color-muted)]">
                {idleSummary.updated
                  .map((u) => {
                    const res = data.resources.find((r) => r.id === u.resourceId);
                    const name = res ? res.name : 'Ressource';
                    return `+${Math.floor(u.gain)} ${name}`;
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
        />

        <ResourcesPanel data={data} loading={loading} error={error} />
        <ProgressPanel data={data} loading={loading} error={error} />

        <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
          <FactoryPanel data={data} loading={loading} error={error} onUpgrade={handleUpgrade} />
          <SkillPanel data={data} loading={loading} error={error} onUpgrade={handleSkillUpgrade} />
        </div>
      </div>
    </main>
  );
}
