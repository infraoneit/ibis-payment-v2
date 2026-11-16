import type { Site } from '@/lib/content';

/* Icons im Stil der übrigen Website (24er-Raster, 1.75 px Strich, currentColor). */
const Instagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 10.5V17M8 7.2v.1M12 17v-3.6a2.4 2.4 0 0 1 4.8 0V17M12 10.5V17" />
  </svg>
);

const NETWORKS = [
  { key: 'instagram', name: 'Instagram', Icon: Instagram },
  { key: 'linkedin', name: 'LinkedIn', Icon: LinkedIn },
] as const;

/** Links zu den Profilen von ibis payment. Ein Netzwerk erscheint nur, wenn in «Firma und Kontakt» ein Link hinterlegt ist.
 *  Einfache Links, keine eingebetteten Plugins: Es fliessen erst Daten, wenn jemand klickt. */
export function socialUrls(site: Site): string[] {
  return NETWORKS.map((n) => site.social?.[n.key]?.trim()).filter((u): u is string => !!u);
}

export function SocialLinks({ site, label = false }: { site: Site; label?: boolean }) {
  const items = NETWORKS.map((n) => ({ ...n, url: site.social?.[n.key]?.trim() })).filter((n) => n.url);
  if (!items.length) return null;
  return (
    <ul className={`social${label ? ' with-label' : ''}`} aria-label="ibis payment in sozialen Netzwerken">
      {items.map(({ key, name, Icon, url }) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`ibis payment auf ${name} (externe Seite)`} title={name}>
            <Icon />
            {label && <span>{name}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
