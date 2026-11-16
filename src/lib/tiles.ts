/** Kachel-Raster ohne Lücken: Aus der Anzahl Kacheln ergeben sich die Spalten so, dass jede Reihe voll ist.
 *  Geht es nicht auf (5, 7, 8, 11 …), ergänzt das Raster eine Abschluss-Kachel mit einem Aufruf (filler).
 *
 *  Beispiele:  2 → 2 Spalten · 3 → 3 · 4 → 2×2 · 5 → 6 (mit Abschluss-Kachel) → 3×2 · 6 → 3×2 · 7 → 8 → 4×2 · 9 → 3×3
 *  Tablet (md): gerade Anzahl → 2 Spalten, ungerade (3, 9) → 3 Spalten. Handy: immer 1 Spalte. */
export function tilePlan(n: number): { filler: boolean; cols: 1 | 2 | 3 | 4; md: 1 | 2 | 3 } {
  let m = n;
  let filler = false;
  if (n >= 5 && n % 3 === 2) {
    filler = true; // 5 → 6, 8 → 9, 11 → 12
    m = n + 1;
  } else if (n >= 7 && n % 3 === 1 && n % 2 === 1) {
    filler = true; // 7 → 8, 13 → 14
    m = n + 1;
  }
  const cols = m <= 1 ? 1 : m === 2 || m === 4 ? 2 : m % 3 === 0 ? 3 : m % 4 === 0 ? 4 : m % 2 === 0 ? 2 : 3;
  const md = cols === 1 ? 1 : cols === 3 ? (m % 2 === 0 ? 2 : 3) : 2;
  return { filler, cols, md };
}
