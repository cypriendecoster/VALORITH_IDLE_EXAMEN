import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { getMe } from '../services/userService.js';
import { Link, useNavigate } from 'react-router-dom';
import FormAlert from '../components/forms/FormAlert.jsx';
import FormField from '../components/forms/FormField.jsx';
import PasswordField from '../components/forms/PasswordField.jsx';
import PasswordStrength from '../components/forms/PasswordStrength.jsx';
import useRegisterForm from '../hooks/useRegisterForm.js';
import { MailIcon, UserIcon } from '../components/forms/icons.jsx';

export default function Register() {
  const { handleRegister, loading, error } = useAuth();
  const navigate = useNavigate();
  const {
    form,
    fieldErrors,
    touched,
    showPassword,
    setShowPassword,
    capsLockOn,
    fieldRefs,
    onChange,
    onBlur,
    onPasswordKey,
    onSubmit,
    formAlert,
    showErrorState,
    isFormValid,
    passwordStrength,
    strengthLabel,
    strengthColor,
  } = useRegisterForm({
    handleRegister,
    error,
    onSuccess: () => navigate('/game'),
  });

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

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,213,94,0.25),rgba(246,213,94,0))] blur-2xl" />
        <div className="absolute -bottom-24 right-12 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.2),rgba(148,163,184,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_55%)]" />
      </div>
      <div className="relative w-full max-w-md p-8 rounded-[var(--radius-lg)] bg-[var(--color-panel)] shadow-lg border border-[var(--color-border)]">
        <img src="/LOGO/Logo_gauche.png" alt="Valorith" className="w-44 mx-auto mb-6" />
        <h1 className="text-2xl font-heading text-center mb-6">Inscription</h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <FormField
            id="register-username"
            label="Pseudo"
            name="username"
            placeholder="Pseudo"
            value={form.username}
            onChange={onChange}
            onBlur={onBlur}
            disabled={loading}
            required
            minLength={3}
            maxLength={20}
            touched={touched.username}
            error={fieldErrors.username}
            showCheck={touched.username && !fieldErrors.username && form.username}
            inputRef={fieldRefs.username}
            icon={<UserIcon />}
          />
          <FormField
            id="register-email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            onBlur={onBlur}
            disabled={loading}
            required
            touched={touched.email}
            error={fieldErrors.email}
            showCheck={touched.email && !fieldErrors.email && form.email}
            inputRef={fieldRefs.email}
            icon={<MailIcon />}
          />
          <div className="space-y-2">
            <PasswordField
              id="register-password"
              label="Mot de passe"
              name="password"
              autoComplete="new-password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={onChange}
              onBlur={onBlur}
              onKeyUp={onPasswordKey}
              onKeyDown={onPasswordKey}
              disabled={loading}
              required
              minLength={8}
              touched={touched.password}
              error={fieldErrors.password}
              showCheck={touched.password && !fieldErrors.password && form.password}
              inputRef={fieldRefs.password}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword((value) => !value)}
            />
            {capsLockOn && (
              <p className="mt-2 text-xs text-[var(--color-gold-strong)]">
                Verrouillage majuscule actif.
              </p>
            )}
            <PasswordStrength
              strength={passwordStrength}
              label={strengthLabel}
              color={strengthColor}
            />
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              8 caracteres minimum, avec une majuscule, une minuscule et un chiffre.
            </p>
          </div>
          <div className="space-y-2">
            <PasswordField
              id="register-confirm-password"
              label="Confirmer le mot de passe"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirmer le mot de passe"
              value={form.confirmPassword}
              onChange={onChange}
              onBlur={onBlur}
              onKeyUp={onPasswordKey}
              onKeyDown={onPasswordKey}
              disabled={loading}
              required
              minLength={8}
              touched={touched.confirmPassword}
              error={fieldErrors.confirmPassword}
              showCheck={touched.confirmPassword && !fieldErrors.confirmPassword && form.confirmPassword}
              inputRef={fieldRefs.confirmPassword}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword((value) => !value)}
              showToggle={false}
              checkClassName="right-3"
            />
            {touched.confirmPassword && !fieldErrors.confirmPassword && form.confirmPassword && (
              <p className="mt-2 text-xs text-emerald-300" aria-live="polite">
                OK, les mots de passe correspondent.
              </p>
            )}
          </div>
          <FormAlert message={formAlert} />
          <button
            className={`w-full rounded-[var(--radius-md)] p-3 font-semibold ${
              showErrorState
                ? 'border border-red-500/50 bg-red-500/15 text-red-100 hover:bg-red-500/20 active:scale-[0.99]'
                : 'bg-[var(--color-gold)] text-black hover:brightness-110 hover:shadow-[0_0_12px_rgba(246,213,94,0.35)] active:scale-[0.99]'
            } disabled:cursor-not-allowed disabled:opacity-60`}
            disabled={loading || !isFormValid}
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
          <p className="text-center text-sm text-[var(--color-muted)]">
            Deja un compte ?{' '}
            <Link
              to="/login"
              className="font-semibold text-[var(--color-gold)] hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
