import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function GoogleAdSlot({ format = "horizontal", className = "" }) {
  const [isAdSenseScriptPresent, setIsAdSenseScriptPresent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasScript = document.querySelector('script[src*="adsbygoogle.js"]') || window.adsbygoogle;
      setIsAdSenseScriptPresent(!!hasScript);
      
      if (hasScript) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense initialization error:", e);
        }
      }
    }
  }, []);

  const isPreviewMode = typeof window !== 'undefined' && 
                        (window.location.search.includes('preview-ads') || window.location.hash.includes('preview-ads'));

  if (isAdSenseScriptPresent) {
    return (
      <div className={`ad-slot-container relative overflow-hidden rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 text-center transition-all ${className}`}>
        <span className="absolute top-2 right-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
          Publicidad Patrocinada
        </span>
        <div className="flex items-center justify-center py-2">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', minHeight: format === 'horizontal' ? '90px' : format === 'card' ? '280px' : '250px' }}
               data-ad-client="ca-pub-XXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format={format === "horizontal" ? "auto" : "rectangle"}
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    );
  }

  if (!isPreviewMode) {
    return null;
  }

  return (
    <div className={`ad-slot-container relative overflow-hidden rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 text-center transition-all ${className}`}>
      <span className="absolute top-2 right-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
        Publicidad Patrocinada (Simulada)
      </span>
      
      {format === "horizontal" ? (
        <div className="flex flex-col items-center justify-center min-h-[90px] py-2">
          {/* Simulación del Bloque de Anuncio Leaderboard 728x90 */}
          <div className="w-full max-w-[728px] h-[90px] rounded-lg bg-gradient-to-r from-slate-200/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50 flex flex-col items-center justify-center border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Google AdSense Banner (728x90)</span>
            <p className="text-[10px] text-slate-400 mt-1">Este espacio monetiza la navegación de tus coleccionistas</p>
          </div>
        </div>
      ) : format === "card" ? (
        <div className="flex flex-col items-center justify-center min-h-[280px] h-full p-4 rounded-2xl bg-gradient-to-b from-slate-100/40 to-slate-50/20 dark:from-slate-900/40 dark:to-slate-900/10 border border-slate-200/60 dark:border-slate-800/60 text-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-2">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-400">Anuncio Patrocinado</span>
          <p className="text-[10px] text-slate-400 mt-2 max-w-[160px] mx-auto leading-relaxed">
            Monetiza cada búsqueda. Espacio ideal para patrocinadores del sector TCG.
          </p>
          <div className="mt-4 px-3 py-1.5 bg-blue-500/10 text-[#0052FF] text-[9px] font-bold rounded-lg uppercase tracking-wider">
            Saber Más
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[250px] py-4">
          {/* Simulación de Anuncio Rectangular 300x250 */}
          <div className="w-[280px] h-[250px] rounded-xl bg-gradient-to-b from-slate-200/30 to-slate-100/30 dark:from-slate-800/30 dark:to-slate-900/30 flex flex-col items-center justify-center border border-slate-200/60 dark:border-slate-800/60 p-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-2">
              <Sparkles size={16} />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">AdSense Ad (300x250)</span>
            <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-2 text-center leading-relaxed">
              Posicionamiento ideal para maximizar el CPM con anunciantes de tecnología, gaming o figuras de colección.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
