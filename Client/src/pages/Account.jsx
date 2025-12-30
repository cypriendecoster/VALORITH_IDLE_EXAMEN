import { useState } from 'react';
import { resetProgress, deleteAccount } from '../services/userService.js';
import { useNavigate } from 'react-router-dom';
import { useRequireAuth } from '../hooks/useRequireAuth.js';

export default function Account() {
  useRequireAuth();
  const [resetPasswordInput, setResetPasswordInput] = useState('');
  const [deletePasswordInput, setDeletePasswordInput] = useState('');
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleResetProgress(e) {
    e.preventDefault();
    try {
      setResetLoading(true);
      setError('');
      setMessage('');
      await resetProgress(resetPasswordInput);
      setMessage('Progression reinitialisee.');
      setResetPasswordInput('');
      navigate('/game', { state: { notice: 'Progression reinitialisee.' } });
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setResetLoading(false);
    }
  }

  async function handleDeleteAccount(e) {
    e.preventDefault();
    if (deleteConfirmInput !== 'SUPPRIMER') {
      setError('Confirmation requise: tape SUPPRIMER.');
      return;
    }
    try {
      setDeleteLoading(true);
      setError('');
      setMessage('');
      await deleteAccount(deletePasswordInput);
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setDeleteLoading(false);
    }
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
        <h1 className="text-3xl font-heading">Compte</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Reinitialiser la progression ou supprimer le compte.
        </p>

        {error && (
          <p className="mt-3 text-sm text-red-400" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-3 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
            {message}
          </p>
        )}

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <h2 className="font-heading text-xl">Reset du jeu</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Cette action supprime la progression (usines, skills, ressources) et redemarre le jeu.
          </p>
          <form onSubmit={handleResetProgress} className="mt-4 grid gap-3" aria-busy={resetLoading}>
            <label className="text-xs text-[var(--color-muted)]">
              Mot de passe
              <input
                className="input-base mt-2 w-full"
                type="password"
                placeholder="Mot de passe"
                value={resetPasswordInput}
                onChange={(e) => setResetPasswordInput(e.target.value)}
              />
            </label>
            <button
              disabled={resetLoading}
              className="w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
            >
              {resetLoading ? 'Reinitialisation...' : 'Reinitialiser'}
            </button>
          </form>
        </section>

        <div
          className="mt-8 rounded-[var(--radius-lg)] border border-red-500/40 bg-red-500/10 p-6"
          role="region"
          aria-label="Zone de danger"
        >
          <p className="text-xs tracking-[0.2em] text-red-200">DANGER ZONE</p>
          <section className="mt-3">
            <h2 className="font-heading text-xl">Supprimer le compte</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Cette action est irreversible. Compte, progression, stats et badges seront supprimes.
          </p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            Verifie que tu n'as plus besoin des donnees liees a ce compte avant de continuer.
          </p>
          <form onSubmit={handleDeleteAccount} className="mt-4 grid gap-3" aria-busy={deleteLoading}>
            <label className="text-xs text-[var(--color-muted)]">
              Mot de passe
              <input
                className="input-base mt-2 w-full"
                type="password"
                placeholder="Mot de passe"
                value={deletePasswordInput}
                onChange={(e) => setDeletePasswordInput(e.target.value)}
              />
            </label>
            <label className="text-xs text-[var(--color-muted)]">
              Confirmation
              <input
                className="input-base mt-2 w-full"
                type="text"
                placeholder="Tape SUPPRIMER pour confirmer"
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
              />
            </label>
            <button
              disabled={deleteConfirmInput !== 'SUPPRIMER' || deleteLoading}
              className="w-full rounded-[var(--radius-md)] bg-red-500 px-4 py-2 text-sm font-semibold text-white"
            >
              {deleteLoading ? 'Suppression...' : 'Supprimer mon compte'}
            </button>
          </form>
          </section>
        </div>
      </div>
    </main>
  );
}
