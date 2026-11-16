import type { Metadata } from 'next';
import Image from 'next/image';
import { getReferenzen, getSite, getTeam } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { CtaBand } from '@/components/content/CtaBand';
import { PartnerLogos } from '@/components/content/PartnerLogos';

export const metadata: Metadata = pageMeta({
  title: 'Über uns: wer hinter ibis payment steht',
  description: 'Ibis Payment GmbH, Vertriebspartner der SwiPay AG: Zahlterminals, Kassen und Online-Zahlungen für Betriebe in der ganzen Schweiz. Ein fester Ansprechpartner.',
  path: '/ueber-uns',
});

export default async function UeberUnsPage() {
  const [site, team, refs] = await Promise.all([getSite(), getTeam(), getReferenzen()]);
  return (
    <>
      <PageHero label="Über uns" title="Wer hinter ibis payment steht." lead="Ein Schweizer Unternehmen, das Zahlungssysteme verkauft, wie es sie selbst kaufen möchte: mit offenen Zahlen, einem festen Ansprechpartner und Begleitung bis zur ersten Zahlung." crumbs={[{ name: 'Über uns', href: '/ueber-uns' }]} />

      <Section label="Warum" sub="Weshalb es ibis payment gibt.">
        <Reveal>
          <Intro title="Wir haben zu oft gesehen, was Betriebe für ihr Terminal zahlen." text="Hohe Gebühren, lange Verträge und niemand, der abnimmt. Das Produkt selbst ist nicht kompliziert. Kompliziert wird es nur, wenn man die Preise versteckt. Also tun wir das nicht." />
        </Reveal>
        <div className="claims">
          <Reveal>
            <div className="claim">
              <h3>Vertriebspartner der SwiPay AG</h3>
              <p>{site.legalName} vertreibt die Bezahllösungen der SwiPay AG in Baar, mit einem Netzwerk von rund 30 Vertriebspartnern in der ganzen Schweiz. Acquiring über das SwiPay-Bezahlnetzwerk mit TeleCash/Fiserv, Terminals von PayTec aus Effretikon. Den Vertrag schliessen Sie mit der SwiPay AG.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="claim">
              <h3>Begleitung bis zur Inbetriebnahme</h3>
              <p>Von der ersten Beratung über die Kassenanbindung bis zur ersten Zahlung begleiten wir Ihr Projekt, in der ganzen Schweiz. Für Website, E-Mail und Netzwerk arbeiten wir mit InfraOne IT Solutions zusammen.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="claim">
              <h3>Ein Ansprechpartner</h3>
              <p>Wer Ihnen die Offerte macht, bleibt Ihr Ansprechpartner für Technik, Abrechnung und Vertrag. Das ist das ganze Konzept.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="grey" label="Geschäftsleitung" sub="Die Inhaber von ibis payment.">
        <div className="team-grid">
          {team.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) as 0 | 1 | 2}>
              <div className="team-card">
                <div className="team-photo">
                  {t.foto ? (
                    <Image src={t.foto} alt={`${t.name}, ${t.rolle}`} fill sizes="(max-width: 700px) 100vw, 420px" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                  ) : (
                    <span className="monogram" aria-hidden="true">
                      {t.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  )}
                </div>
                <div className="team-who">
                  <h3>{t.name}</h3>
                  <p>{t.rolle}</p>
                  {t.email && <a href={`mailto:${t.email}`}>{t.email}</a>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Partner" sub="Mit wem wir arbeiten.">
        <PartnerLogos />
        <div className="facts">
          <div>
            <span>Acquiring</span>
            <span>{site.partner.acquiring}</span>
          </div>
          <div>
            <span>Terminals</span>
            <span>{site.partner.terminals}</span>
          </div>
          {site.partner.kassen && (
            <div>
              <span>Kassensysteme</span>
              <span>{site.partner.kassen}</span>
            </div>
          )}
          {site.partner.waagen && (
            <div>
              <span>Waagen</span>
              <span>{site.partner.waagen}</span>
            </div>
          )}
          <div>
            <span>Website und IT</span>
            <span>{site.partner.it}</span>
          </div>
          <div>
            <span>Telefonie</span>
            <span>{site.partner.telefonie}</span>
          </div>
          {site.partner.versicherung && (
            <div>
              <span>Versicherungen</span>
              <span>{site.partner.versicherung}</span>
            </div>
          )}
          {site.partner.treuhand && (
            <div>
              <span>Treuhand</span>
              <span>{site.partner.treuhand}</span>
            </div>
          )}
        </div>
      </Section>

      {refs.length > 0 && (
        <Section label="Referenzen" sub="Stimmen aus Betrieben, die gewechselt haben.">
          <div className="quotes">
            {refs.map((r) => (
              <div className="qq" key={r.slug}>
                <p>«{r.zitat}»</p>
                <div className="who">
                  <b>{r.name}</b>
                  {r.betrieb}, {r.ort}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title="Lernen wir uns kennen." text="Ein Gespräch kostet nichts. Danach wissen Sie, was Sie heute zahlen und was Sie bei uns zahlen würden." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}
