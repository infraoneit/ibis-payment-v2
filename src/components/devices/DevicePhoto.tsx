import Image from 'next/image';
import type { MiniKind } from './DeviceMini';

/** Produktfotos von PayTec (www.paytec.ch, Produktseiten), freigestellt und als WebP unter /images/geraete. */
export const PHOTO_BY_KIND: Record<MiniKind, { src: string; alt: string }> = {
  mobile: { src: '/images/geraete/paytec-n62.webp', alt: 'PayTec N62, mobiles Zahlterminal ohne Drucker' },
  'mobile-printer': { src: '/images/geraete/paytec-n86.webp', alt: 'PayTec N86, mobiles Zahlterminal mit Drucker' },
  'desk-keys': { src: '/images/geraete/paytec-ct20p.webp', alt: 'PayTec CT20P, Zahlterminal mit PIN-Pad für den Kassenplatz' },
  desk: { src: '/images/geraete/paytec-v3ct3.webp', alt: 'PayTec V3CT3, Tischterminal mit Drucker' },
  small: { src: '/images/geraete/paytec-n62-vending.webp', alt: 'PayTec N62 Vending, kompaktes Automatenterminal' },
  auto: { src: '/images/geraete/paytec-un20.webp', alt: 'PayTec UN20, Einbauterminal für Automaten' },
};

/** Produktfoto in Karten. data-mini: TiltCard neigt das Foto beim Überfahren wie zuvor die Miniatur. */
export function DevicePhoto({ src, alt, height = 230 }: { src: string; alt: string; height?: number }) {
  return (
    <div className="devphoto" data-mini style={{ height }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 700px) 60vw, 300px" style={{ objectFit: 'contain' }} />
    </div>
  );
}
