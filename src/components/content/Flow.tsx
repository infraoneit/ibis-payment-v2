import { Timeline } from './Timeline';
import { Icon } from '@/components/ui/Icons';

const STEPS = [
  { icon: <Icon.chat />, title: 'Gespräch', text: 'Wir sehen uns Ablauf und Kasse an. Bringen Sie Ihre letzte Abrechnung mit.', meta: 'persönlich oder am Telefon' },
  { icon: <Icon.receipt />, title: 'Offerte', text: 'Ihre Sätze pro Kartenart und das Terminal, als Miete und als Kauf.', meta: 'innert 24 Stunden an Werktagen' },
  { icon: <Icon.file />, title: 'Vertrag', text: 'Den Vertrag schliessen Sie mit SwiPay. Wir gehen ihn vorher mit Ihnen durch.', meta: 'mit der SwiPay AG' },
  { icon: <Icon.tools />, title: 'Inbetriebnahme', text: 'Terminal und Kassenanbindung laufen, Ihr Team kennt Trinkgeld, Storno und Tagesabschluss.', meta: 'im Normalfall 72 Stunden nach Vertragseingang' },
  { icon: <Icon.phone />, title: 'Betrieb', text: 'Ein Anruf bei Ihrem Ansprechpartner genügt, für Technik und Abrechnung.', meta: 'laufend' },
];

/** Ablauf in fünf Schritten als horizontale Timeline (mobil vertikal). */
export function Flow() {
  return <Timeline items={STEPS} horizontal />;
}
