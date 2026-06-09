import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// ── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const IcoCards      = () => <Icon d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M16 2v4M8 2v4M3 10h7m7 10v-3m0 0V14m0 3h3m-3 0h-3" />;
const IcoNews       = () => <Icon d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0-2-2V8a2 2 0 0 1 2-2h2M11 6h6M11 10h6M11 14h4" />;
const IcoTrophy     = () => <Icon d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z" />;
const IcoLogout     = () => <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />;
const IcoPlus       = () => <Icon d="M12 5v14M5 12h14" />;
const IcoEdit       = () => <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />;
const IcoTrash      = () => <Icon d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />;
const IcoX          = () => <Icon d="M18 6 6 18M6 6l12 12" />;
const IcoCheck      = () => <Icon d="M20 6 9 17l-5-5" />;
const IcoEye        = () => <Icon d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
const IcoEyeOff     = () => <Icon d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />;

// ── RARITY OPTIONS ───────────────────────────────────────────────────────────
const RARITIES = ['Común', 'Poco Común', 'Rara', 'Doble Rara', 'Ultra Rara', 'Ilustración Rara', 'Especial Ilustración Rara', 'Ultra Rara Secreta', 'Secreta Dorada', 'Hyper Rara'];
const ERAS = ['Escarlata y Púrpura', 'Espada y Escudo', 'SM - Sol y Luna', 'XY', 'Black & White', 'Otras'];
const CONDITIONS = ['NM', 'LP', 'MP', 'HP', 'DMG'];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const today = () => new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

