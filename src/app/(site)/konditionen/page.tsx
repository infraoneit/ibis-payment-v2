import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaq, getKonditionen, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { dateDE } from '@/lib/format';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PriceList } from '@/components/pricing/PriceList';
import { Calculator } from '@/components/pricing/Calculator';
import { AbrechnungForm } from '@/components/forms/AbrechnungForm';
import { Faq } from '@/components/content/Faq';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Konditionen: Sätze und Rechner',
  description:
    'Was Kartenzahlung kostet: Höchstsätze für Debit- und Kreditkarten, Rechner mit Ihren Zahlen und Vergleichsrechnung anhand Ihrer Abrechnung. Offerte innert 24 Stunden an Werktagen.',
  path: '/konditionen',
});

export default async function KonditionenPage() {
  const [site, k, faq] = await Promise.all([getSite(), getKonditionen(), getFaq('konditionen')]);
  return (
    <>
      <PageHero label="Konditionen" title="Was Kartenzahlung bei uns kostet." lead={`Hier stehen die Höchstsätze für Debit- und Kreditkarten. Ihre genauen Konditionen hängen von Umsatz und Kartenmix ab und stehen in der Offerte, die Sie innert 24 Stunden an Werktagen erhalten. ${k.hinweis} Stand ${dateDE(k.stand)}.`} crumbs={[{ name: 'Konditionen', href: '/konditionen' }]}>
        <div className="hero-ctas" style={{ marginTop: 28 }}>
          <a className="btn btn-ink" href="#rechner">
            Zum Rechner
          </a>
          <a className="link" href="#abrechnung">
            Abrechnung nachrechnen lassen <Arrow />
          </a>
        </div>
      </PageHero>

      <Section id="preisliste" label="Sätze" sub={`Für Betriebe in der Schweiz. Stand ${dateDE(k.stand)}.`}>
        <Reveal>
          <PriceList k={k} />
        </Reveal>
        <p className="pl-note">
          Den Vertrag schliessen Sie mit der SwiPay AG. Laufzeit, Kündigung und alle Gebühren stehen im Vertrag; wir gehen ihn mit Ihnen durch, bevor Sie unterschreiben.{' '}
          <Link href="/wissen/kartenzahlung-gebuehren-schweiz">Mehr zu Gebühren</Link>.
        </p>
      </Section>

      <Section tone="dark" label="Transparenz" sub="Woraus sich eine Kartengebühr zusammensetzt.">
        <Reveal>
          <Intro title="Jede Gebühr besteht aus drei Teilen. In der Offerte sehen Sie alle drei." text="Die ersten zwei Teile gehen an die Bank des Karteninhabers und an das Kartennetzwerk. Der dritte Teil ist die Abwicklung. Wir legen alle drei offen, damit Sie wissen, wofür Sie bezahlen." />
        </Reveal>
        <div className="claims">
          <Reveal>
            <div className="claim">
              <h3>Interchange</h3>
              <p>Geht an die Bank, die die Karte herausgegeben hat. Die Höhe hängt von der Kartenart ab.</p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="claim">
              <h3>Scheme Fee</h3>
              <p>Geht an das Kartennetzwerk, zum Beispiel Visa oder Mastercard, für den Betrieb des Netzes.</p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="claim">
              <h3>Acquiring-Gebühr</h3>
              <p>Deckt Verarbeitung, Abwicklung und Service. Hier unterscheiden sich die Anbieter.</p>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <Link className="link" href="/wissen/kartenzahlung-gebuehren-schweiz">
            Gebühren im Detail verstehen <Arrow />
          </Link>
        </Reveal>
      </Section>

      <Section tone="grey" label="Rechner" sub="Mit Ihren Zahlen, nicht mit unseren.">
        <Reveal>
          <Calculator stand={dateDE(k.stand)} />
        </Reveal>
      </Section>

      <Section id="abrechnung" label="Nachrechnen lassen" sub="Genauer als jeder Rechner: Ihre echte Abrechnung.">
        <Reveal>
          <Intro title="Schicken Sie uns Ihre letzte Abrechnung. Wir rechnen innert 24 Stunden an Werktagen nach." text={`${site.bestpreis} Sie erhalten dieselben Umsätze mit unseren Sätzen gerechnet, Position für Position.`} />
        </Reveal>
        <Reveal delay={1}>
          <div className="panel">
            <h3>Abrechnung einreichen</h3>
            <AbrechnungForm />
          </div>
        </Reveal>
      </Section>

      <Section label="Fragen" sub="Zu Gebühren und Vertrag.">
        <Faq items={faq} />
      </Section>

      <CtaBand phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}
