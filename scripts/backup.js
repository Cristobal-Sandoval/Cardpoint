import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://satlrnugppdesfauxzrw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhdGxybnVncHBkZXNmYXV4enJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMzE0NDQsImV4cCI6MjA5NjYwNzQ0NH0.L2g1dhmNJfwg7_UjcX7642JSu6umvrFTbCyRltlleZs';

const TABLES = ['cards', 'news', 'tournaments', 'admin_settings'];

async function runBackup() {
  const dateStr = new Date().toISOString().split('T')[0];
  const backupDir = path.join(process.cwd(), 'backups');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log(`🚀 Iniciando respaldo de la base de datos para la fecha: ${dateStr}...`);

  for (const table of TABLES) {
    try {
      const url = `${supabaseUrl}/rest/v1/${table}?select=*`;
      const res = await fetch(url, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const filePath = path.join(backupDir, `${table}_${dateStr}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Tabla [${table}] respaldada con éxito (${data.length} registros) -> backups/${path.basename(filePath)}`);
    } catch (error) {
      console.error(`❌ Error al respaldar la tabla [${table}]:`, error.message);
    }
  }

  console.log('🎉 ¡Respaldo completado! Los archivos se guardaron en la carpeta /backups');
}

runBackup();
