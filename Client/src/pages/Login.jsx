import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { getMe } from '../services/userService.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { handleLogin, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [validationError, setValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  
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
  
  function onPasswordKey(event) {
    if (event.getModifierState) {
      setCapsLockOn(event.getModifierState('CapsLock'));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      setValidationError('Email et mot de passe requis.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Format email invalide.');
      return;
    }

    setValidationError('');
    try {
      await handleLogin(form, { remember: rememberMe });
      navigate('/game');
    } catch (err) {
      setValidationError('Identifiants invalides.');
    }
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
          <div>
            <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              className="input-base w-full bg-black/40 text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 hover:border-[var(--color-gold)]/40 disabled:cursor-not-allowed disabled:opacity-60"
              type="email"
              autoComplete="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor="login-password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="login-password"
                className="input-base w-full bg-black/40 text-[var(--color-text)] placeholder:text-[var(--color-muted)] pr-12 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 hover:border-[var(--color-gold)]/40 disabled:cursor-not-allowed disabled:opacity-60"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                name="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={onChange}
                onKeyUp={onPasswordKey}
                onKeyDown={onPasswordKey}
                disabled={loading}
                required
                minLength={6}
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
            {capsLockOn && (
              <p className="mt-2 text-xs text-[var(--color-gold-strong)]">
                Verrouillage majuscule actif.
              </p>
            )}
          </div>
          <label className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
            <span className="relative inline-flex h-4 w-4 items-center justify-center">
              <input
                type="checkbox"
                className="h-4 w-4 appearance-none rounded-[4px] border border-[var(--color-border)] bg-black/40 transition checked:border-[var(--color-gold)] checked:bg-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 disabled:cursor-not-allowed disabled:opacity-60"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                disabled={loading}
              />
              {rememberMe && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute h-3 w-3 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
              )}
            </span>
            Se souvenir de moi
          </label>
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
              'Se connecter'
            )}
          </button>
        </form>
        <div className="mt-6 space-y-3 border-t border-[var(--color-border)] pt-4 text-center">
          <Link className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)]" to="/forgot-password">
            Mot de passe oublie ?
          </Link>
          <p className="text-xs text-[var(--color-muted)]">
            Pas encore de compte ?{' '}
            <Link className="text-[var(--color-text)] hover:text-[var(--color-gold)]" to="/register">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

