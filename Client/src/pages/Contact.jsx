import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createSupportTicket } from '../services/supportService.js';
import { useMe } from '../hooks/useMe.js';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'support',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const errorRef = useRef(null);
  const { data: me } = useMe();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (!me) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || me.username || '',
      email: prev.email || me.email || ''
    }));
  }, [me]);
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [error]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setEmailError('Email invalide.');
        return;
      }
      setLoading(true);
      setError('');
      setEmailError('');
      setNotice('');

      const payload = {
        user_id: me?.id ?? null,
        username: me?.username || form.name || null,
        email: me?.email || form.email || null,
        category: form.topic,
        subject: form.subject || null,
        message: form.message
      };

      const result = await createSupportTicket(payload);
      const ticketId = result?.id ? ` #${result.id}` : '';
      setNotice(`Ticket ${ticketId} envoyé. On revient vers toi rapidement.`);
      setForm({
        name: '',
        email: '',
        topic: 'support',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      {notice && (
        <div
          className="fixed left-4 right-4 top-[max(1rem,env(safe-area-inset-top))] z-50 w-[min(420px,calc(100%-2rem))] rounded-[var(--radius-md)] border border-[var(--color-gold)]/80 bg-emerald-500/20 px-4 py-3 text-sm text-[var(--color-text)] shadow-lg backdrop-blur sm:left-auto sm:right-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/20 text-emerald-200">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span>{notice}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotice('')}
              className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)]"
              aria-label="Fermer la notification"
            >
              x
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="text-sm text-[var(--color-muted)]">Accueil / Contact</p>

        <h1 className="mt-4 text-4xl font-heading">Contact & Support</h1>
        <p className="mt-3 text-[var(--color-text)] opacity-80">
          Une question sur le jeu, un bug, ou un compte bloqué ? Laisse-nous un message.
        </p>
        {error && (
          <div
            ref={errorRef}
            className="mt-4 rounded-[var(--radius-md)] border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="order-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 lg:order-none"
            onSubmit={handleSubmit}
            aria-busy={loading}
          >
            <div className="grid gap-3 sm:gap-4">
              <label className="text-sm">
                <span className="text-[var(--color-text)] opacity-80">Nom</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-3 text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:py-2"
                />
              </label>

              <label className="text-sm">
                <span className="text-[var(--color-text)] opacity-80">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => {
                    updateField(event);
                    if (emailError) {
                      setEmailError('');
                    }
                  }}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-3 text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:py-2"
                  required={!me?.id}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'contact-email-error' : undefined}
                />
                {emailError && (
                  <p
                    id="contact-email-error"
                    className="mt-2 text-sm text-red-400"
                    aria-live="polite"
                  >
                    {emailError}
                  </p>
                )}
              </label>

              <label className="text-sm">
                <span className="text-[var(--color-text)] opacity-80">Catégorie</span>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={updateField}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-3 text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:py-2"
                >
                  <option value="support">Support</option>
                  <option value="bug">Signaler un bug</option>
                  <option value="feedback">Suggestion</option>
                  <option value="account">Compte</option>
                </select>
              </label>

              <label className="text-sm">
                <span className="text-[var(--color-text)] opacity-80">Objet</span>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={updateField}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-3 text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:py-2"
                />
              </label>

              <label className="text-sm">
                <span className="text-[var(--color-text)] opacity-80">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={updateField}
                  className="mt-2 w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-3 text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:py-2"
                  required
                  maxLength={500}
                />
                <div className="mt-2 text-xs text-[var(--color-muted)]">
                  {form.message.length}/500 caractères
                </div>
              </label>

              <button
                type="submit"
                disabled={loading || !form.message.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                )}
                {loading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </form>

          <aside className="order-1 space-y-3 sm:space-y-4 lg:order-none lg:mb-0 mb-2">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-5">
              <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">RESSOURCES</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-text)] opacity-80">
                <li>
                  <Link to="/faq" className="hover:text-[var(--color-text)]">
                    Lire la FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[var(--color-text)]">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[var(--color-text)]">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>

            <div className="h-px w-full bg-[var(--color-border)]/50" />

            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-5">
              <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">DÉLAI</p>
              <p className="mt-3 text-sm text-[var(--color-text)] opacity-80">
                Réponse sous 48h en moyenne.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}



