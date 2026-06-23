import React, { useState } from 'react';
import { Settings, EyeOff, Eye, Plus, Edit2, Trash2, LogOut, Lock } from 'lucide-react';

export default function AdminPanel({ 
  newsList, 
  hiddenNewsIds, 
  toggleHideNews, 
  tournaments, 
  localTournaments,
  updateLocalTournament,
  customBanners,
  updateCustomBanners,
  onLogout 
}) {
  const [activeTab, setActiveTab] = useState('news');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'cardpoint2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white dark:bg-[#121824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-[#0052FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Panel Privado</h2>
          <p className="text-sm text-slate-500 mb-6">Ingresa tu contraseña maestra para acceder al panel de control.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0052FF] transition-colors text-center font-bold tracking-widest"
              />
              {error && <p className="text-red-500 text-xs font-bold mt-2">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-[#0052FF] hover:bg-blue-700 text-white font-black rounded-xl transition-colors shadow-lg shadow-blue-500/30"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Combinar torneos de Supabase con los modificados localmente
  const displayTournaments = tournaments.map(t => {
    const local = localTournaments.find(lt => lt.id === t.id);
    return local ? { ...t, ...local } : t;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 py-8 px-4 animate-fade-in">
      
      {/* Sidebar Admin */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-[#121824] rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sticky top-32">
          <div className="px-4 py-3 mb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-black text-slate-900 dark:text-white text-lg">Admin Dashboard</h3>
            <span className="text-xs font-bold text-green-500">Conectado</span>
          </div>
          
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'news' ? 'bg-[#0052FF] text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Settings size={18} />
              Gestión de Noticias
            </button>
            <button 
              onClick={() => setActiveTab('tournaments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'tournaments' ? 'bg-[#0052FF] text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Edit2 size={18} />
              Gestión de Torneos
            </button>
            <button 
              onClick={() => setActiveTab('banners')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'banners' ? 'bg-[#0052FF] text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Settings size={18} />
              Banners Principales
            </button>
          </nav>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                setPassword('');
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Admin */}
      <div className="flex-grow bg-white dark:bg-[#121824] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 min-h-[600px]">
        
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Gestión de Noticias</h2>
                <p className="text-sm text-slate-500">Oculta noticias automáticas o añade las tuyas.</p>
              </div>
            </div>

            <div className="space-y-4">
              {newsList.map(news => {
                const isHidden = hiddenNewsIds.includes(news.id);
                return (
                  <div key={news.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${isHidden ? 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60' : 'bg-white dark:bg-[#121824] border-slate-200 dark:border-slate-700 shadow-sm'}`}>
                    <img src={news.image} alt={news.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-grow overflow-hidden">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">{news.title}</h4>
                      <p className="text-xs text-slate-500 truncate">{news.date} • {news.sourceName || 'Cardpoint'}</p>
                    </div>
                    <button 
                      onClick={() => toggleHideNews(news.id)}
                      className={`p-3 rounded-xl flex-shrink-0 transition-colors font-bold text-xs flex items-center gap-2 cursor-pointer ${isHidden ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      {isHidden ? <><Eye size={14} /> Mostrar</> : <><EyeOff size={14} /> Ocultar</>}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Gestión de Torneos</h2>
                <p className="text-sm text-slate-500">Modifica la información de los próximos eventos locales.</p>
              </div>
            </div>

            <div className="space-y-4">
              {displayTournaments.map(t => (
                <div key={t.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121824] space-y-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-lg text-slate-900 dark:text-white">{t.title}</h4>
                      <p className="text-sm text-[#0052FF] font-bold">{t.date} • {t.time}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">Costo de Inscripción</label>
                      <input 
                        type="text" 
                        value={t.entry_fee}
                        onChange={(e) => updateLocalTournament(t.id, { entry_fee: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">Capacidad Total</label>
                      <input 
                        type="text" 
                        value={t.capacity}
                        onChange={(e) => updateLocalTournament(t.id, { capacity: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">Premios / Descripción</label>
                      <textarea 
                        value={t.prizes}
                        onChange={(e) => updateLocalTournament(t.id, { prizes: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#0052FF]"
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Banners Principales</h2>
                <p className="text-sm text-slate-500">Añade o elimina imágenes que se mostrarán en el carrusel de inicio.</p>
              </div>
              <button 
                onClick={() => {
                  const newBanner = { id: Date.now(), type: 'image', imageUrl: 'https://via.placeholder.com/1200x600', linkUrl: '#' };
                  updateCustomBanners([...(customBanners || []), newBanner]);
                }}
                className="px-4 py-2 bg-[#0052FF] text-white font-bold rounded-xl flex items-center gap-2"
              >
                <Plus size={16} /> Añadir Banner
              </button>
            </div>

            <div className="space-y-4">
              {(customBanners || []).map((b, idx) => (
                <div key={b.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121824] space-y-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-lg text-slate-900 dark:text-white">Banner #{idx + 1}</h4>
                    <button 
                      onClick={() => updateCustomBanners(customBanners.filter(cb => cb.id !== b.id))}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">URL de la Imagen</label>
                      <input 
                        type="text" 
                        value={b.imageUrl || ''}
                        onChange={(e) => {
                          const updated = customBanners.map(cb => cb.id === b.id ? { ...cb, imageUrl: e.target.value } : cb);
                          updateCustomBanners(updated);
                        }}
                        placeholder="https://..."
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">Enlace al hacer clic (Opcional)</label>
                      <input 
                        type="text" 
                        value={b.linkUrl || ''}
                        onChange={(e) => {
                          const updated = customBanners.map(cb => cb.id === b.id ? { ...cb, linkUrl: e.target.value } : cb);
                          updateCustomBanners(updated);
                        }}
                        placeholder="https://..."
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!customBanners || customBanners.length === 0) && (
                <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  No hay banners personalizados. Se mostrarán los banners automáticos predeterminados.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
