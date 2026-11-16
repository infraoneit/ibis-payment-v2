import Link from 'next/link';
import type { Metadata } from 'next';
import { getKonditionen, getReferenzen, getSite } from '@/lib/content';
import { pageMeta, SITE_URL } from '@/lib/seo';
import { HeroTerminal } from '@/components/home/HeroTerminal';
import { PaymentMarquee } from '@/components/home/PaymentMarquee';
import { Promises } from '@/components/home/Promises';
import { Suspense } from 'react';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Calculator } from '@/components/pricing/Calculator';
import { BauformGrid } from '@/components/devices/DeviceGrid';
import { BeraterCard } from '@/components/content/SupportCard';
import { ContactForm } from '@/components/forms/ContactForm';
import { PartnerLogos } from '@/components/content/PartnerLogos';
import { JsonLd } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icons';
import { dateDE } from '@/lib/format';

export const metadata: Metadata = pageMeta({
  title: 'Zahlterminal Schweiz: Gebühren, die Sie verstehen',
  description:
    'Zahlterminals, Kassen und Online-Zahlungen für Betriebe in der ganzen Schweiz. Rechner mit Ihren Zahlen, ein fester Ansprechpartner, Offerte innert 24 Stunden an Werktagen.',
  path: '/',
});

export default async function Home() {
  const [site, k, refs] = await Promise.all([getSite(), getKonditionen(), getReferenzen()]);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#localbusiness`,
          name: site.legalName,
          alternateName: 'ibis payment',
          url: SITE_URL,
          image: `${SITE_URL}/og-image.png`,
          telephone: site.phoneHref,
          email: site.email,
          priceRange: 'CHF',
          address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: 'CH' },
          areaServed: 'CH',
          openingHours: site.openingHoursSchema,
          parentOrganization: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      <section className="hero section no-line">
        <div className="wrap">
          <div className="hero-copy">
            <h1>
              Kartenzahlung mit Gebühren, die Sie <span className="ul-draw">verstehen</span>.
            </h1>
            <p className="sub">Terminals, Kassen und Online-Zahlungen für Schweizer Betriebe. Jede Gebühr steht in der Offerte. Und wenn etwas nicht läuft, nimmt jemand ab.</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href="/konditionen#rechner">
                <Icon.calculator style={{ width: 18, height: 18 }} /> Ersparnis berechnen
              </Link>
              <Link className="btn btn-outline" href="/konditionen">
                Konditionen
              </Link>
              <Link className="link" href="/kontakt">
                Beratung anfragen <Arrow />
              </Link>
            </div>
          </div>
          <HeroTerminal />
        </div>
      </section>

      <PaymentMarquee />

      <Promises />

      <Section tone="grey" id="rechner" label="Rechner" sub={`Branche, Umsatz, Durchschnittsbon. Richtwerte exkl. MwSt., Stand ${dateDE(k.stand)}.`}>
        <Reveal>
          <Intro title="Zahlen Sie zu viel? In 60 Sekunden wissen Sie es." text="Der Rechner zeigt, was Sie pro Monat und Jahr sparen können. Die Höchstsätze für Debit- und Kreditkarten stehen auf der Seite Konditionen, Ihre genauen Sätze in der Offerte." />
        </Reveal>
        <Reveal delay={1}>
          <Calculator stand={dateDE(k.stand)} />
        </Reveal>
        <Reveal>
          <Link className="link" href="/konditionen">
            Sätze ansehen <Arrow />
          </Link>
        </Reveal>
      </Section>

      <Section id="geraete" label="Terminals" sub="Terminals von PayTec, ep2-zertifiziert. Miete oder Kauf, den Preis nennen wir in der Offerte.">
        <Reveal>
          <Intro title="Drei Bauformen. Wir sagen Ihnen, welche zu Ihrem Ablauf passt." />
        </Reveal>
        <BauformGrid />
        <Reveal>
          <Link className="link" href="/geraete">
            Alle Terminals mit technischen Daten <Arrow />
          </Link>
        </Reveal>
      </Section>

      <Section tone="grey" id="partner" label="Partner" sub="Acquiring, Terminals, Kassen und Waagen aus der Schweiz.">
        <Reveal>
          <PartnerLogos />
        </Reveal>
      </Section>

      <Section tone="dark" id="kontakt" label="Kontakt" sub="Antwort innert 24 Stunden an Werktagen.">
        <div className="support">
          <Reveal>
            <div className="intro">
              <h2>Schicken Sie uns Ihre letzte Abrechnung oder rufen Sie an.</h2>
              <p>Sie erhalten dieselben Umsätze mit unseren Sätzen gerechnet, Zahl für Zahl. Auf Wunsch kommen wir vorbei, in der ganzen Schweiz. Und wenn später etwas nicht läuft, haben Sie denselben Ansprechpartner.</p>
              <BeraterCard site={site} />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="form-card">
              <Suspense fallback={null}>
                <ContactForm phone={site.phone} phoneHref={site.phoneHref} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Section>

      {refs.length > 0 && (
        <Section id="referenzen" label="Referenzen" sub="Stimmen aus Betrieben, die gewechselt haben.">
          <div className="quotes">
            {refs.slice(0, 3).map((r) => (
              <Reveal key={r.slug} className="qq">
                <p>«{r.zitat}»</p>
                <div className="who">
                  <b>{r.name}</b>
                  {r.betrieb}, {r.ort}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

    </>
  );
}
