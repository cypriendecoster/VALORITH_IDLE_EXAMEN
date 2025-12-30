import { useEffect } from 'react';
import { idleTick } from '../services/gameService.js';

export function useIdleTick(setGameData, setIdleSummary, dismissedIdleSignature) {
  useEffect(() => {
    let intervalId;

    async function tick() {
      try {
        const result = await idleTick();
        if (!result.updated || !setGameData) return;

        if (result.isOffline && result.deltaSeconds > 0 && setIdleSummary) {
          const signature = `${result.appliedSeconds || result.deltaSeconds}:` +
            result.updated
              .map((u) => `${u.resourceId}:${Math.floor(u.gain || 0)}`)
              .join('|');
          if (signature !== dismissedIdleSignature) {
          setIdleSummary({
            seconds: result.deltaSeconds,
            updated: result.updated,
            offlineMultiplier: result.offlineMultiplier,
            appliedSeconds: result.appliedSeconds,
            idleBonusApplied: result.idleBonusApplied,
            signature
          });
          }
        }

        setGameData((prev) => {
          if (!prev) return prev;

          const updatedResources = prev.player.resources.map((r) => {
            const found = result.updated.find((u) => u.resourceId === r.resource_id);
            if (!found) return r;

            return {
              ...r,
              amount: found.amount,
              amount_carry: found.amountCarry
            };
          });

          const existingIds = new Set(prev.player.resources.map((r) => r.resource_id));
          const newResources = result.updated
            .filter((u) => !existingIds.has(u.resourceId))
            .map((u) => ({
              resource_id: u.resourceId,
              amount: u.amount,
              amount_carry: u.amountCarry
            }));

          return {
            ...prev,
            player: {
              ...prev.player,
              resources: newResources.length > 0
                ? [...updatedResources, ...newResources]
                : updatedResources
            }
          };
        });
      } catch (error) {
        // optional: ignore tick errors silently
      }
    }

    intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [setGameData, setIdleSummary, dismissedIdleSignature]);
}
