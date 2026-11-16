import type { Konditionen } from '@/lib/content';
import { dateDE } from '@/lib/format';

type Row = { label: string; beschreibung: string; wert: string };

/** Prozentsatz ohne überflüssige Nullen: 0.85 %, 1.5 % */
const rate = (n: number) => `${parseFloat(n.toFixed(2))} %`;

export function priceRows(k: Konditionen, variant: 'full' | 'short' = 'full'): Row[] {
  const rows: Row[] = [
    { label: 'Debitkarten', beschreibung: k.debitKarten, wert: `höchstens ${rate(k.debit)}` },
    { label: 'Kreditkarten', beschreibung: k.kreditKarten, wert: `höchstens ${rate(k.kredit)}` },
  ];
  if (variant === 'full') k.weitere.forEach((w) => rows.push({ label: w.label, beschreibung: w.beschreibung, wert: w.wert }));
  return rows;
}

/** Sätze als echte Tabelle, liest ausschliesslich aus content/konditionen.yaml.
 *  Gezeigt werden nur belegte Höchstsätze (PayTec-Standard); alles Weitere steht in der Offerte. */
export function PriceList({ k, variant = 'full', caption }: { k: Konditionen; variant?: 'full' | 'short'; caption?: string }) {
  const rows = priceRows(k, variant);
  return (
    <table className="pricelist">
      <caption>{caption ?? `${k.quelle} ${k.hinweis} Stand ${dateDE(k.stand)}.`}</caption>
      <thead>
        <tr>
          <th scope="col">Position</th>
          <th scope="col">Was dazugehört</th>
          <th scope="col" style={{ textAlign: 'right' }}>
            Satz
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row" className="k">
              {r.label}
            </th>
            <td className="d">{r.beschreibung}</td>
            <td className="v num">{r.wert}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SimplePriceList({ rows, caption }: { rows: readonly { label: string; beschreibung: string; wert: string }[]; caption?: string }) {
  return (
    <table className="pricelist">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <th scope="col">Position</th>
          <th scope="col">Was dazugehört</th>
          <th scope="col" style={{ textAlign: 'right' }}>
            Angabe
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row" className="k">
              {r.label}
            </th>
            <td className="d">{r.beschreibung}</td>
            <td className="v num" style={{ fontSize: '1.25rem' }}>
              {r.wert}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
