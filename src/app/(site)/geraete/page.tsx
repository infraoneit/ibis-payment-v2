import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaq, getGeraete, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { DeviceGrid } from '@/components/devices/DeviceGrid';
import { Faq } from '@/components/content/Faq';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Zahlterminals: mobil, stationär, Automat',
  description:
    'Alle PayTec-Terminals mit technischen Daten: N62, N86, N96, CT20P, V3CT3, UN20. ep2-zertifiziert, TWINT direkt auf dem Terminal. Miete oder Kauf, Preis in der Offerte.',
  path: '/geraete',
});

const MORE = [
  { href: '/kassensysteme', t: 'Kassensysteme', p: 'Kasse und Terminal aus einer Hand: Artikel, Tische, Tagesabschluss, Berichte. Der Betrag geht automatisch von der Kasse ans Terminal, kein Abtippen.' },
  { href: '/online-zahlungen', t: 'Online-Zahlungen', p: 'Webshop, Buchungssystem oder Rechnung mit Zahllink. Über 40 Zahlungsmethoden inklusive TWINT. Laden und Online auf einer Abrechnung.' },
  { href: '/handy-als-terminal', t: 'Handy als Terminal', p: 'Kartenzahlung direkt auf dem Smartphone, ohne Gerät und ohne Fixkosten. Für den Start, für den Marktstand oder als Reserve, wenn das Terminal ausfällt.' },
];

export default async function GeraetePage() {
  const [site, geraete, faq] = await Promise.all([getSite(), getGeraete(), getFaq('geraete')]);
  const by = (cat: string) => geraete.filter((g) => g.kategorie === cat);
  return (
    <>
      <PageHero label="Terminals" title="Das Terminal, das zu Ihrem Ablauf passt." lead="Terminals von PayTec, ep2-zertifiziert und in der Schweiz entwickelt. Alle Modelle akzeptieren TWINT, Debit- und Kreditkarten, Apple Pay und Google Pay." crumbs={[{ name: 'Terminals', href: '/geraete' }]} />

      <Section id="mobil" label="Mobil" sub="Service am Tisch, Markt, Lieferdienst. Akku, 4G und WLAN.">
        <Reveal>
          <Intro title="Mobil: das Terminal kommt zum Kunden." text="Ohne Drucker (N62) für die Schürze, mit Drucker (N86, N96) für Betriebe, die einen Papierbeleg wollen." />
        </Reveal>
        <DeviceGrid geraete={by('mobil')} />
      </Section>

      <Section id="stationaer" tone="grey" label="Stationär" sub="Kassenplatz, Empfang, Theke. LAN oder WLAN.">
        <Reveal>
          <Intro title="Stationär: fest am Kassenplatz." text="Kassenintegriert (CT20P), wenn der Betrag von der Kasse kommt. Mit Tastatur und Drucker (V3CT3), wenn Sie ohne Kasse kassieren." />
        </Reveal>
        <DeviceGrid geraete={[...by('kassenintegriert'), ...by('stationaer')]} />
      </Section>

      <Section id="automat" label="Automat" sub="Unbeaufsichtigt, rund um die Uhr.">
        <Reveal>
          <Intro title="Automat: bezahlen ohne Personal." text="Einbauterminals für Verkaufsautomaten, Parking, Waschanlagen und Ladestationen. Einbau und Anbindung sind je nach Automat verschieden; das klären wir im Gespräch." />
        </Reveal>
        <DeviceGrid geraete={by('automat')} />
      </Section>

      <Section label="Miete oder Kauf" sub="Beides ist möglich.">
        <Reveal>
          <Intro title="Den Preis für Ihr Terminal nennen wir in der Offerte." text="Welches Modell passt und ob Miete oder Kauf sinnvoller ist, hängt von Ihrem Betrieb ab. Sie erhalten beide Varianten nebeneinander, innert 24 Stunden an Werktagen." />
        </Reveal>
        <Reveal>
          <Link className="link" href="/konditionen">
            Sätze für Debit- und Kreditkarten <Arrow />
          </Link>
        </Reveal>
      </Section>

      <Section tone="grey" id="kassen" label="Mehr als Terminals" sub="Kasse, Online und Handy aus derselben Hand.">
        <div className="svcs">
          {MORE.map((m, i) => (
            <Reveal key={m.href} delay={i as 0 | 1 | 2}>
              <Link className="svc" href={m.href}>
                <h3>{m.t}</h3>
                <p>{m.p}</p>
                <div className="arrow">
                  <Arrow />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Fragen" sub="Zu Terminals und Anbindung.">
        <Faq items={faq} />
      </Section>

      <CtaBand title="Welches Terminal passt? Wir schauen es uns bei Ihnen an." text="Die Beratung ist kostenlos und unverbindlich. Bringen Sie Ihre letzte Abrechnung mit, dann rechnen wir gleich nach." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}
