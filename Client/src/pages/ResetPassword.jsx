import { useState } from 'react';
import { resetPassword } from '../services/authService.js';
import { LockIcon } from '../components/forms/icons.jsx';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  function isPasswordValid(value) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!password || !confirm || !token) {
      setPasswordError('Tous les champs sont requis.');
      return;
    }
    if (!isPasswordValid(password)) {
      setPasswordError(
        'Mot de passe: 8 caracteres minimum, avec une majuscule, une minuscule et un chiffre.'
      );
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      setLoading(true);
      setPasswordError('');
      setError('');
      setResult('');
      const res = await resetPassword({ token, password });
      const message =
        res.message === 'Password updated' ? 'Mot de passe mis a jour.' : res.message;
      setResult(message || 'Mot de passe mis a jour.');
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <h1 className="text-2xl font-heading text-center mb-6">Reset mot de passe</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="reset-token">
            Token
          </label>
          <input
            id="reset-token"
            className="input-base w-full"
            type="text"
            name="token"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <p className="text-xs text-[var(--color-muted)]">Colle le token recu par email.</p>
          <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="reset-password">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              <LockIcon />
            </span>
            <input
              id="reset-password"
              className="input-base w-full bg-black/40 !pl-10 text-[var(--color-text)] placeholder:text-[var(--color-muted)]"
              type="password"
              name="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) {
                  setPasswordError('');
                }
              }}
            />
          </div>
          <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="reset-confirm">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              <LockIcon />
            </span>
            <input
              id="reset-confirm"
              className="input-base w-full bg-black/40 !pl-10 text-[var(--color-text)] placeholder:text-[var(--color-muted)]"
              type="password"
              name="confirm"
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-400" aria-live="polite">
              {passwordError}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-400" aria-live="polite">
              {error}
            </p>
          )}
          {result && (
            <p className="text-sm text-[var(--color-muted)]" aria-live="polite">
              {result}
            </p>
          )}
          {loading && (
            <p className="text-sm text-[var(--color-muted)]" aria-live="polite">
              Mise a jour...
            </p>
          )}
          <button
            className="w-full p-3 rounded-[var(--radius-md)] bg-[var(--color-gold)] text-black font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || !token.trim() || !password || !confirm || !isPasswordValid(password)}
          >
            {loading ? 'Mise a jour...' : 'Mettre a jour'}
          </button>
        </form>
      </div>
    </div>
  );
}
