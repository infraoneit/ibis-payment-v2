import Link from 'next/link';
import { Icon } from '@/components/ui/Icons';
import { Arrow } from '@/components/layout/Section';
import { iconForPage } from '@/lib/icons-for';
import { Reveal } from '@/components/motion/Reveal';
import { BranchArt, branchKind } from '@/components/content/BranchArt';
import { tilePlan } from '@/lib/tiles';
import type { Landingpage } from '@/lib/content';

export type TileCta = { title: string; text: string; label: string; href: string };

const DEFAULT_CTA: TileCta = { title: 'Nicht dabei, was Sie suchen?', text: 'Rufen Sie an oder schreiben Sie uns. Ein Gespräch kostet nichts.', label: 'Kontakt aufnehmen', href: '/kontakt' };

/** Kartenraster für Hub-Seiten (Branchen, Wissen): Zeichnung oder Icon, Titel, Lead, Link.
 *  Alle Kacheln einer Reihe sind gleich hoch; geht die Anzahl nicht auf, schliesst eine Kachel mit Aufruf die Reihe (lib/tiles.ts). */
export function HubGrid({ pages, cta }: { pages: Landingpage[]; cta?: TileCta }) {
  const plan = tilePlan(pages.length);
  const c = cta ?? DEFAULT_CTA;
  return (
    <div className="hub tiles" data-cols={plan.cols} data-md={plan.md}>
      {pages.map((p, i) => {
        const I = Icon[iconForPage(p.pfad, `${p.navTitle} ${p.title}`)];
        const art = p.cluster === 'branche' ? branchKind(p.pfad) : null;
        return (
          <Reveal key={p.pfad} delay={(i % 3) as 0 | 1 | 2}>
            <Link href={p.pfad} className={art ? 'has-art' : undefined}>
              {art ? (
                <span className="tile-art">
                  <BranchArt kind={art} decorative />
                </span>
              ) : (
                <span className="icon-ring" aria-hidden="true">
                  <I />
                </span>
              )}
              <h3>{p.navTitle || p.title}</h3>
              <p>{p.lead}</p>
              <span className="more">
                Weiterlesen <Arrow />
              </span>
            </Link>
          </Reveal>
        );
      })}
      {plan.filler && (
        <Reveal delay={(pages.length % 3) as 0 | 1 | 2}>
          <Link href={c.href} className="tile-cta">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <span className="more">
              {c.label} <Arrow />
            </span>
          </Link>
        </Reveal>
      )}
    </div>
  );
}
