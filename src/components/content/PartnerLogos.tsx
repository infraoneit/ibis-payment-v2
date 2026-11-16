import Image from 'next/image';

/** Partner-Logos, einfarbig dargestellt (passt sich Hell- und Dunkelmodus an). Logos von den Websites der Partner. */
export const PARTNERS = [
  { name: 'SwiPay AG', rolle: 'Acquiring', href: 'https://swipay.ch', logo: '/images/partner/swipay.svg', w: 425, h: 86 },
  { name: 'PayTec AG', rolle: 'Terminals', href: 'https://www.paytec.ch', logo: '/images/partner/paytec.svg', w: 207, h: 64 },
  { name: 'Gnehm Kassensysteme GmbH', rolle: 'Kassensysteme', href: 'https://gnehm-kassen.ch', logo: '/images/partner/gnehm-kassen.png', w: 350, h: 87 },
  { name: 'bk POS GmbH', rolle: 'Kassensysteme', href: 'https://www.bkpos.ch', logo: '/images/partner/bkpos.png', w: 600, h: 120 },
  { name: 'Sulser Waagen GmbH', rolle: 'Waagen', href: 'https://www.sulser-waagen.ch', logo: '/images/partner/sulser-waagen.png', w: 398, h: 109 },
];

export function PartnerLogos() {
  return (
    <ul className="partners" aria-label="Partner">
      {PARTNERS.map((p) => (
        <li key={p.href}>
          <a className="partner" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}, ${p.rolle} (externe Website)`}>
            <Image src={p.logo} alt="" width={p.w} height={p.h} unoptimized />
            <span>{p.rolle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
