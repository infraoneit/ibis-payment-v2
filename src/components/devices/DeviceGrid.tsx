import { DeviceMini, TiltCard, type MiniKind } from './DeviceMini';
import { DevicePhoto, PHOTO_BY_KIND } from './DevicePhoto';
import { Reveal } from '@/components/motion/Reveal';
import Link from 'next/link';
import { chf } from '@/lib/format';
import { tilePlan } from '@/lib/tiles';
import { Arrow } from '@/components/layout/Section';
import type { Geraet } from '@/lib/content';

export function miniKind(g: Pick<Geraet, 'kategorie' | 'slug'>): MiniKind {
  if (g.kategorie === 'mobil') return g.slug === 'paytec-n62' ? 'mobile' : 'mobile-printer';
  if (g.kategorie === 'kassenintegriert') return 'desk-keys';
  if (g.kategorie === 'stationaer') return 'desk';
  if (g.slug === 'paytec-n62-vending') return 'small';
  return 'auto';
}

export const KATEGORIE_LABEL: Record<string, string> = { mobil: 'Mobil', stationaer: 'Stationär', kassenintegriert: 'Kassenintegriert', automat: 'Automat' };

/** Geräte-Karten mit Produktfoto (Fallback 3D-Miniatur), Preis aus der Datenquelle. */
export function DeviceGrid({ geraete }: { geraete: Geraet[] }) {
  const plan = tilePlan(geraete.length);
  return (
    <div className="devgrid tiles" data-cols={plan.cols} data-md={plan.md}>
      {geraete.map((g, i) => (
        <Reveal key={g.slug} delay={(i % 3) as 0 | 1 | 2}>
          <TiltCard href={`/geraete/${g.slug}`}>
            <div className="viz">
              {g.bild ? <DevicePhoto src={g.bild} alt={g.bildAlt || g.name} /> : <DeviceMini kind={miniKind(g)} />}
            </div>
            <div>
              <div className="lbl" style={{ marginBottom: 8 }}>
                {KATEGORIE_LABEL[g.kategorie]}
              </div>
              <h3>{g.name}</h3>
            </div>
            <p>{g.kurz}</p>
            <div className="pr num">
              {g.mieteMonat != null ? (
                <>
                  {chf(g.mieteMonat, 2)} <small>/ Monat</small>
                  {g.kauf != null && <small> · Kauf {chf(g.kauf)}</small>}
                </>
              ) : (
                'Offerte pro Projekt'
              )}
            </div>
          </TiltCard>
        </Reveal>
      ))}
      {plan.filler && (
        <Reveal delay={(geraete.length % 3) as 0 | 1 | 2}>
          <Link href="/kontakt" className="devcard tile-cta">
            <h3>Welches Terminal passt?</h3>
            <p>Wir schauen uns Ihren Ablauf vor Ort an und bringen das passende Gerät gleich mit.</p>
            <span className="more">
              Beratung vor Ort <Arrow />
            </span>
          </Link>
        </Reveal>
      )}
    </div>
  );
}

/** Drei Bauformen für die Startseite. */
export function BauformGrid() {
  const items: { kind: MiniKind; title: string; text: string; href: string }[] = [
    { kind: 'mobile-printer', title: 'Mobil', text: 'Service am Tisch, Lieferdienst, Markt. 4G und WLAN, Akku für den ganzen Tag.', href: '/geraete#mobil' },
    { kind: 'desk-keys', title: 'Stationär', text: 'Kassenplatz im Laden, in der Praxis, am Empfang. Mit Kassenanbindung und PIN-Pad.', href: '/geraete#stationaer' },
    { kind: 'auto', title: 'Automat', text: 'Verkaufs- und Waschautomaten, Parking, Ladestationen. Unbeaufsichtigt, rund um die Uhr.', href: '/geraete#automat' },
  ];
  return (
    <div className="devgrid tiles" data-cols="3" data-md="3">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i as 0 | 1 | 2}>
          <TiltCard href={it.href}>
            <div className="viz">
              <DevicePhoto src={PHOTO_BY_KIND[it.kind].src} alt={PHOTO_BY_KIND[it.kind].alt} />
            </div>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
