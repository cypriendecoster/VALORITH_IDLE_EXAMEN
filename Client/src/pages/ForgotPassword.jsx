import { useState } from 'react';
import { requestPasswordReset } from '../services/authService.js';
import { MailIcon } from '../components/forms/icons.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  function isEmailValid(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setEmailError('Email requis.');
        return;
      }
      if (!isEmailValid(trimmedEmail)) {
        setEmailError('Format email invalide.');
        return;
      }
      setLoading(true);
      setError('');
      setEmailError('');
      setResult('');
      const res = await requestPasswordReset({ email: trimmedEmail });
      setResult(res.message || 'Demande envoyée.');
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <h1 className="text-2xl font-heading text-center mb-6">Mot de passe oublié</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="forgot-email">
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              <MailIcon />
            </span>
            <input
              id="forgot-email"
              className="input-base w-full bg-black/40 !pl-10 text-[var(--color-text)] placeholder:text-[var(--color-muted)]"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) {
                  setEmailError('');
                }
              }}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? 'forgot-email-error' : undefined}
              required
            />
          </div>
          <p className="text-xs text-[var(--color-muted)]">Un lien sera envoyé à cette adresse.</p>
          {emailError && (
            <p
              id="forgot-email-error"
              className="text-sm text-red-400"
              aria-live="assertive"
              role="alert"
            >
              {emailError}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-400" aria-live="assertive" role="alert">
              {error}
            </p>
          )}
          {result && (
            <p className="text-sm text-[var(--color-muted)]" aria-live="polite" role="status">
              {result}
            </p>
          )}
          {loading && (
            <p className="text-sm text-[var(--color-muted)]" aria-live="polite" role="status">
              Envoi...
            </p>
          )}
          <button
            className="w-full p-3 rounded-[var(--radius-md)] bg-[var(--color-gold)] text-black font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || !email.trim() || !isEmailValid(email)}
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  );
}
