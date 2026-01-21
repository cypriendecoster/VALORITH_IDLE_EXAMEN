import { useCallback, useState } from 'react';
import { resetPassword } from '../services/authService.js';
import { LockIcon } from '../components/forms/icons.jsx';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);

  const isPasswordValid = useCallback((value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setTokenError('');
    setPasswordError('');
    setConfirmError('');
    setError('');
    if (!token) {
      setTokenError('Le token est requis.');
    }
    if (!password) {
      setPasswordError('Le mot de passe est requis.');
    }
    if (!confirm) {
      setConfirmError('La confirmation est requise.');
    }
    if (!token || !password || !confirm) {
      return;
    }
    if (!isPasswordValid(password)) {
      setPasswordError(
        'Mot de passe: 8 caractères minimum, avec une majuscule, une minuscule et un chiffre.'
      );
      return;
    }
    if (password !== confirm) {
      setConfirmError('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      setLoading(true);
      setTokenError('');
      setPasswordError('');
      setConfirmError('');
      setError('');
      setResult('');
      const res = await resetPassword({ token, password });
      const message =
        res.message === 'Password updated' ? 'Mot de passe mis à jour.' : res.message;
      setResult(message || 'Mot de passe mis à jour.');
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center overflow-y-auto px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,213,94,0.25),rgba(246,213,94,0))] blur-2xl" />
        <div className="absolute -bottom-24 right-12 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.2),rgba(148,163,184,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_55%)]" />
      </div>
      <div className="relative w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <h1 className="text-2xl font-heading text-center mb-6">
          Réinitialiser le mot de passe
        </h1>

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
            onChange={(e) => {
              setToken(e.target.value);
              if (tokenError) {
                setTokenError('');
              }
            }}
            autoComplete="one-time-code"
            required
            aria-invalid={Boolean(tokenError)}
            aria-describedby={`reset-token-hint${tokenError ? ' reset-token-error' : ''}`}
          />
          <p id="reset-token-hint" className="text-xs text-[var(--color-muted)]">
            Colle le token reçu par email.
          </p>
          {tokenError && (
            <p id="reset-token-error" className="text-sm text-red-400" aria-live="polite">
              {tokenError}
            </p>
          )}
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
              autoComplete="new-password"
              required
              aria-invalid={Boolean(passwordError)}
              aria-describedby={`reset-password-hint${passwordError ? ' reset-password-error' : ''}`}
            />
          </div>
          <p id="reset-password-hint" className="text-xs text-[var(--color-muted)]">
            8 caractères minimum, avec une majuscule, une minuscule et un chiffre.
          </p>
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
              onChange={(e) => {
                setConfirm(e.target.value);
                if (confirmError) {
                  setConfirmError('');
                }
              }}
              autoComplete="new-password"
              required
              aria-invalid={Boolean(confirmError)}
              aria-describedby={confirmError ? 'reset-confirm-error' : undefined}
            />
          </div>
          {passwordError && (
            <p id="reset-password-error" className="text-sm text-red-400" aria-live="polite">
              {passwordError}
            </p>
          )}
          {confirmError && (
            <p id="reset-confirm-error" className="text-sm text-red-400" aria-live="polite">
              {confirmError}
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
              Mise à jour...
            </p>
          )}
          <button
            className="w-full p-3 rounded-[var(--radius-md)] bg-[var(--color-gold)] text-black font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || !token.trim() || !password || !confirm || !isPasswordValid(password)}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </form>
      </div>
    </div>
  );
}
