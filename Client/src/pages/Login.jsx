import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { handleLogin, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  
  const navigate = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    await handleLogin(form);
    navigate('/game');
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <img
          src="/LOGO/Logo_gauche.png"
          alt="Valorith"
          className="w-44 mx-auto mb-6"
        />
        <h1 className="text-2xl font-heading text-center mb-6">Connexion</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="input-base w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <input
            className="input-base w-full"
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={onChange}
          />
          {error && <p className="text-sm text-[var(--color-gold-strong)]">{error}</p>}
          <button
            className="w-full p-3 rounded-[var(--radius-md)] bg-[var(--color-gold)] text-black font-semibold"
            disabled={loading}
          >
            {loading ? '...' : 'Se connecter'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)]" to="/forgot-password">
            Mot de passe oublie ?
          </Link>
        </div>
      </div>
    </div>
  );
}

