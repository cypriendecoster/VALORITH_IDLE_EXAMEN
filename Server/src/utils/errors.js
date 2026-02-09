// Crée un objet d'erreur standardisé pour l'application
export function createError({ code, message, status = 400, publicMessage }) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  error.publicMessage = publicMessage || message;
  return error;
}

// Transforme une erreur en objet "réponse" prêt pour l'API
export function toResponseError(
  error,
  fallbackMessage = 'Une erreur est survenue.',
  fallbackCode = 'INTERNAL_ERROR'
) {
  const status = typeof (error && error.status) === 'number' ? error.status : 500;

  const code =
    (error && error.code) ||
    (status >= 500 ? fallbackCode : 'BAD_REQUEST');

  const message =
    (error && error.publicMessage) ||
    (status >= 500
      ? fallbackMessage
      : (error && error.message) || fallbackMessage);

  return { status, code, message };
}

