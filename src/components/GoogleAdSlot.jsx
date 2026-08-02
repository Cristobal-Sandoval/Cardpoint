import React, { useState, useEffect } from 'react';

export default function GoogleAdSlot({ format = "horizontal", className = "", adClient = "ca-pub-XXXXXXXXXX", adSlot = "XXXXXXXXXX" }) {
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

  // Si no hay script de AdSense cargado o el ID de cliente es un placeholder genérico,
  // NO renderizar ningún contenedor ni placeholder simulado.
  const isRealConfig = adClient && adClient !== "ca-pub-XXXXXXXXXX" && adSlot && adSlot !== "XXXXXXXXXX";

  if (!isAdSenseScriptPresent || !isRealConfig) {
    return null;
  }

  return (
    <div className={`ad-slot-container relative overflow-hidden text-center transition-all ${className}`}>
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', minHeight: format === 'horizontal' ? '90px' : format === 'card' ? '280px' : '250px' }}
           data-ad-client={adClient}
           data-ad-slot={adSlot}
           data-ad-format={format === "horizontal" ? "auto" : "rectangle"}
           data-full-width-responsive="true"></ins>
    </div>
  );
}
