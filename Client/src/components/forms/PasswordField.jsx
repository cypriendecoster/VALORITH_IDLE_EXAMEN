import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon } from './icons.jsx';

export default function PasswordField({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  onKeyUp,
  onKeyDown,
  disabled,
  required,
  minLength,
  autoComplete,
  placeholder,
  touched,
  error,
  showCheck,
  inputRef,
  showPassword,
  onTogglePassword,
  showToggle = true,
  checkClassName = 'right-12',
  describedBy,
}) {
  const showError = touched && Boolean(error);
  const errorId = showError ? `${id}-error` : undefined;
  const describedById = [errorId, describedBy].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
          <LockIcon />
        </span>
        <input
          id={id}
          className="input-base w-full bg-black/40 !pl-10 pr-12 text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 hover:border-[var(--color-gold)]/40 disabled:cursor-not-allowed disabled:opacity-60"
          type={showPassword ? 'text' : 'password'}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          disabled={disabled}
          required={required}
          minLength={minLength}
          ref={inputRef}
          aria-invalid={touched && Boolean(error)}
          aria-describedby={describedById}
        />
        {showCheck && (
          <span
            className={`pointer-events-none absolute ${checkClassName} top-1/2 -translate-y-1/2 text-emerald-300`}
          >
            <CheckIcon />
          </span>
        )}
        {showToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-black/40 p-1.5 text-[var(--color-text)] hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {showError && (
        <p id={errorId} className="mt-2 text-xs text-red-200" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
