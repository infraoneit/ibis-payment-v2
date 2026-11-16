import type { Metadata } from 'next';
import { getLandingpages, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';
import { HubGrid } from '@/components/content/HubGrid';
import { CtaBand } from '@/components/content/CtaBand';
import { BranchStack } from '@/components/content/BranchArt';

export const metadata: Metadata = pageMeta({
  title: 'Branchen: welches Terminal zu welchem Betrieb passt',
  description: 'Zahlterminal für Restaurant, Coiffeur, Detailhandel, Praxis und Marktstand, mit Beispielrechnung pro Branche. Beratung in der ganzen Schweiz.',
  path: '/branchen',
});

export default async function BranchenPage() {
  const [site, all] = await Promise.all([getSite(), getLandingpages()]);
  const order = ['/branchen/restaurant', '/branchen/detailhandel', '/branchen/coiffeur', '/branchen/praxis', '/branchen/marktstand'];
  const branchen = all.filter((p) => p.cluster === 'branche').sort((a, b) => order.indexOf(a.pfad) - order.indexOf(b.pfad));
  return (
    <>
      <PageHero label="Branchen" title="Jeder Betrieb kassiert anders." lead="Am Tisch, am Tresen, am Marktstand oder am Empfang: Wir zeigen pro Branche, welches Terminal passt, was die Kasse können muss und was eine typische Abrechnung kostet." crumbs={[{ name: 'Branchen', href: '/branchen' }]} visual={<BranchStack />} />
      <Section label="Branchen" sub="Mit Beispielrechnung aus dem Rechner.">
        <HubGrid pages={branchen} cta={{ title: 'Ihre Branche fehlt?', text: 'Bäckerei, Fitnessstudio, Kiosk, Verein oder Hofladen: Terminals und Konditionen sind dieselben. Wir zeigen Ihnen, was bei Ihnen passt.', label: 'Beratung anfragen', href: '/kontakt' }} />
      </Section>
      <CtaBand title="Welches Terminal passt zu Ihrem Betrieb?" text="Wir schauen uns Ihren Ablauf vor Ort an. Bringen Sie Ihre letzte Abrechnung mit, dann rechnen wir gleich nach. Ein Gespräch kostet nichts." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}
