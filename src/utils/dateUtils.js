const MONTHS = {
  'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
  'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
  'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12',
  'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04', 'may': '05', 'jun': '06',
  'jul': '07', 'ago': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
};

export function parseNewsDate(dateStr) {
  if (!dateStr) return 0;
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;
  const clean = dateStr.toLowerCase().replace(/\bde\b/g, '').replace(/\s+/g, ' ').trim();
  const match = clean.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const monthNum = MONTHS[match[2]];
    const year = match[3];
    if (monthNum) {
      const parsedIso = Date.parse(`${year}-${monthNum}-${day}T12:00:00`);
      if (!isNaN(parsedIso)) return parsedIso;
    }
  }
  return 0;
}
