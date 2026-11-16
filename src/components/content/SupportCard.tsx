import Image from 'next/image';
import type { Site } from '@/lib/content';
import { CountUp } from '@/components/motion/CountUp';

/** Ansprechperson mit Foto, Direktwahl und E-Mail. */
export function BeraterCard({ site }: { site: Site }) {
  const b = site.berater;
  return (
    <div className="person">
      <div className="photo">
        {b.photo ? <Image src={b.photo} alt={`${b.name}, ${b.role}`} width={132} height={166} /> : <span>Foto Berater [Platzhalter]</span>}
      </div>
      <div className="who">
        <b>{b.name}</b>
        <span>
          {b.role}
          {b.region ? `, ${b.region}` : ''}
        </span>
        {b.email && (
          <a className="mail" href={`mailto:${b.email}`}>
            {b.email}
          </a>
        )}
        <a className="t num" href={`tel:${b.phoneHref}`}>
          <span className="ring" aria-hidden="true">
            <i />
            <i />
          </span>
          {b.phone}
        </a>
      </div>
    </div>
  );
}

export function SupportStats() {
  return (
    <div className="stats">
      <div className="stat">
        <b>
          <CountUp to={24} />
          <small>h</small>
        </b>
        <span>Antwort an Werktagen, mit Ihrer Vergleichsrechnung</span>
      </div>
      <div className="stat">
        <b>
          <CountUp to={72} />
          <small>h</small>
        </b>
        <span>im Normalfall vom Vertrag bis zur ersten Zahlung</span>
      </div>
      <div className="stat">
        <b>
          <CountUp to={1} />
          <small>Person</small>
        </b>
        <span>Ihr Ansprechpartner für Abrechnung, Technik und Vertrag</span>
      </div>
    </div>
  );
}
