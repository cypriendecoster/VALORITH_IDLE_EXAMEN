import { useState } from 'react';
import { requestPasswordReset } from '../services/authService.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setResult('');
      setToken('');
      const res = await requestPasswordReset({ email });
      setResult(res.message || 'Demande envoyee.');
      if (res.token) {
        setToken(res.token);
      }
    } catch (err) {
      setError(err.message || 'Erreur');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <h1 className="text-2xl font-heading text-center mb-6">Mot de passe oublie</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="input-base w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          {result && <p className="text-sm text-[var(--color-muted)]">{result}</p>}
          {token && (
            <p className="text-xs text-[var(--color-muted)] break-all">
              Token: {token}
            </p>
          )}
          <button
            className="w-full p-3 rounded-[var(--radius-md)] bg-[var(--color-gold)] text-black font-semibold"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
