import { TiltCard } from '@/components/devices/DeviceMini';
import { DevicePhoto, PHOTO_BY_KIND } from '@/components/devices/DevicePhoto';
import { Icon } from '@/components/ui/Icons';
import { DocMock, DOC_SPECS } from './DocMock';
import Image from 'next/image';
import Link from 'next/link';
import { BranchArt, branchKind } from './BranchArt';

/** Browser- und Handy-Mockup für Webdesign-Seiten (CSS, kein Bild nötig). */
export function BrowserMock() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480, paddingBottom: 20 }} aria-hidden="true">
      <div className="browser">
        <div className="bar">
          <i />
          <i />
          <i />
          <span />
        </div>
        <div className="page">
          <div className="ph-h" />
          <div className="ph-t" />
          <div className="ph-t s" />
          <div className="ph-img">
            <Icon.globe />
          </div>
          <div className="ph-btn" />
          <div className="cols">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div className="phone-mock">
        <div className="ps">
          <i />
          <i />
          <i />
          <b />
        </div>
      </div>
    </div>
  );
}


const BRANCH_DEVICE = {
  restaurant: { name: 'PayTec N86', href: '/geraete/paytec-n86', src: '/images/geraete/paytec-n86.webp' },
  detailhandel: { name: 'PayTec CT20P', href: '/geraete/paytec-ct20p', src: '/images/geraete/paytec-ct20p.webp' },
  coiffeur: { name: 'PayTec N62', href: '/geraete/paytec-n62', src: '/images/geraete/paytec-n62.webp' },
  praxis: { name: 'PayTec CT20P', href: '/geraete/paytec-ct20p', src: '/images/geraete/paytec-ct20p.webp' },
  marktstand: { name: 'PayTec N62', href: '/geraete/paytec-n62', src: '/images/geraete/paytec-n62.webp' },
} as const;

/** Visual nach Cluster: Terminal (Payment, Regional, Branchen), Browser (Webdesign), Icon (Wissen, Dienstleistungen). */
export function ClusterVisual({ cluster, pfad }: { cluster: string; pfad: string }) {
  if (cluster === 'webdesign') return <BrowserMock />;
  if (cluster === 'dienstleistung' || cluster === 'wissen') {
    const spec = DOC_SPECS[pfad];
    if (spec) return <DocMock spec={spec} />;
  }
  const scene = cluster === 'branche' ? branchKind(pfad) : null;
  if (scene) {
    const dev = BRANCH_DEVICE[scene];
    return (
      <div className="art-hero">
        <div className="art-card">
          <BranchArt kind={scene} />
        </div>
        <Link className="art-chip" href={dev.href}>
          <span className="ph">
            <Image src={dev.src} alt="" width={56} height={72} style={{ objectFit: 'contain' }} priority />
          </span>
          <span>
            <small>Passt dazu</small>
            <b>{dev.name}</b>
          </span>
        </Link>
      </div>
    );
  }
  const kind: keyof typeof PHOTO_BY_KIND = pfad.includes('marktstand') || pfad.includes('coiffeur') || pfad.includes('ostschweiz') ? 'mobile' : pfad.includes('praxis') || pfad.includes('detailhandel') || pfad.includes('kaufen') ? 'desk-keys' : 'mobile-printer';
  return (
    <TiltCard className="devcard" >
      <div className="viz" style={{ height: 300 }}>
        <DevicePhoto src={PHOTO_BY_KIND[kind].src} alt={PHOTO_BY_KIND[kind].alt} height={280} />
      </div>
    </TiltCard>
  );
}

