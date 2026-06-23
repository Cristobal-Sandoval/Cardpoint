import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useAdmin() {
  const [adminSettings, setAdminSettings] = useState({ hidden_news: [], custom_banners: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('admin_settings').select('*');
      
      if (error) {
        // Ignorar el error en local/desarrollo si la tabla no existe aún para evitar colgar la app
        console.warn("No se pudo cargar admin_settings de Supabase:", error);
      } else if (data) {
        const settings = { hidden_news: [], custom_banners: [], tournaments_override: [], sponsored_ad: null };
        data.forEach(row => {
          if (row.id === 'hidden_news') settings.hidden_news = row.data;
          if (row.id === 'custom_banners') settings.custom_banners = row.data;
          if (row.id === 'tournaments_override') settings.tournaments_override = row.data;
          if (row.id === 'sponsored_ad') settings.sponsored_ad = row.data;
        });
        setAdminSettings(settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (id, data) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ id, data, updated_at: new Date().toISOString() });
      
      if (error) throw error;
      
      setAdminSettings(prev => ({ ...prev, [id]: data }));
      return true;
    } catch (err) {
      console.error(`Error actualizando ${id}:`, err);
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { adminSettings, loading, updateSetting, refetch: fetchSettings };
}
