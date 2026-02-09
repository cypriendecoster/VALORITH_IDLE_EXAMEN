export function normalizeError(err) {
  const message = err?.message || '';
  if (message) return message;
  return 'Une erreur est survenue.';
}
