import { Icon } from '@/components/ui/Icons';

export type DocRow = { label: string; value: string; strong?: boolean; check?: boolean };
export type DocSpec = { title: string; subtitle?: string; rows: DocRow[]; total?: { label: string; value: string }; stamp?: string };

/** Dokument-Mockup (Abrechnung, Checkliste, Police, Kontoauszug) als Hero-Visual: ruhig, markenkonform, kein Stockbild. */
export function DocMock({ spec }: { spec: DocSpec }) {
  return (
    <div className="docmock" aria-hidden="true">
      <div className="doc-head">
        <div>
          <div className="doc-title">{spec.title}</div>
          {spec.subtitle && <div className="doc-sub">{spec.subtitle}</div>}
        </div>
        {spec.stamp && <span className="doc-stamp">{spec.stamp}</span>}
      </div>
      <div className="doc-rows">
        {spec.rows.map((r) => (
          <div key={r.label} className={`doc-row${r.strong ? ' strong' : ''}`}>
            <span className="doc-label">
              {r.check && (
                <span className="doc-check">
                  <Icon.check />
                </span>
              )}
              {r.label}
            </span>
            <span className="doc-value num">{r.value}</span>
          </div>
        ))}
      </div>
      {spec.total && (
        <div className="doc-total">
          <span>{spec.total.label}</span>
          <span className="num">{spec.total.value}</span>
        </div>
      )}
    </div>
  );
}

/** Vorlagen je Seite (Inhalte entsprechen den Konditionen und Fakten der Seite; Beträge sind Beispiele). */
export const DOC_SPECS: Record<string, DocSpec> = {
  '/wissen/kartenzahlung-gebuehren-schweiz': {
    title: 'Eine Kartenzahlung',
    subtitle: 'Die drei Teile jeder Gebühr',
    rows: [
      { label: 'Interchange', value: 'an die Bank des Kunden' },
      { label: 'Scheme Fee', value: 'an Visa oder Mastercard' },
      { label: 'Acquiring-Gebühr', value: 'Abwicklung und Service', strong: true },
    ],
    total: { label: 'Alle drei Teile', value: 'stehen in der Offerte' },
    stamp: 'Aufbau',
  },
  '/wissen/rollen-im-payment': {
    title: 'Eine Zahlung, fünf Beteiligte',
    subtitle: 'Wer was tut, in der Reihenfolge der Zahlung',
    rows: [
      { label: 'Terminal (PayTec)', value: 'liest die Karte' },
      { label: 'Acquirer (TeleCash/Fiserv)', value: 'holt die Freigabe' },
      { label: 'Kartennetzwerk', value: 'leitet weiter' },
      { label: 'Issuer, Bank des Kunden', value: 'gibt frei' },
      { label: 'Händler', value: 'erhält die Gutschrift', strong: true },
    ],
    stamp: 'Ablauf',
  },
  '/wissen/psp-oder-broker': {
    title: 'PSP oder Broker',
    subtitle: 'Zwei Rollen, zwei Aufgaben',
    rows: [
      { label: 'Betreibt die Technik', value: 'PSP' },
      { label: 'Wickelt Zahlungen ab', value: 'PSP' },
      { label: 'Ordnet Kosten und Zuständigkeiten ein', value: 'Broker' },
      { label: 'Vermittelt den passenden Vertrag', value: 'Broker' },
      { label: 'Berät und begleitet bis zur Inbetriebnahme', value: 'ibis payment', strong: true },
    ],
  },
  '/wissen/typische-fehler': {
    title: 'Abrechnung prüfen',
    subtitle: 'Einmal im Jahr, mit der letzten Abrechnung',
    rows: [
      { label: 'Effektiver Satz berechnet', value: 'Gebühren / Umsatz', check: true },
      { label: 'Feste Beträge pro Zahlung', value: 'geprüft', check: true },
      { label: 'Laufzeit und Kündigungsfrist', value: 'notiert', check: true },
      { label: 'Monats- und Mindestgebühren', value: 'geprüft', check: true },
      { label: 'Vergleich mit gleichen Umsätzen', value: 'offen' },
    ],
  },
  '/wissen/mieten-oder-kaufen': {
    title: 'Miete oder Kauf',
    subtitle: 'Vier Fragen an die Offerte',
    rows: [
      { label: 'Wie lange nutzen Sie das Terminal?', value: 'Dauer' },
      { label: 'Wer trägt Wartung und Updates?', value: 'Service' },
      { label: 'Was passiert bei einem Defekt?', value: 'Ersatz' },
      { label: 'Wechselt Ihr Betrieb mit der Saison?', value: 'Flexibilität', strong: true },
    ],
    total: { label: 'Beide Varianten', value: 'nebeneinander in der Offerte' },
    stamp: 'Checkliste',
  },
  '/dienstleistungen/telefonie': {
    title: 'Telefonie und Internet',
    subtitle: 'Beispiel für einen Betrieb mit 5 Benutzern',
    rows: [
      { label: 'peoplefone vPBX BASIC, 1 bis 5 Benutzer', value: 'CHF 15.00 / Mt.' },
      { label: 'Geschäftsnummer', value: 'CHF 5.00 / Mt.' },
      { label: 'iway Business Internet 1 Gbit/s', value: 'CHF 49.00 / Mt.' },
      { label: 'Einrichtung durch InfraOne', value: 'nach Aufwand' },
    ],
    total: { label: 'Fix pro Monat, inkl. MwSt.', value: 'CHF 69.00' },
    stamp: 'Listenpreise',
  },
  '/dienstleistungen/versicherungen': {
    title: 'Prämien-Check',
    subtitle: 'Was der Broker für Ihren Betrieb prüft',
    rows: [
      { label: 'Betriebshaftpflicht', value: 'Deckung, Prämie', check: true },
      { label: 'Sachversicherung', value: 'Inventar, Waren', check: true },
      { label: 'Betriebsunterbruch', value: 'Ertragsausfall', check: true },
      { label: 'Cyber', value: 'Daten, Systeme', check: true },
      { label: 'UVG und KTG', value: 'Personal', check: true },
    ],
    stamp: 'Kostenlos',
  },
  '/dienstleistungen/treuhand': {
    title: 'Monatsabschluss',
    subtitle: 'Was aus Kasse und Terminal in die Buchhaltung fliesst',
    rows: [
      { label: 'Kassenabschluss', value: 'täglich' },
      { label: 'Kartenabrechnung', value: 'nach Kanal und Kartenart' },
      { label: 'MwSt.-Abrechnung', value: 'nach Periode' },
      { label: 'Lohn', value: 'monatlich' },
      { label: 'Jahresabschluss', value: 'jährlich', strong: true },
    ],
  },
};
