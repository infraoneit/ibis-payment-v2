/** Netlify Forms: Die Formulardefinitionen liegen in public/__forms.html (dort erkennt Netlify sie beim Deploy).
 *  Die React-Formulare senden ihre Daten per fetch an diese statische Datei. Datei-Uploads als multipart.
 *
 *  Schutz gegen automatische Anfragen, ohne Captcha und ohne Drittanbieter (keine Cookies):
 *  1. Köderfeld «homepage»: für Menschen unsichtbar. Ist es ausgefüllt, wird nichts gesendet, der Bot sieht trotzdem «Danke».
 *     Netlify prüft dasselbe Feld serverseitig (netlify-honeypot in __forms.html).
 *  2. Zeitsperre: Zwischen der ersten Eingabe ins Formular und dem Absenden müssen mindestens 3 Sekunden liegen.
 *     Ohne jede Eingabe (Skript füllt das Formular direkt) wird ebenfalls nicht gesendet. Menschen sehen einen Hinweis
 *     und können sofort noch einmal senden.
 *  3. Inhalt und Menge: höchstens 2 Links in der Nachricht, höchstens 3 Anfragen pro 10 Minuten aus demselben Browser.
 *  Serverseitig filtert Netlify zusätzlich jede Einsendung mit seinem Spamfilter (Akismet). */
export const FORM_ENDPOINT = '/__forms.html';
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // Netlify-Limit für Formular-Uploads
export const UPLOAD_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/heic', 'image/webp'];

export const HONEYPOT = 'homepage';
const MIN_FILL_MS = 3000;
const MAX_LINKS = 2;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const RATE_KEY = 'ibis_form_log';

/** Fehler mit Text für die Besucherin oder den Besucher (wird im Formular angezeigt). */
export class FormGuardError extends Error {}

/** Erste Eingabe pro Formular merken (Fokus, Klick, Taste, Eingabe). */
const firstTouch = new WeakMap<HTMLFormElement, number>();
if (typeof window !== 'undefined') {
  const mark = (e: Event) => {
    const t = e.target;
    const form = t instanceof Element ? t.closest('form') : null;
    if (form && !firstTouch.has(form)) firstTouch.set(form, Date.now());
  };
  for (const type of ['focusin', 'pointerdown', 'keydown', 'input']) document.addEventListener(type, mark, true);
}

function readLog(): number[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RATE_KEY) ?? '[]');
    return Array.isArray(raw) ? raw.filter((n) => typeof n === 'number' && Date.now() - n < RATE_WINDOW_MS) : [];
  } catch {
    return [];
  }
}

function writeLog(log: number[]) {
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify(log));
  } catch {}
}

/** Prüft die Einsendung. Gibt false zurück, wenn still verworfen werden soll (Köderfeld ausgefüllt). */
function guard(form: HTMLFormElement, data: FormData): boolean {
  if (String(data.get(HONEYPOT) ?? '').trim()) return false;

  const touched = firstTouch.get(form);
  if (!touched || Date.now() - touched < MIN_FILL_MS) {
    throw new FormGuardError('Bitte prüfen Sie Ihre Angaben kurz und senden Sie das Formular noch einmal.');
  }

  const text = String(data.get('nachricht') ?? '');
  const links = text.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (links > MAX_LINKS) {
    throw new FormGuardError('Bitte senden Sie Ihre Nachricht ohne Links. Adressen können Sie uns gerne am Telefon nennen.');
  }

  if (readLog().length >= RATE_MAX) {
    throw new FormGuardError('Ihre Anfragen sind bei uns angekommen. Für weitere Anliegen rufen Sie uns bitte an.');
  }
  return true;
}

export async function submitForm(formName: string, form: HTMLFormElement) {
  const data = new FormData(form);
  if (!guard(form, data)) return; // Köderfeld ausgefüllt: nichts senden, nach aussen wie Erfolg
  data.set('form-name', formName);
  const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data });
  if (!res.ok) throw new Error(`Formular konnte nicht gesendet werden (${res.status}).`);
  writeLog([...readLog(), Date.now()]);
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
