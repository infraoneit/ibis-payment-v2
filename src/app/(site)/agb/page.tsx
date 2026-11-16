import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = pageMeta({
  title: 'Vertrag und Bedingungen',
  description: 'Mit wem Sie den Vertrag schliessen: Kartenakzeptanz und Terminal laufen über die SwiPay AG. Ibis Payment GmbH berät, vermittelt und begleitet.',
  path: '/agb',
});

/** Ibis Payment GmbH schliesst keine eigenen Verträge über Acquiring oder Terminals (Stand November 2026):
 *  Vertragspartner des Händlers ist die SwiPay AG. Die Seite erklärt die Rollen und verweist auf die Unterlagen von SwiPay.
 *  Der Satz zum Vertragspartner kommt aus «Firma und Kontakt» im CMS und lässt sich dort ändern. */
export default async function AgbPage() {
  const site = await getSite();
  return (
    <>
      <PageHero label="Rechtliches" title="Vertrag und Bedingungen." lead="Mit wem Sie den Vertrag schliessen, was auf dieser Website verbindlich ist und wo die Bedingungen stehen." crumbs={[{ name: 'Vertrag und Bedingungen', href: '/agb' }]} />
      <Section label="1. Vertragspartner" tight>
        <div className="prose prose-sm">
          <p>{site.vertragspartner}</p>
          <p>
            Es gelten die Vertragsunterlagen und die Geschäftsbedingungen der SwiPay AG:{' '}
            <a href="https://swipay.ch/hilfecenter/vertragsunterlagen/" target="_blank" rel="noopener noreferrer">
              Vertragsunterlagen
            </a>
            ,{' '}
            <a href="https://swipay.ch/geschaeftsbedingungen/" target="_blank" rel="noopener noreferrer">
              Geschäftsbedingungen
            </a>
            . Laufzeit, Kündigung, Gebühren und Auszahlung richten sich nach Ihrem Vertrag mit SwiPay. Wir gehen den Vertrag mit Ihnen durch, bevor Sie unterschreiben.
          </p>
        </div>
      </Section>
      <Section label="2. Rolle von ibis payment" tight>
        <div className="prose prose-sm">
          <p>
            {site.legalName} berät Betriebe, erstellt die Vergleichsrechnung und die Offerte, vermittelt den Vertrag und begleitet die Inbetriebnahme. Danach bleiben wir Ihr Ansprechpartner. Die Beratung ist für Sie kostenlos und unverbindlich.
          </p>
        </div>
      </Section>
      <Section label="3. Angaben auf dieser Website" tight>
        <div className="prose prose-sm">
          <p>
            Die Sätze unter <Link href="/konditionen">Konditionen</Link> sind Höchstsätze und Richtwerte. Der Rechner liefert eine Schätzung auf Basis Ihrer Eingaben. Verbindlich sind die schriftliche Offerte und der Vertrag mit SwiPay.
          </p>
        </div>
      </Section>
      <Section label="4. Bestpreis-Zusage" tight>
        <div className="prose prose-sm">
          <p>{site.bestpreis} Die Zusage bezieht sich auf den Vergleich derselben Umsätze, Kartenarten und Transaktionszahlen gemäss der Monatsabrechnung, die Sie uns einreichen.</p>
        </div>
      </Section>
      <Section label="5. Datenschutz" tight>
        <div className="prose prose-sm">
          <p>
            Für die Bearbeitung Ihrer Daten auf dieser Website gilt die <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
