import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * Keystatic: eine Datenquelle für Texte, Preise, Geräte, Referenzen, FAQ und Landingpages.
 * Lokal: `npm run dev` und /keystatic aufrufen (Modus "local", schreibt in /content).
 * Auf Netlify: Modus "github" (Umgebungsvariable KEYSTATIC_GITHUB_REPO = "owner/repo",
 * dazu KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET; siehe README).
 */
const repo = process.env.KEYSTATIC_GITHUB_REPO;

const md = (label: string, description?: string) =>
  fields.text({ label, multiline: true, description: description ?? 'Markdown: Absätze durch Leerzeile, **fett**, Listen mit "- ".' });

export default config({
  storage:
    process.env.NODE_ENV === 'production' && repo
      ? { kind: 'github', repo: repo as `${string}/${string}` }
      : { kind: 'local' },
  ui: {
    brand: { name: 'ibis payment' },
    navigation: {
      Inhalte: ['site', 'konditionen', 'landingpages'],
      Daten: ['geraete', 'faq', 'referenzen', 'team'],
    },
  },
  singletons: {
    site: singleton({
      label: 'Firma und Kontakt',
      path: 'content/site',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Markenname', defaultValue: 'ibis payment' }),
        legalName: fields.text({ label: 'Rechtsname (Impressum)' }),
        uid: fields.text({ label: 'UID (CHE-…)' }),
        street: fields.text({ label: 'Strasse und Nr.' }),
        zip: fields.text({ label: 'PLZ' }),
        city: fields.text({ label: 'Ort' }),
        region: fields.text({ label: 'Einsatzgebiet (Text)' }),
        phone: fields.text({ label: 'Telefon (Anzeige)' }),
        phoneHref: fields.text({ label: 'Telefon (international, für tel:-Link, z. B. +41520000000)' }),
        email: fields.text({ label: 'E-Mail' }),
        openingHours: fields.text({ label: 'Erreichbarkeit (Text)' }),
        openingHoursSchema: fields.text({ label: 'Öffnungszeiten für Google (z. B. Mo-Fr 08:00-18:00)' }),
        vertretung: fields.text({ label: 'Vertretungsberechtigte Person' }),
        social: fields.object(
          {
            instagram: fields.text({ label: 'Instagram (ganzer Link, leer = Icon wird nicht angezeigt)' }),
            linkedin: fields.text({ label: 'LinkedIn (ganzer Link, leer = Icon wird nicht angezeigt)' }),
          },
          { label: 'Soziale Netzwerke' }
        ),
        berater: fields.object(
          {
            name: fields.text({ label: 'Name' }),
            role: fields.text({ label: 'Funktion' }),
            region: fields.text({ label: 'Region' }),
            phone: fields.text({ label: 'Direktwahl (Anzeige)' }),
            phoneHref: fields.text({ label: 'Direktwahl (international)' }),
            email: fields.text({ label: 'E-Mail' }),
            photo: fields.image({ label: 'Foto', directory: 'public/images/team', publicPath: '/images/team/' }),
          },
          { label: 'Ansprechperson mit Direktwahl (Startseite, Kontakt)' }
        ),
        service: fields.object(
          {
            ersatzgeraet: fields.text({ label: 'Ersatzgerät-Zusage' }),
            rueckruf: fields.text({ label: 'Rückruf-Zusage' }),
            wochenende: fields.text({ label: 'Wochenende' }),
            abrechnung: fields.text({ label: 'Abrechnung' }),
            wechsel: fields.text({ label: 'Wechsel' }),
          },
          { label: 'Servicezusagen (vom Kunden zu bestätigen)' }
        ),
        bestpreis: fields.text({ label: 'Bestpreis-Zusage (Satz)', multiline: true }),
        partner: fields.object(
          {
            acquiring: fields.text({ label: 'Acquiring-Partner' }),
            terminals: fields.text({ label: 'Terminal-Hersteller' }),
            kassen: fields.text({ label: 'Kassensysteme' }),
            waagen: fields.text({ label: 'Waagen' }),
            it: fields.text({ label: 'Website und IT' }),
            telefonie: fields.text({ label: 'Telefonie' }),
            versicherung: fields.text({ label: 'Versicherungen' }),
            treuhand: fields.text({ label: 'Treuhand' }),
          },
          { label: 'Partner' }
        ),
        vertragspartner: fields.text({
          label: 'Vertragspartner des Händlers (Acquiring und Terminals), Pflichtangabe',
          multiline: true,
        }),
        installation: fields.text({ label: 'Wer installiert vor Ort?' }),
      },
    }),
    konditionen: singleton({
      label: 'Konditionen (Höchstsätze)',
      path: 'content/konditionen',
      format: { data: 'yaml' },
      schema: {
        stand: fields.date({ label: 'Stand der Preise', validation: { isRequired: true } }),
        hinweis: fields.text({ label: 'Hinweis unter jeder Preisangabe', defaultValue: 'Preise exkl. MwSt.' }),
        debit: fields.number({ label: 'Debitkarten: Höchstsatz (%)', validation: { isRequired: true }, step: 0.01 }),
        debitKarten: fields.text({ label: 'Debitkarten: Aufzählung' }),
        kredit: fields.number({ label: 'Kreditkarten: Höchstsatz (%)', validation: { isRequired: true }, step: 0.01 }),
        kreditKarten: fields.text({ label: 'Kreditkarten: Aufzählung' }),
        quelle: fields.text({ label: 'Quelle und Hinweis zu den Sätzen', multiline: true }),
        weitere: fields.array(
          fields.object({
            label: fields.text({ label: 'Position' }),
            beschreibung: fields.text({ label: 'Beschreibung' }),
            wert: fields.text({ label: 'Wert (Text)' }),
          }),
          { label: 'Weitere Positionen (Text)', itemLabel: (p) => p.fields.label.value }
        ),
      },
    }),
  },
  collections: {
    geraete: collection({
      label: 'Terminals und Geräte',
      path: 'content/geraete/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Modellname' } }),
        hersteller: fields.text({ label: 'Hersteller', defaultValue: 'PayTec' }),
        kategorie: fields.select({
          label: 'Bauform',
          options: [
            { label: 'Mobil', value: 'mobil' },
            { label: 'Stationär', value: 'stationaer' },
            { label: 'Kassenintegriert', value: 'kassenintegriert' },
            { label: 'Automat (unattended)', value: 'automat' },
          ],
          defaultValue: 'mobil',
        }),
        reihenfolge: fields.number({ label: 'Reihenfolge' }),
        featured: fields.checkbox({ label: 'Auf der Startseite zeigen' }),
        kurz: fields.text({ label: 'Kurzbeschreibung (ein Satz)' }),
        beschreibung: md('Beschreibung'),
        einsatz: fields.array(fields.text({ label: 'Einsatz' }), { label: 'Typische Einsätze', itemLabel: (p) => p.value }),
        specs: fields.array(
          fields.object({ label: fields.text({ label: 'Merkmal' }), wert: fields.text({ label: 'Wert' }) }),
          { label: 'Technische Daten', itemLabel: (p) => `${p.fields.label.value}: ${p.fields.wert.value}` }
        ),
        datenblatt: fields.url({ label: 'Datenblatt (URL)' }),
        bild: fields.image({ label: 'Produktfoto', directory: 'public/images/geraete', publicPath: '/images/geraete/' }),
        bildAlt: fields.text({ label: 'Bildbeschreibung' }),
        metaDescription: fields.text({ label: 'Meta-Description' }),
      },
    }),
    faq: collection({
      label: 'FAQ',
      path: 'content/faq/*',
      slugField: 'frage',
      format: { data: 'yaml' },
      schema: {
        frage: fields.slug({ name: { label: 'Frage' } }),
        antwort: md('Antwort'),
        bereich: fields.select({
          label: 'Bereich',
          options: [
            { label: 'Konditionen', value: 'konditionen' },
            { label: 'Support', value: 'support' },
            { label: 'Geräte', value: 'geraete' },
            { label: 'Kassensysteme', value: 'kassen' },
            { label: 'Online-Zahlungen', value: 'online' },
            { label: 'Handy als Terminal', value: 'softpos' },
          ],
          defaultValue: 'konditionen',
        }),
        reihenfolge: fields.number({ label: 'Reihenfolge' }),
      },
    }),
    referenzen: collection({
      label: 'Referenzen (Kundenstimmen)',
      path: 'content/referenzen/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        betrieb: fields.text({ label: 'Betrieb' }),
        ort: fields.text({ label: 'Ort' }),
        zitat: fields.text({ label: 'Zitat', multiline: true }),
        aktiv: fields.checkbox({ label: 'Auf der Website zeigen (nur mit Freigabe der Person)' }),
      },
    }),
    team: collection({
      label: 'Team',
      path: 'content/team/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        rolle: fields.text({ label: 'Funktion' }),
        email: fields.text({ label: 'E-Mail' }),
        foto: fields.image({ label: 'Foto', directory: 'public/images/team', publicPath: '/images/team/' }),
        reihenfolge: fields.number({ label: 'Reihenfolge' }),
      },
    }),
    landingpages: collection({
      label: 'Landingpages (SEO, Branchen, Webdesign, Wissen)',
      path: 'content/landingpages/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Titel (H1)' } }),
        pfad: fields.text({ label: 'URL-Pfad (z. B. /zahlterminal-mieten)', validation: { isRequired: true } }),
        cluster: fields.select({
          label: 'Cluster',
          options: [
            { label: 'Payment', value: 'payment' },
            { label: 'Regional', value: 'regional' },
            { label: 'Branche', value: 'branche' },
            { label: 'Webdesign (InfraOne)', value: 'webdesign' },
            { label: 'Wissen', value: 'wissen' },
            { label: 'Dienstleistung', value: 'dienstleistung' },
          ],
          defaultValue: 'payment',
        }),
        navTitle: fields.text({ label: 'Kurztitel für Navigation und Breadcrumb' }),
        metaTitle: fields.text({ label: 'Meta-Title (max. 60 Zeichen)' }),
        metaDescription: fields.text({ label: 'Meta-Description (max. 155 Zeichen)' }),
        kicker: fields.text({ label: 'Label links im Raster' }),
        lead: fields.text({ label: 'Lead (1 bis 2 Sätze)', multiline: true }),
        intro: md('Einleitung'),
        sections: fields.array(
          fields.object({
            heading: fields.text({ label: 'Zwischentitel (H2)' }),
            body: md('Text'),
          }),
          { label: 'Abschnitte', itemLabel: (p) => p.fields.heading.value }
        ),
        beispiel: fields.object(
          {
            aktiv: fields.checkbox({ label: 'Beispielrechnung zeigen' }),
            titel: fields.text({ label: 'Titel' }),
            branche: fields.select({
              label: 'Branche im Rechner (wie bei SwiPay)',
              options: [
                { label: 'Gastronomie', value: 'gastro' },
                { label: 'Detailhandel / Ladengeschäft', value: 'retail' },
                { label: 'Beauty & Wellness', value: 'beauty' },
                { label: 'Hotellerie', value: 'hotel' },
                { label: 'Kiosk, Take-away & Tankstelle', value: 'kiosk' },
                { label: 'Online-Shop', value: 'ecom' },
                { label: 'Dienstleistung & Beratung', value: 'dienstleistung' },
                { label: 'Verein & Verband', value: 'verein' },
                { label: 'Sonstige', value: 'sonstige' },
              ],
              defaultValue: 'sonstige',
            }),
            umsatz: fields.number({ label: 'Kartenumsatz pro Monat (CHF), Annahme' }),
            bon: fields.number({ label: 'Durchschnittsbon (CHF): Branchenwert von SwiPay verwenden' }),
            kreditanteil: fields.number({ label: 'Kreditkartenanteil (%), nicht mehr verwendet' }),
            vergleich: fields.text({ label: 'Vergleichs-Kennung, nicht mehr verwendet', defaultValue: 'gross' }),
            erklaerung: fields.text({ label: 'Erklärung', multiline: true }),
          },
          { label: 'Beispielrechnung (rechnet wie der SwiPay-Rechner)' }
        ),
        preisliste: fields.array(
          fields.object({
            label: fields.text({ label: 'Position' }),
            beschreibung: fields.text({ label: 'Beschreibung' }),
            wert: fields.text({ label: 'Wert' }),
          }),
          { label: 'Preisliste (optional)', itemLabel: (p) => p.fields.label.value }
        ),
        faq: fields.array(
          fields.object({ frage: fields.text({ label: 'Frage' }), antwort: md('Antwort') }),
          { label: 'FAQ', itemLabel: (p) => p.fields.frage.value }
        ),
        bausteine: fields.object(
          {
            rechner: fields.checkbox({ label: 'Rechner einbetten' }),
            geraete: fields.checkbox({ label: 'Geräte-Übersicht einbetten' }),
            zerlegung: fields.checkbox({ label: 'Gebühren-Zerlegung einbetten' }),
            preisliste: fields.checkbox({ label: 'Preisliste (Konditionen) einbetten' }),
          },
          { label: 'Bausteine' }
        ),
        formular: fields.select({
          label: 'Formular am Seitenende',
          options: [
            { label: 'Keines (CTA-Band)', value: 'none' },
            { label: 'Kontakt (ibis)', value: 'kontakt' },
            { label: 'Webdesign-Anfrage (an InfraOne)', value: 'webdesign' },
            { label: 'Prämien-Check', value: 'praemiencheck' },
            { label: 'Abrechnung einreichen', value: 'abrechnung' },
          ],
          defaultValue: 'none',
        }),
        cta: fields.object(
          {
            titel: fields.text({ label: 'CTA-Titel' }),
            text: fields.text({ label: 'CTA-Text' }),
            label: fields.text({ label: 'Button' }),
            href: fields.text({ label: 'Ziel' }),
          },
          { label: 'CTA-Band' }
        ),
        verwandt: fields.array(fields.text({ label: 'Pfad' }), { label: 'Verwandte Seiten (Pfade)', itemLabel: (p) => p.value }),
      },
    }),
  },
});
