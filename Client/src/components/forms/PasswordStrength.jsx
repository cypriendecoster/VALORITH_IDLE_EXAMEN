export default function PasswordStrength({ strength, label, color }) {
  return (
    <div className="mt-3">
      <div className="h-1.5 w-full rounded-full bg-black/40">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{
            width: `${(strength / 4) * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <p className="mt-2 text-xs text-[var(--color-muted)]">Force: {label}</p>
    </div>
  );
}
