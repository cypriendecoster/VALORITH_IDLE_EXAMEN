import { useEffect, useState } from 'react';
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError('Email invalide.');
        return;
      }
      setLoading(true);
      setError('');
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
      setNotice(`Ticket envoyé${ticketId}. On revient vers toi rapidement.`);
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
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-[var(--color-muted)]">Accueil / Contact</p>

        <h1 className="mt-4 text-4xl font-heading">Contact & Support</h1>
        <p className="mt-3 text-[var(--color-text)] opacity-80">
          Une question sur le jeu, un bug, ou un compte bloqué ? Laisse-nous un message.
        </p>
        {error && (
          <div
            className="mt-4 rounded-[var(--radius-md)] border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        {notice && (
          <div
            className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-sm text-[var(--color-text)]"
            role="status"
            aria-live="polite"
          >
            {notice}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="order-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6 lg:order-none"
            onSubmit={handleSubmit}
            aria-busy={loading}
          >
            <div className="grid gap-4">
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
                  onChange={updateField}
                  pattern="[^\\s@]+@[^\\s@]+\\.[^\\s@]+"
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-3 text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:py-2"
                  required
                />
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
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                )}
                {loading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </form>

          <aside className="order-1 space-y-4 lg:order-none lg:mb-0 mb-2">
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

            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-black/40 p-5">
              <p className="text-xs tracking-[0.2em] text-[var(--color-gold)]">DELAI</p>
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


