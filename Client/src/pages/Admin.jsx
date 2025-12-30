import { useEffect, useMemo, useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth.js';
import {
  getAdminTables,
  getAdminTableSchema,
  listAdminRows,
  createAdminRow,
  updateAdminRow,
  deleteAdminRow
} from '../services/adminService.js';

function buildInitialForm(columns) {
  const form = {};
  for (const col of columns) {
    if (col.EXTRA && col.EXTRA.includes('auto_increment')) continue;
    form[col.COLUMN_NAME] = col.COLUMN_DEFAULT ?? '';
  }
  return form;
}

export default function Admin() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [schema, setSchema] = useState(null);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useRequireAuth({ role: 'ADMIN', redirectTo: '/login', unauthorizedTo: '/game' });

  useEffect(() => {
    async function loadTables() {
      try {
        setLoading(true);
        const data = await getAdminTables();
        setTables(data);
        if (data.length > 0) {
          setSelectedTable(data[0]);
        }
      } catch (err) {
        setError(err.message || 'Erreur');
      } finally {
        setLoading(false);
      }
    }
    loadTables();
  }, []);

  useEffect(() => {
    async function loadTableData() {
      if (!selectedTable) return;
      try {
        setLoading(true);
        const schemaData = await getAdminTableSchema(selectedTable);
        const rowData = await listAdminRows(selectedTable, 50, 0);
        setSchema(schemaData);
        setRows(rowData || []);
        setForm(buildInitialForm(schemaData.columns));
        setEditingId(null);
      } catch (err) {
        setError(err.message || 'Erreur');
      } finally {
        setLoading(false);
      }
    }
    loadTableData();
  }, [selectedTable]);

  const columns = useMemo(() => schema?.columns || [], [schema]);
  const pkColumn = schema?.pk || 'id';

  function onEdit(row) {
    setEditingId(row[pkColumn]);
    const nextForm = {};
    for (const col of columns) {
      nextForm[col.COLUMN_NAME] = row[col.COLUMN_NAME] ?? '';
    }
    setForm(nextForm);
  }

  async function onSave(e) {
    e.preventDefault();
    try {
      setError('');
      if (editingId) {
        await updateAdminRow(selectedTable, editingId, form);
      } else {
        await createAdminRow(selectedTable, form);
      }
      const rowData = await listAdminRows(selectedTable, 50, 0);
      setRows(rowData || []);
      setEditingId(null);
      setForm(buildInitialForm(columns));
    } catch (err) {
      setError(err.message || 'Erreur');
    }
  }

  async function onDelete(rowId) {
    try {
      setError('');
      await deleteAdminRow(selectedTable, rowId);
      const rowData = await listAdminRows(selectedTable, 50, 0);
      setRows(rowData || []);
    } catch (err) {
      setError(err.message || 'Erreur');
    }
  }

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL.png"
          alt="Valorith"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-heading">Admin</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Gestion complete des tables.
        </p>

        {loading && <p className="mt-3 text-sm text-[var(--color-muted)]">Chargement...</p>}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        {!loading && (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-4">
              <h2 className="text-sm font-heading">Tables</h2>
              <div className="mt-3 grid gap-2 text-sm text-[var(--color-muted)]">
                {tables.map((t) => (
                  <button
                    key={t}
                    className={`text-left ${t === selectedTable ? 'text-[var(--color-text)]' : ''}`}
                    onClick={() => setSelectedTable(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <section className="md:col-span-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-4">
              <h2 className="text-sm font-heading">
                {selectedTable || 'Table'}
              </h2>

              {schema && (
                <form className="mt-4 grid gap-3" onSubmit={onSave}>
                  {columns.map((col) => {
                    const name = col.COLUMN_NAME;
                    const isPk = name === pkColumn;
                    const isAuto = col.EXTRA && col.EXTRA.includes('auto_increment');
                    const disabled = isPk && editingId ? true : isAuto;
                    return (
                      <label key={name} className="grid gap-1 text-xs text-[var(--color-muted)]">
                        <span>{name}</span>
                        <input
                          className="input-base w-full"
                          value={form[name] ?? ''}
                          disabled={disabled}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, [name]: e.target.value }))
                          }
                        />
                      </label>
                    );
                  })}
                  <button
                    className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
                  >
                    {editingId ? 'Mettre a jour' : 'Creer'}
                  </button>
                </form>
              )}

              <div className="mt-6 grid gap-2 text-xs text-[var(--color-muted)]">
                {rows.length === 0 && <p>Aucune ligne.</p>}
                {rows.map((row) => (
                  <div
                    key={row[pkColumn]}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-2"
                  >
                    <div className="flex items-center justify-between">
                      <span>{pkColumn}: {row[pkColumn]}</span>
                      <div className="flex gap-2">
                        <button
                          className="text-[var(--color-muted)]"
                          onClick={() => onEdit(row)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-400"
                          onClick={() => onDelete(row[pkColumn])}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <pre className="mt-2 overflow-x-auto text-[10px] text-[var(--color-muted)]">
                      {JSON.stringify(row, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
