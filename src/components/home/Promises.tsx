import { Section, Intro } from '@/components/layout/Section';
import { Timeline } from '@/components/content/Timeline';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/motion/Reveal';

const CLAIMS = [
  { icon: <Icon.receipt />, title: 'Jede Gebühr steht in der Offerte. Pro Kartenart.', text: 'Interchange, Scheme Fee und Acquiring-Gebühr sind getrennt ausgewiesen. Keine versteckten Kosten, keine unklaren Positionen.' },
  { icon: <Icon.calculator />, title: 'Wir unterbieten Ihre heutige Abrechnung. Oder sagen Ihnen, dass es nicht geht.', text: 'Schicken Sie uns Ihre letzte Monatsabrechnung. Innert 24 Stunden an Werktagen erhalten Sie den Vergleich mit denselben Umsätzen, Zahl für Zahl.' },
  { icon: <Icon.phone />, title: 'Ein Ansprechpartner für alles.', text: 'Vom ersten Gespräch bis zum laufenden Betrieb haben Sie dieselbe Person am Telefon: für Abrechnung, Technik und Vertrag.' },
  { icon: <Icon.tools />, title: 'Wir begleiten Sie bis zur ersten Zahlung.', text: 'Terminal, Kassenanbindung und Ihr Team: Wir sind von der ersten Beratung bis zur Inbetriebnahme dabei, in der ganzen Schweiz.' },
  { icon: <Icon.clock />, title: 'Im Normalfall in 72 Stunden startklar.', text: 'Sobald der Vertrag und alle Unterlagen bei SwiPay sind, dauert es im Normalfall 72 Stunden, bis Sie die erste Karte annehmen.' },
];

/** Fünf Versprechen als Timeline mit Icons. */
export function Promises() {
  return (
    <Section id="versprechen" label="Versprechen" sub="Fünf Sätze, an denen Sie uns messen können.">
      <Reveal>
        <Intro title="Was wir zusagen, steht hier. Offen und nachprüfbar." />
      </Reveal>
      <Timeline items={CLAIMS} />
    </Section>
  );
}
