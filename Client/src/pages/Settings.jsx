import { useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth.js';

const LANGUAGE_OPTIONS = [
  { value: 'fr', label: 'Francais' },
  { value: 'en', label: 'English' }
];

export default function Settings() {
  useRequireAuth();
  const [musicEnabled, setMusicEnabled] = useState(
    () => localStorage.getItem('settingsMusic') !== '0'
  );
  const [sfxEnabled, setSfxEnabled] = useState(
    () => localStorage.getItem('settingsSfx') !== '0'
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem('settingsLang') || 'fr'
  );
  const [reducedMotion, setReducedMotion] = useState(
    () => localStorage.getItem('settingsReducedMotion') === '1'
  );
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem('settingsHighContrast') === '1'
  );
  const [toast, setToast] = useState('');

  function updateSetting(key, value, setter) {
    localStorage.setItem(key, value);
    setter(value === '1' || value === '0' ? value === '1' : value);
    setToast('Parametres sauvegardes');
    setTimeout(() => setToast(''), 1500);
  }

  function resetSettings() {
    updateSetting('settingsMusic', '1', setMusicEnabled);
    updateSetting('settingsSfx', '1', setSfxEnabled);
    updateSetting('settingsLang', 'fr', setLanguage);
    updateSetting('settingsReducedMotion', '0', setReducedMotion);
    updateSetting('settingsHighContrast', '0', setHighContrast);
  }

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/ROYAUMES/HERO%20HEADER%20ASHKAR.png"
          alt="Valorith"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-heading">Compte / Parametres</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Audio, langue et accessibilite.
        </p>
        <button
          type="button"
          onClick={resetSettings}
          className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/30 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)]"
        >
          Reinitialiser
        </button>

        {toast && (
          <div
            className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-4 py-2 text-sm text-[var(--color-muted)]"
            aria-live="polite"
            role="status"
          >
            {toast}
          </div>
        )}

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <h2 className="font-heading text-xl">Audio</h2>
          <div className="mt-4 grid gap-5 text-sm text-[var(--color-muted)]">
            <label className="flex items-center justify-between">
              <span>Musique</span>
              <input
                type="checkbox"
                className="h-4 w-4 appearance-none rounded-[4px] border border-[var(--color-border)] bg-black/40 transition checked:border-[var(--color-gold)] checked:bg-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60"
                checked={musicEnabled}
                onChange={(e) => {
                  const value = e.target.checked ? '1' : '0';
                  updateSetting('settingsMusic', value, setMusicEnabled);
                }}
              />
            </label>
            <label className="flex items-center justify-between">
              <span>Effets sonores</span>
              <input
                type="checkbox"
                className="h-4 w-4 appearance-none rounded-[4px] border border-[var(--color-border)] bg-black/40 transition checked:border-[var(--color-gold)] checked:bg-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60"
                checked={sfxEnabled}
                onChange={(e) => {
                  const value = e.target.checked ? '1' : '0';
                  updateSetting('settingsSfx', value, setSfxEnabled);
                }}
              />
            </label>
          </div>
        </section>

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <h2 className="font-heading text-xl">Langue</h2>
          <div className="mt-4">
            <select
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-sm text-[var(--color-text)]"
              value={language}
              onChange={(e) => {
                updateSetting('settingsLang', e.target.value, setLanguage);
              }}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <h2 className="font-heading text-xl">Accessibilite</h2>
          <div className="mt-4 grid gap-5 text-sm text-[var(--color-muted)]">
            <label className="flex items-center justify-between">
              <span>Animations reduites</span>
              <input
                type="checkbox"
                className="h-4 w-4 appearance-none rounded-[4px] border border-[var(--color-border)] bg-black/40 transition checked:border-[var(--color-gold)] checked:bg-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60"
                checked={reducedMotion}
                onChange={(e) => {
                  const value = e.target.checked ? '1' : '0';
                  updateSetting('settingsReducedMotion', value, setReducedMotion);
                }}
              />
            </label>
            <label className="flex items-center justify-between">
              <span>Contraste eleve</span>
              <input
                type="checkbox"
                className="h-4 w-4 appearance-none rounded-[4px] border border-[var(--color-border)] bg-black/40 transition checked:border-[var(--color-gold)] checked:bg-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60"
                checked={highContrast}
                onChange={(e) => {
                  const value = e.target.checked ? '1' : '0';
                  updateSetting('settingsHighContrast', value, setHighContrast);
                }}
              />
            </label>
          </div>
        </section>
      </div>
    </main>
  );
}