// ============================================================
// MODAL BASE
// ============================================================
function Modal({ title, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
            <IcoX />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ── FORM FIELD COMPONENTS ─────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0052FF]/60 focus:bg-white/8 transition-all";
const selectCls = "w-full bg-[#1a1d26] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#0052FF]/60 transition-all";

// ============================================================
// NOTIFICATION TOAST
// ============================================================
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border text-sm font-semibold transition-all
      ${type === 'success' ? 'bg-green-900/90 border-green-500/40 text-green-300' : 'bg-red-900/90 border-red-500/40 text-red-300'}`}>
      {type === 'success' ? <IcoCheck /> : <IcoX />}
      {message}
    </div>
  );
}

// ============================================================
// DELETE CONFIRM MODAL
// ============================================================
function DeleteConfirm({ item, label, onConfirm, onClose }) {
  return (
    <Modal title="Confirmar eliminación" onClose={onClose}>
      <p className="text-slate-300 mb-6">¿Estás seguro de que quieres eliminar <span className="text-white font-semibold">"{label}"</span>? Esta acción no se puede deshacer.</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-all">Cancelar</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all">Eliminar</button>
      </div>
    </Modal>
  );
}

// ============================================================
// CARDS ADMIN SECTION
// ============================================================
function AdminCards({ toast }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const emptyForm = { name: '', set: 'Escarlata y Púrpura', set_code: '', rarity: 'Rara', price: '', condition: 'NM', image: '', description: '', in_stock: true };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('cards').select('*').order('created_at', { ascending: false });
    setCards(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditingCard(null); setShowForm(true); };
  const openEdit = (card) => { setForm({ ...card }); setEditingCard(card); setShowForm(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, price: parseInt(form.price) || 0 };
    let error;
    if (editingCard) {
      ({ error } = await supabase.from('cards').update(payload).eq('id', editingCard.id));
    } else {
      ({ error } = await supabase.from('cards').insert([payload]));
    }
    setSaving(false);
    if (error) { toast('Error: ' + error.message, 'error'); return; }
    toast(editingCard ? 'Carta actualizada ✓' : 'Carta agregada ✓', 'success');
    setShowForm(false);
    load();
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('cards').delete().eq('id', deleteTarget.id);
    if (error) { toast('Error al eliminar: ' + error.message, 'error'); }
    else { toast('Carta eliminada ✓', 'success'); load(); }
    setDeleteTarget(null);
  };

  const toggleStock = async (card) => {
    await supabase.from('cards').update({ in_stock: !card.in_stock }).eq('id', card.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Cartas en Stock</h1>
          <p className="text-slate-400 text-sm mt-1">{cards.length} cartas registradas</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0052FF] hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-900/30">
          <IcoPlus /> Nueva Carta
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-slate-500">Cargando cartas...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/8">
                {['Imagen','Nombre','Set','Rareza','Precio','Condición','En Stock','Acciones'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {cards.map(card => (
                <tr key={card.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <img src={card.image} alt={card.name} className="w-10 h-14 object-cover rounded-lg" onError={e => e.target.style.display='none'} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-white max-w-[160px] truncate">{card.name}</td>
                  <td className="px-4 py-3 text-slate-400 max-w-[140px] truncate">{card.set}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs max-w-[140px] truncate">{card.rarity}</td>
                  <td className="px-4 py-3 text-green-400 font-bold whitespace-nowrap">${(card.price || 0).toLocaleString('es-CL')}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-900/40 text-blue-300 text-xs rounded-lg font-bold">{card.condition}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStock(card)} className={`w-10 h-5 rounded-full transition-all ${card.in_stock ? 'bg-green-500' : 'bg-slate-600'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${card.in_stock ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(card)} className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all"><IcoEdit /></button>
                      <button onClick={() => setDeleteTarget(card)} className="p-2 rounded-lg bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 transition-all"><IcoTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cards.length === 0 && <div className="text-center py-16 text-slate-500">No hay cartas registradas aún.</div>}
        </div>
      )}

      {showForm && (
        <Modal title={editingCard ? 'Editar Carta' : 'Nueva Carta'} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Field label="Nombre"><input className={inputCls} required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ej: Charizard ex" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Era / Set">
                <select className={selectCls} value={form.set} onChange={e => setForm({...form, set: e.target.value})}>
                  {ERAS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </Field>
              <Field label="Código de Set"><input className={inputCls} value={form.set_code} onChange={e => setForm({...form, set_code: e.target.value})} placeholder="Ej: sv4f" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Rareza">
                <select className={selectCls} value={form.rarity} onChange={e => setForm({...form, rarity: e.target.value})}>
                  {RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Condición">
                <select className={selectCls} value={form.condition} onChange={e => setForm({...form, condition: e.target.value})}>
                  {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Precio (CLP)"><input className={inputCls} type="number" required min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Ej: 89990" /></Field>
            <Field label="URL de Imagen"><input className={inputCls} value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://images.pokemontcg.io/..." /></Field>
            {form.image && <img src={form.image} alt="preview" className="w-20 h-28 object-contain rounded-xl border border-white/10 mx-auto" />}
            <Field label="Descripción"><textarea className={`${inputCls} resize-none`} rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Descripción de la carta..." /></Field>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className={`w-11 h-6 rounded-full transition-all ${form.in_stock ? 'bg-[#0052FF]' : 'bg-slate-600'}`} onClick={() => setForm({...form, in_stock: !form.in_stock})}>
                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${form.in_stock ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-slate-300">{form.in_stock ? 'Visible en catálogo' : 'Oculta del catálogo'}</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-all">Cancelar</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-[#0052FF] hover:bg-blue-500 text-white text-sm font-semibold transition-all disabled:opacity-50">
                {saving ? 'Guardando...' : editingCard ? 'Guardar cambios' : 'Agregar carta'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <DeleteConfirm label={deleteTarget.name} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

// ============================================================
// NEWS ADMIN SECTION
// ============================================================
function AdminNews({ toast }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const emptyForm = { title: '', date: today(), summary: '', content: '', image: '', published: true };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    setNews(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({...emptyForm, date: today()}); setEditingItem(null); setShowForm(true); };
  const openEdit = (item) => { setForm({ ...item }); setEditingItem(item); setShowForm(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    let error;
    if (editingItem) {
      ({ error } = await supabase.from('news').update(form).eq('id', editingItem.id));
    } else {
      ({ error } = await supabase.from('news').insert([form]));
    }
    setSaving(false);
    if (error) { toast('Error: ' + error.message, 'error'); return; }
    toast(editingItem ? 'Noticia actualizada ✓' : 'Noticia publicada ✓', 'success');
    setShowForm(false);
    load();
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('news').delete().eq('id', deleteTarget.id);
    if (error) { toast('Error: ' + error.message, 'error'); }
    else { toast('Noticia eliminada ✓', 'success'); load(); }
    setDeleteTarget(null);
  };

  const togglePublish = async (item) => {
    await supabase.from('news').update({ published: !item.published }).eq('id', item.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Noticias</h1>
          <p className="text-slate-400 text-sm mt-1">{news.length} artículos registrados</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0052FF] hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-900/30">
          <IcoPlus /> Nueva Noticia
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-slate-500">Cargando noticias...</div>
      ) : (
        <div className="space-y-3">
          {news.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-2xl p-4 hover:bg-white/5 transition-all">
              {item.image && <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded-xl flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white truncate">{item.title}</h3>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${item.published ? 'bg-green-900/50 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                    {item.published ? 'Publicada' : 'Borrador'}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">{item.date} · {item.summary?.slice(0,80)}...</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => togglePublish(item)} title={item.published ? 'Ocultar' : 'Publicar'} className="p-2 rounded-lg bg-white/5 hover:bg-yellow-600/20 text-slate-400 hover:text-yellow-400 transition-all">
                  {item.published ? <IcoEyeOff /> : <IcoEye />}
                </button>
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all"><IcoEdit /></button>
                <button onClick={() => setDeleteTarget(item)} className="p-2 rounded-lg bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 transition-all"><IcoTrash /></button>
              </div>
            </div>
          ))}
          {news.length === 0 && <div className="text-center py-16 text-slate-500">No hay noticias registradas aún.</div>}
        </div>
      )}

      {showForm && (
        <Modal title={editingItem ? 'Editar Noticia' : 'Nueva Noticia'} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Field label="Título"><input className={inputCls} required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Título de la noticia" /></Field>
            <Field label="Fecha"><input className={inputCls} value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="10 de Mayo, 2026" /></Field>
            <Field label="Resumen"><input className={inputCls} required value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} placeholder="Descripción breve..." /></Field>
            <Field label="Contenido completo"><textarea className={`${inputCls} resize-none`} rows={5} required value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Texto completo de la noticia..." /></Field>
            <Field label="URL de Imagen"><input className={inputCls} value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://images.unsplash.com/..." /></Field>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className={`w-11 h-6 rounded-full transition-all ${form.published ? 'bg-[#0052FF]' : 'bg-slate-600'}`} onClick={() => setForm({...form, published: !form.published})}>
                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${form.published ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-slate-300">{form.published ? 'Publicada' : 'Guardar como borrador'}</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-all">Cancelar</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-[#0052FF] hover:bg-blue-500 text-white text-sm font-semibold transition-all disabled:opacity-50">
                {saving ? 'Guardando...' : editingItem ? 'Guardar cambios' : 'Publicar'}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {deleteTarget && <DeleteConfirm label={deleteTarget.title} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />}
    </div>
  );
}

// ============================================================
// TOURNAMENTS ADMIN SECTION
// ============================================================
function AdminTournaments({ toast }) {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const emptyForm = { day: '', month: 'ENE', title: '', format: 'Estándar', location: 'Concepción, Chile', time: '15:00 hrs', entry_fee: '$5.000', status: 'Inscripciones Abiertas' };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const MONTHS = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  const FORMATS = ['Estándar', 'Expandido', 'Libre', 'Draft'];
  const STATUSES = ['Inscripciones Abiertas', 'Próximamente', 'Lleno', 'Finalizado'];

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('tournaments').select('*').order('created_at', { ascending: true });
    setTournaments(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditingItem(null); setShowForm(true); };
  const openEdit = (item) => { setForm({ ...item }); setEditingItem(item); setShowForm(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    let error;
    if (editingItem) {
      ({ error } = await supabase.from('tournaments').update(form).eq('id', editingItem.id));
    } else {
      ({ error } = await supabase.from('tournaments').insert([form]));
    }
    setSaving(false);
    if (error) { toast('Error: ' + error.message, 'error'); return; }
    toast(editingItem ? 'Torneo actualizado ✓' : 'Torneo creado ✓', 'success');
    setShowForm(false);
    load();
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('tournaments').delete().eq('id', deleteTarget.id);
    if (error) { toast('Error: ' + error.message, 'error'); }
    else { toast('Torneo eliminado ✓', 'success'); load(); }
    setDeleteTarget(null);
  };

  const statusColor = (s) => {
    if (s === 'Inscripciones Abiertas') return 'bg-green-900/50 text-green-400';
    if (s === 'Próximamente') return 'bg-yellow-900/50 text-yellow-400';
    if (s === 'Lleno') return 'bg-red-900/50 text-red-400';
    return 'bg-slate-700 text-slate-400';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Torneos</h1>
          <p className="text-slate-400 text-sm mt-1">{tournaments.length} torneos registrados</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0052FF] hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-900/30">
          <IcoPlus /> Nuevo Torneo
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-slate-500">Cargando torneos...</div>
      ) : (
        <div className="space-y-3">
          {tournaments.map(t => (
            <div key={t.id} className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-2xl p-4 hover:bg-white/5 transition-all">
              <div className="w-14 h-14 rounded-xl bg-[#0052FF]/10 border border-[#0052FF]/30 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xl font-black text-white leading-none">{t.day}</span>
                <span className="text-[10px] font-bold text-[#0052FF] uppercase">{t.month}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-white">{t.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor(t.status)}`}>{t.status}</span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">{t.format} · {t.location} · {t.time} · {t.entry_fee}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(t)} className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all"><IcoEdit /></button>
                <button onClick={() => setDeleteTarget(t)} className="p-2 rounded-lg bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 transition-all"><IcoTrash /></button>
              </div>
            </div>
          ))}
          {tournaments.length === 0 && <div className="text-center py-16 text-slate-500">No hay torneos registrados aún.</div>}
        </div>
      )}

      {showForm && (
        <Modal title={editingItem ? 'Editar Torneo' : 'Nuevo Torneo'} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Día"><input className={inputCls} required value={form.day} onChange={e => setForm({...form, day: e.target.value})} placeholder="Ej: 25" maxLength={2} /></Field>
              <Field label="Mes">
                <select className={selectCls} value={form.month} onChange={e => setForm({...form, month: e.target.value})}>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Nombre del Torneo"><input className={inputCls} required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Ej: Copa CardPoint" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Formato">
                <select className={selectCls} value={form.format} onChange={e => setForm({...form, format: e.target.value})}>
                  {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </Field>
              <Field label="Horario"><input className={inputCls} value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="15:00 hrs" /></Field>
            </div>
            <Field label="Ubicación"><input className={inputCls} value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Concepción, Chile" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Inscripción"><input className={inputCls} value={form.entry_fee} onChange={e => setForm({...form, entry_fee: e.target.value})} placeholder="$5.000" /></Field>
              <Field label="Estado">
                <select className={selectCls} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-all">Cancelar</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-[#0052FF] hover:bg-blue-500 text-white text-sm font-semibold transition-all disabled:opacity-50">
                {saving ? 'Guardando...' : editingItem ? 'Guardar cambios' : 'Crear torneo'}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {deleteTarget && <DeleteConfirm label={deleteTarget.title} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />}
    </div>
  );
}

// ============================================================
// LOGIN PAGE
// ============================================================
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError('Credenciales incorrectas. Verifica tu email y contraseña.'); return; }
    onLogin(data.session);
  };

  return (
    <div className="min-h-screen bg-[#080a10] flex items-center justify-center p-4" style={{
      backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(0,82,255,0.12) 0%, transparent 70%)'
    }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center">
            <div className="flex items-center font-black text-3xl tracking-tight mb-1">
              <span className="text-white">CARD</span>
              <span className="text-[#0052FF]">POINT</span>
              <span className="text-white">.CL</span>
            </div>
            <span className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">Panel de Administración</span>
          </div>
        </div>

        <div className="bg-white/3 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-1">Iniciar sesión</h2>
          <p className="text-slate-500 text-sm mb-6">Ingresa tus credenciales de administrador</p>

          {error && (
            <div className="bg-red-900/30 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Email">
              <input
                className={inputCls}
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@cardpoint.cl"
                autoComplete="email"
              />
            </Field>
            <Field label="Contraseña">
              <div className="relative">
                <input
                  className={`${inputCls} pr-10`}
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <IcoEyeOff /> : <IcoEye />}
                </button>
              </div>
            </Field>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0052FF] hover:bg-blue-500 text-white font-bold rounded-xl transition-all mt-2 disabled:opacity-60 shadow-lg shadow-blue-900/30"
            >
              {loading ? 'Iniciando sesión...' : 'Entrar al panel'}
            </button>
          </form>
        </div>
        <p className="text-center text-slate-600 text-xs mt-6">
          ¿No tienes acceso? Contacta al administrador del sistema.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// MAIN ADMIN APP
// ============================================================
export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [activeSection, setActiveSection] = useState('cards');
  const [toast, setToastState] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const showToast = (message, type = 'success') => {
    setToastState({ message, type, key: Date.now() });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#080a10] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <AdminLogin onLogin={setSession} />;

  const navItems = [
    { id: 'cards', label: 'Cartas', icon: <IcoCards /> },
    { id: 'news', label: 'Noticias', icon: <IcoNews /> },
    { id: 'tournaments', label: 'Torneos', icon: <IcoTrophy /> },
  ];

  return (
    <div className="min-h-screen bg-[#080a10] text-white font-sans flex" style={{
      backgroundImage: 'radial-gradient(ellipse at 0% 0%, rgba(0,82,255,0.06) 0%, transparent 50%)'
    }}>
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0c0e16] border-r border-white/8 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0052FF] flex items-center justify-center font-black text-white text-sm">CP</div>
            <div>
              <div className="font-black text-white text-sm leading-tight">CardPoint Admin</div>
              <div className="text-slate-500 text-[10px]">{session.user.email}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                ${activeSection === item.id
                  ? 'bg-[#0052FF]/15 text-[#4d8aff] border border-[#0052FF]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/8 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
            </svg>
            Ver sitio público
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-900/10 transition-all"
          >
            <IcoLogout /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/8 flex items-center gap-4 px-6 bg-[#080a10]/80 backdrop-blur-sm sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-slate-300 capitalize">{navItems.find(n => n.id === activeSection)?.label}</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#0052FF]/20 border border-[#0052FF]/30 flex items-center justify-center text-[#4d8aff] text-xs font-black">
            {session.user.email?.[0]?.toUpperCase()}
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          {activeSection === 'cards'       && <AdminCards toast={showToast} />}
          {activeSection === 'news'        && <AdminNews toast={showToast} />}
          {activeSection === 'tournaments' && <AdminTournaments toast={showToast} />}
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToastState(null)} />
      )}
    </div>
  );
}
