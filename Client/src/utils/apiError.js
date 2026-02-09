export function buildApiError(error, fallbackMessage = 'Une erreur est survenue.') {
  const message = error?.response?.data?.message || fallbackMessage;
  const code = error?.response?.data?.code || null;
  const err = new Error(message);
  if (code) {
    err.code = code;
  }
  return err;
}
