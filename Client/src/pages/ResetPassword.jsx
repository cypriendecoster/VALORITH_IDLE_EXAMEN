import { useState } from 'react';
import { resetPassword } from '../services/authService.js';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      setError('');
      setResult('');
      const res = await resetPassword({ token, password });
      setResult(res.message || 'Mot de passe mis a jour.');
    } catch (err) {
      setError(err.message || 'Erreur');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <h1 className="text-2xl font-heading text-center mb-6">Reset mot de passe</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="input-base w-full"
            type="text"
            name="token"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <input
            className="input-base w-full"
            type="password"
            name="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input-base w-full"
            type="password"
            name="confirm"
            placeholder="Confirmer le mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          {result && <p className="text-sm text-[var(--color-muted)]">{result}</p>}
          <button
            className="w-full p-3 rounded-[var(--radius-md)] bg-[var(--color-gold)] text-black font-semibold"
          >
            Mettre a jour
          </button>
        </form>
      </div>
    </div>
  );
}
