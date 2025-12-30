import { useState } from 'react';

const LANGUAGE_OPTIONS = [
  { value: 'fr', label: 'Francais' },
  { value: 'en', label: 'English' }
];

export default function Settings() {
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

  function updateSetting(key, value, setter) {
    localStorage.setItem(key, value);
    setter(value === '1' || value === '0' ? value === '1' : value);
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

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-heading">Compte / Parametres</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Audio, langue et accessibilite.
        </p>

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <h2 className="font-heading text-xl">Audio</h2>
          <div className="mt-4 grid gap-3 text-sm text-[var(--color-muted)]">
            <label className="flex items-center justify-between">
              <span>Musique</span>
              <input
                type="checkbox"
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
          <div className="mt-4 grid gap-3 text-sm text-[var(--color-muted)]">
            <label className="flex items-center justify-between">
              <span>Animations reduites</span>
              <input
                type="checkbox"
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
