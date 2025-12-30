import { useState } from 'react';
import { resetProgress, deleteAccount } from '../services/userService.js';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [resetPasswordInput, setResetPasswordInput] = useState('');
  const [deletePasswordInput, setDeletePasswordInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleResetProgress(e) {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      await resetProgress(resetPasswordInput);
      setMessage('Progression reinitialisee.');
      setResetPasswordInput('');
      navigate('/game');
    } catch (err) {
      setError(err.message || 'Erreur');
    }
  }

  async function handleDeleteAccount(e) {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      await deleteAccount(deletePasswordInput);
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erreur');
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

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        {message && <p className="mt-3 text-sm text-[var(--color-muted)]">{message}</p>}

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <h2 className="font-heading text-xl">Reset du jeu</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Cette action supprime la progression et redemarre le jeu.
          </p>
          <form onSubmit={handleResetProgress} className="mt-4 grid gap-3">
            <input
              className="input-base w-full"
              type="password"
              placeholder="Mot de passe"
              value={resetPasswordInput}
              onChange={(e) => setResetPasswordInput(e.target.value)}
            />
            <button
              className="w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
            >
              Reinitialiser
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-[var(--radius-lg)] border border-red-500/40 bg-red-500/10 p-5">
          <h2 className="font-heading text-xl">Supprimer le compte</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Cette action est irreversible.
          </p>
          <form onSubmit={handleDeleteAccount} className="mt-4 grid gap-3">
            <input
              className="input-base w-full"
              type="password"
              placeholder="Mot de passe"
              value={deletePasswordInput}
              onChange={(e) => setDeletePasswordInput(e.target.value)}
            />
            <button
              className="w-full rounded-[var(--radius-md)] bg-red-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Supprimer mon compte
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
