export default function FormAlert({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="mt-2">
      <p
        className="rounded-[var(--radius-sm)] border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}
