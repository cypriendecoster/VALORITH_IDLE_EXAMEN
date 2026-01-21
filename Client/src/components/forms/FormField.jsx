import { CheckIcon } from './icons.jsx';

export default function FormField({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  disabled,
  required,
  minLength,
  maxLength,
  autoComplete,
  placeholder,
  icon,
  touched,
  error,
  showCheck,
  inputRef,
  inputClassName = '',
  checkClassName = 'right-3',
}) {
  const showError = touched && Boolean(error);
  const errorId = showError ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[var(--color-muted)]" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`input-base w-full bg-black/40 !pl-10 text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 hover:border-[var(--color-gold)]/40 disabled:cursor-not-allowed disabled:opacity-60 ${inputClassName}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          ref={inputRef}
          aria-invalid={touched && Boolean(error)}
          aria-describedby={errorId}
        />
        {showCheck && (
          <span
            className={`pointer-events-none absolute ${checkClassName} top-1/2 -translate-y-1/2 text-emerald-300`}
          >
            <CheckIcon />
          </span>
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
