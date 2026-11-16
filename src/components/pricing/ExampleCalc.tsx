import Link from 'next/link';
import type { Konditionen } from '@/lib/content';
import { CLUSTERS, calcSavings, clusterForPath, type ClusterKey } from '@/lib/swipay-calc';
import { chf, fmtInt, dateDE } from '@/lib/format';

/** Beispielrechnung für Branchen-Seiten: dasselbe Modell wie der Rechner (Branchendurchschnitt als Vergleich). */
export function ExampleCalc({ k, titel, umsatz, bon, pfad, branche, erklaerung }: { k: Konditionen; titel: string; umsatz: number; bon: number; pfad: string; branche?: string | null; erklaerung?: string }) {
  const c = CLUSTERS.find((x) => x.key === branche) ?? CLUSTERS.find((x) => x.key === clusterForPath(pfad))!;
  const cluster: ClusterKey = c.key;
  const r = calcSavings({ cluster, umsatzJahr: umsatz * 12, bon });
  return (
    <div className="example">
      <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
        <h3>{titel}</h3>
        <div className="inputs">
          <div>
            <span>Branche im Rechner</span>
            <span>{c.label}</span>
          </div>
          <div>
            <span>Kartenumsatz pro Jahr</span>
            <span className="num">{chf(umsatz * 12)}</span>
          </div>
          <div>
            <span>Durchschnittsbon</span>
            <span className="num">{chf(bon)}</span>
          </div>
          <div>
            <span>Zahlungen pro Monat</span>
            <span className="num">{fmtInt(r.tx)}</span>
          </div>
        </div>
        {erklaerung && <p className="note" style={{ maxWidth: '60ch' }}>{erklaerung}</p>}
      </div>
      <div style={{ display: 'grid', gap: 24, alignContent: 'start' }}>
        <div className="big">
          <span className="l">Geschätzte Ersparnis pro Monat</span>
          <span className="v num" style={{ fontSize: 'clamp(2.2rem,4.4vw,3.8rem)' }}>
            CHF {fmtInt(r.monthly.low)} – {fmtInt(r.monthly.high)}
          </span>
          <span className="s">
            CHF {fmtInt(r.yearly.low)} – {fmtInt(r.yearly.high)} pro Jahr
          </span>
        </div>
        {r.micropayment && <p className="note">Bei diesem Bon zählt vor allem die Gebühr pro Zahlung, nicht der Prozentsatz.</p>}
        <p className="note">
          Richtwerte auf Basis von Branchendurchschnitten, exkl. MwSt., Stand {dateDE(k.stand)}. Dasselbe Modell wie der Rechner unseres Acquiring-Partners SwiPay. Mit Ihren eigenen Zahlen: <Link href="/konditionen#rechner">zum Rechner</Link>.
        </p>
      </div>
    </div>
  );
}
