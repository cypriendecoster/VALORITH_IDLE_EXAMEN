import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequireAuth } from '../hooks/useRequireAuth.js';
import {
  getAdminTables,
  getAdminTableSchema,
  listAdminRows,
  createAdminRow,
  updateAdminRow,
  deleteAdminRow
} from '../services/adminService.js';
import { formatDateTime } from '../utils/format.js';

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
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const tableLabels = useMemo(
    () => ({
      users: 'Utilisateurs',
      realms: 'Royaumes'
    }),
    []
  );
  const hiddenColumns = useMemo(
    () => ({
      users: new Set(['password_hash'])
    }),
    []
  );

  useRequireAuth({ role: 'ADMIN', redirectTo: '/login', unauthorizedTo: '/game' });

  useEffect(() => {
    async function loadTables() {
      try {
        setLoading(true);
        const data = await getAdminTables();
        const allowed = data.filter((t) => {
          const name = String(t || '').toLowerCase();
          return name === 'users' || name === 'realms';
        });
        setTables(allowed);
      } catch (err) {
        setError(err.message || 'Erreur');
      } finally {
        setLoading(false);
      }
    }
    loadTables();
  }, []);

  useEffect(() => {
    if (tables.length === 0) return;
    const paramTable = new URLSearchParams(location.search).get('table');
    if (paramTable && tables.includes(paramTable) && paramTable !== selectedTable) {
      setSelectedTable(paramTable);
      return;
    }
    if (!selectedTable) {
      setSelectedTable(tables[0]);
    }
  }, [tables, location.search, selectedTable]);

  useEffect(() => {
    async function loadTableData() {
      if (!selectedTable) return;
      try {
        setLoading(true);
        const schemaData = await getAdminTableSchema(selectedTable);
        const rowData = await listAdminRows(selectedTable);
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

  const columns = useMemo(() => {
    const cols = schema?.columns || [];
    const hidden = hiddenColumns[selectedTable];
    return hidden ? cols.filter((c) => !hidden.has(c.COLUMN_NAME)) : cols;
  }, [schema, hiddenColumns, selectedTable]);
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
      setSaving(true);
      if (columns.length === 0) return;
      const payload = {};
      let hasValue = false;
      for (const col of columns) {
        if (col.EXTRA && col.EXTRA.includes('auto_increment')) continue;
        const name = col.COLUMN_NAME;
        const type = String(col.DATA_TYPE || '').toLowerCase();
        const raw = form[name];
        const isReadonlyDate = ['created_at', 'updated_at', 'last_login_at'].includes(name);
        if (isReadonlyDate) {
          continue;
        }
        if (raw === '' || raw === null || typeof raw === 'undefined') {
          payload[name] = null;
          continue;
        }
        hasValue = true;
        if (['int', 'bigint', 'decimal', 'float', 'double'].includes(type)) {
          payload[name] = Number(raw);
        } else if (['tinyint', 'bit', 'boolean'].includes(type)) {
          payload[name] = raw === '1' || raw === 1 || raw === true ? 1 : 0;
        } else {
          payload[name] = raw;
        }
      }
      if (!hasValue) {
        setError('Veuillez remplir au moins un champ.');
        return;
      }
      if (editingId) {
        await updateAdminRow(selectedTable, editingId, payload);
      } else {
        await createAdminRow(selectedTable, payload);
      }
      const rowData = await listAdminRows(selectedTable);
      setRows(rowData || []);
      setEditingId(null);
      setForm(buildInitialForm(columns));
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(rowId) {
    try {
      const confirmed = window.confirm('Supprimer cette ligne ?');
      if (!confirmed) {
        return;
      }
      setError('');
      setDeletingId(rowId);
      await deleteAdminRow(selectedTable, rowId);
      const rowData = await listAdminRows(selectedTable);
      setRows(rowData || []);
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-heading">Admin</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Gestion complète des tables.
        </p>

        {loading && (
          <p className="mt-3 text-sm text-[var(--color-muted)]" aria-live="polite">
            Chargement...
          </p>
        )}
        {error && (
          <p className="mt-3 text-sm text-red-400" aria-live="polite">
            {error}
          </p>
        )}

        {!loading && (
          <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
            <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-4">
              <h2 className="text-sm font-heading">Tables</h2>
              <div className="mt-3 grid gap-2 text-sm text-[var(--color-muted)]">
                {tables.map((t) => (
                  <button
                    key={t}
                    className={`text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 ${t === selectedTable ? 'text-[var(--color-text)]' : ''}`}
                    onClick={() => {
                      setSelectedTable(t);
                      navigate(`/admin?table=${encodeURIComponent(t)}`);
                    }}
                  >
                    {tableLabels[t] || t}
                  </button>
                ))}
              </div>
            </section>

            <section className="md:col-span-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-heading">
                  {tableLabels[selectedTable] || selectedTable || 'Table'}
                </h2>
                <div className="text-xs text-[var(--color-muted)]">
                  Toutes les lignes
                </div>
              </div>

              {schema && (
                <form className="mt-4 grid gap-3" onSubmit={onSave}>
                  {columns
                    .filter((col) => {
                      const isAuto = col.EXTRA && col.EXTRA.includes('auto_increment');
                      const isDate = ['created_at', 'updated_at', 'last_login_at'].includes(col.COLUMN_NAME);
                      if (!editingId && (isAuto || isDate)) return false;
                      return true;
                    })
                    .map((col) => {
                    const name = col.COLUMN_NAME;
                    const isPk = name === pkColumn;
                    const isAuto = col.EXTRA && col.EXTRA.includes('auto_increment');
                    const isReadonlyDate = ['created_at', 'updated_at', 'last_login_at'].includes(name);
                    const disabled = isPk && editingId ? true : isAuto || isReadonlyDate;
                    const isRoleField = selectedTable === 'users' && name === 'role';
                    const isRealmToggle = selectedTable === 'realms' && name === 'is_default_unlocked';
                    const isRealmMultiplier =
                      selectedTable === 'realms' &&
                      (name === 'cost_multiplier' || name === 'production_multiplier');
                    const isDescriptionField = name === 'description';
                    const isRealmCode = selectedTable === 'realms' && name === 'code';
                    return (
                      <label key={name} className="grid gap-1 text-xs text-[var(--color-muted)]">
                        <span>{name}</span>
                        {isRoleField ? (
                          <select
                            className="input-base w-full"
                            value={form[name] ?? 'PLAYER'}
                            disabled={disabled}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, [name]: e.target.value }))
                            }
                          >
                            <option value="PLAYER">PLAYER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        ) : isRealmToggle ? (
                          <label className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                            <input
                              type="checkbox"
                              className="h-4 w-4 accent-[var(--color-gold)]"
                              checked={Boolean(Number(form[name] ?? 0))}
                              disabled={disabled}
                              onChange={(e) =>
                                setForm((prev) => ({ ...prev, [name]: e.target.checked ? 1 : 0 }))
                              }
                            />
                            {Number(form[name] ?? 0) ? 'Débloqué par défaut' : 'Non débloqué'}
                          </label>
                        ) : isRealmMultiplier ? (
                          <input
                            className="input-base w-full"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form[name] ?? ''}
                            disabled={disabled}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, [name]: e.target.value }))
                            }
                          />
                        ) : isDescriptionField ? (
                          <textarea
                            className="input-base w-full min-h-[90px] resize-y"
                            value={form[name] ?? ''}
                            disabled={disabled}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, [name]: e.target.value }))
                            }
                          />
                        ) : isRealmCode ? (
                          <input
                            className="input-base w-full uppercase"
                            value={form[name] ?? ''}
                            disabled={disabled}
                            onChange={(e) => {
                              const next = e.target.value.toUpperCase().replace(/[^A-Z_]/g, '');
                              setForm((prev) => ({ ...prev, [name]: next }));
                            }}
                          />
                        ) : (
                          <input
                            className="input-base w-full"
                            value={
                              isReadonlyDate
                                ? formatDateTime(form[name])
                                : form[name] ?? ''
                            }
                            disabled={disabled}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, [name]: e.target.value }))
                            }
                          />
                        )}
                      </label>
                    );
                  })}
                  <button
                    className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 disabled:opacity-60"
                    disabled={saving}
                  >
                    {saving ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Créer'}
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
                          className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-text)] hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 disabled:opacity-60"
                          onClick={() => onEdit(row)}
                          disabled={saving}
                        >
                          Modifier
                        </button>
                        <button
                          className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-red-500/40 bg-red-600/10 px-2 py-1 text-xs text-red-100 hover:bg-red-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 disabled:opacity-60"
                          onClick={() => onDelete(row[pkColumn])}
                          disabled={deletingId === row[pkColumn]}
                        >
                          {deletingId === row[pkColumn] ? 'Suppression...' : 'Supprimer'}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 grid gap-2 text-xs text-[var(--color-muted)]">
                      {selectedTable === 'realms' && (
                        <div className="grid gap-1">
                          <p className="text-sm font-heading text-[var(--color-text)]">
                            {row.name || 'Royaume'}
                          </p>
                          <p className="text-xs text-[var(--color-text)]/70">
                            Code: {row.code || 'N/A'}
                          </p>
                        </div>
                      )}
                      {columns
                        .filter((col) =>
                          selectedTable === 'realms'
                            ? !['name', 'code'].includes(col.COLUMN_NAME)
                            : true
                        )
                        .map((col) => {
                          const name = col.COLUMN_NAME;
                          const value = ['created_at', 'updated_at', 'last_login_at'].includes(name)
                            ? formatDateTime(row[name])
                            : String(row[name] ?? '');
                          return (
                            <div key={name} className="grid grid-cols-[140px_1fr] gap-2">
                              <span className="truncate text-[var(--color-text)]/80">{name}</span>
                              <span className="truncate text-right" title={value}>
                                {value}
                              </span>
                            </div>
                          );
                        })}
                    </div>
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
