/** Version 2: fünf direkte Menüpunkte ohne Dropdowns. Alle weiteren Seiten bleiben online und sind über Footer, Hub-Seiten und Sitemap erreichbar. */
import type { IconName } from '@/components/ui/Icons';

export type NavLink = { label: string; href: string; description?: string; badge?: string; external?: boolean; icon?: IconName };
export type NavGroup = { title: string; links: NavLink[] };
export type NavItem =
  | { label: string; href: string }
  | { label: string; groups: NavGroup[] };

export const NAV: NavItem[] = [
  { label: 'Terminals', href: '/geraete' },
  { label: 'Konditionen', href: '/konditionen' },
  { label: 'Branchen', href: '/branchen' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const FOOTER_COLUMNS: NavGroup[] = [
  {
    title: 'Angebot',
    links: [
      { label: 'Zahlterminals', href: '/geraete' },
      { label: 'Kassensysteme', href: '/kassensysteme' },
      { label: 'Online-Zahlungen', href: '/online-zahlungen' },
      { label: 'Handy als Terminal', href: '/handy-als-terminal' },
      { label: 'TWINT am Terminal', href: '/twint-terminal' },
      { label: 'Konditionen und Rechner', href: '/konditionen' },
      { label: 'Abrechnung einreichen', href: '/konditionen#abrechnung' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Support und Störungen', href: '/support' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Dienstleistungen', href: '/dienstleistungen' },
      { label: 'Hilfecenter SwiPay', href: 'https://swipay.ch/hilfecenter/', external: true },
      { label: 'Vertragsunterlagen SwiPay', href: 'https://swipay.ch/hilfecenter/vertragsunterlagen/', external: true },
    ],
  },
  {
    title: 'Ratgeber',
    links: [
      { label: 'Branchen', href: '/branchen' },
      { label: 'Terminal mieten', href: '/zahlterminal-mieten' },
      { label: 'Terminal kaufen', href: '/zahlterminal-kaufen' },
      { label: 'Anbieter vergleichen', href: '/zahlterminal-vergleich' },
      { label: 'Gebühren verstehen', href: '/wissen/kartenzahlung-gebuehren-schweiz' },
      { label: 'Alle Artikel', href: '/wissen' },
    ],
  },
];
