import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { getMe } from '../services/userService.js';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { handleRegister, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [validationError, setValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        return;
      }
      try {
        await getMe();
        navigate('/game', { replace: true });
      } catch (err) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    }
    verifyToken();
  }, [navigate]);

  function onChange(e) {
    if (validationError) {
      setValidationError('');
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!username || !email || !password) {
      setValidationError('Tous les champs sont requis.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Email invalide.');
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setValidationError('Pseudo invalide: 3 a 20 caracteres, lettres/chiffres/underscore.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setValidationError(
        'Mot de passe: 8 caracteres minimum, avec une majuscule, une minuscule et un chiffre.'
      );
      return;
    }

    setValidationError('');
    try {
      await handleRegister(form);
      navigate('/game');
    } catch (err) {
      setValidationError(err.message || 'Inscription impossible.');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <img src="/LOGO/Logo_gauche.png" alt="Valorith" className="w-44 mx-auto mb-6" />
        <h1 className="text-2xl font-heading text-center mb-6">Inscription</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="register-username">
              Pseudo
            </label>
            <input
              id="register-username"
              className="input-base w-full bg-black/40 text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 hover:border-[var(--color-gold)]/40 disabled:cursor-not-allowed disabled:opacity-60"
              type="text"
              name="username"
              placeholder="Pseudo"
              value={form.username}
              onChange={onChange}
              disabled={loading}
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              className="input-base w-full bg-black/40 text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 hover:border-[var(--color-gold)]/40 disabled:cursor-not-allowed disabled:opacity-60"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="register-password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="register-password"
                className="input-base w-full bg-black/40 text-[var(--color-text)] placeholder:text-[var(--color-muted)] pr-12 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 hover:border-[var(--color-gold)]/40 disabled:cursor-not-allowed disabled:opacity-60"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={onChange}
                disabled={loading}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-black/40 px-2 py-1 text-[10px] text-[var(--color-text)] hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              8 caracteres minimum, avec une majuscule, une minuscule et un chiffre.
            </p>
          </div>
          {(validationError || error) && (
            <div className="mt-2 space-y-2">
              {validationError && (
                <p className="rounded-[var(--radius-sm)] border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {validationError}
                </p>
              )}
              {error && (
                <p className="rounded-[var(--radius-sm)] border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </p>
              )}
            </div>
          )}
          <button
            className={`w-full rounded-[var(--radius-md)] p-3 font-semibold ${
              validationError || error
                ? 'border border-red-500/50 bg-red-500/15 text-red-100 hover:bg-red-500/20 active:scale-[0.99]'
                : 'bg-[var(--color-gold)] text-black hover:brightness-110 hover:shadow-[0_0_12px_rgba(246,213,94,0.35)] active:scale-[0.99]'
            } disabled:cursor-not-allowed disabled:opacity-60`}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Chargement...
              </span>
            ) : (
              'Creer un compte'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
