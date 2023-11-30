import { Component } from '@angular/core';


@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],

})
export class KnowledgeComponent {

  focusGroups = [
    {
      heading: 'Coach (valbar roll för de som är partner)',
      subheading: 'Ansvarig: Katja Perunka',
      tasks: [
        '•	Utbyter erfarenhet mellan coacherna',
        '•	Utvecklar processen för att säkerställa att fånga upp medarbetarnas mående'
      ]
    },
    {
      heading: 'HR',
      subheading: 'Ansvarig: Christian Werme',
      tasks: [
        'Ta fram och utveckla processer för:',
        '•	Kultur/värderingar - Utvecklar beskrivning av XLU företagskultur och hur vi omsätter kulturen i praktiken',
        '•	Arbetsmiljö',
        '•	Uppföljning av uppsatta HR-mål',
        '•	Utvecklar koncept för kompetensutveckling',
        '•	Uppföljning medarbetarenkät'
      ]
    },
    {
      heading: 'Kosegruppa (Interna sociala aktiviteter)',
      subheading: 'Ansvarig: August Wande',
      tasks: [
        '•	Samla in önskemål om möjliga interna sociala aktiviteter',
        '•	Planera och tidsätta när aktiviteter genomförs',
        '•	Roliga aktiviteter',
        '•	Kickoffer och konferenser'
      ]
    },
    {
      heading: 'Lokaler',
      subheading: 'Ansvarig: Katja Perunka',
      tasks: [
        '•	Upprättar och underhålla dokumentationen rörande lokaler och lösöre',
        '•	Företagets kontakt med de servicebolag XLENT Luleå har avtal/kontakt med',
        '•	Genomgång lokaler med nyanställd'
      ]
    },
    {
      heading: 'Marknad',
      subheading: 'Ansvarig: Sofia Flodmark',
      tasks: [
        '•	Marknadsföring av XLU',
        '•	Delta på externa event'
      ]
    },
    {
      heading: 'Onboarding',
      subheading: 'Ansvarig: Emmy Valfridsson',
      tasks: [
        '•	Ansvarar för och utvecklar processen för att ta emot nyanställda',
        '•	Initierar onboardingprocessen vid nyanställning',
        '•	Ansvarar för samordning av fotografering'
      ]
    },
    {
      heading: 'Rekrytering',
      subheading: 'Ansvarig: Alexandra Rönnkvist',
      tasks: [
        '•	Ansvarar för rekryteringsprocessen',
        '•	Samarbete med rekryteringsfirmor',
        '•	Sammanhållande av rekryterings-processen för varje rekrytering',
        '•	Planera för kommande rekryteringar, vem som skriver annons, vilka som ska delta på intervjuer m.m ',
        '•	Ansvarar för pågående rekryteringar och beslut',
        '•	Informerar övriga och tar in input kring beslut'
      ]
    },
    {
      heading: 'Sälj',
      subheading: 'Ansvarig: Sofia Flodmark',
      tasks: [
        '•	Bevakar beläggning framåt',
        '•	Bevakar ramavtal (nya och befintliga avrop)',
        '•	Nätverksbyggande (delta på nätverksträffar, bygga relationer, planera för egna arrangemang, representera etc)',
        '•	Stöttar konsulter i eget säljarbete',
        '•	Säljaktiviteter nya kunder'
      ]
    },
  ];
  areaofResponsibility = [
    {
      heading: 'Ekonomi',
      subheading: 'Ansvarig: Veronica Andersson',
      tasks: [
        '•	Håller ihop arbete med budget och prognoser',
        '•	Ekonomisk uppföljning och rapportering till övriga inom XLU',
        '•	Attest av fakturor',

      ]
    },
  {
    heading: 'Hälsoundersökning',
    subheading: 'Ansvarig: Emmy Valfridsson',
    tasks: [
      '•	Ansvarar för att hälsoundersökning genomförs vartannat år'
    ]
    },
    {
      heading: 'IT & telefoni',
      subheading: 'Ansvarig: Christian Werme',
      tasks: [
        '•	Beställningar av utrustning kopplat till teknik såsom telefoner, datorer, teknisk utrustning till kontor',
        '•	Telefonabonnemang',
        '•	Vara behjälplig om någon har problem med teknik'

      ]
    },
    {
      heading: 'Studentambassadör',
      subheading: 'Ansvarig: August Wande',
      tasks: [
        '•	Ansvarig LITA',
        '•	Kontaktperson gentemot universitet',
        '•	Initierar studentträffar',
      ]
    },
  {
    heading: 'VD, ledningsfrågor',
    subheading: 'Ansvarig: Veronica Andersson',
    tasks: [
      '•Formellt personalansvar, chef för XLUs anställda',
      '•Deltagande på ledningsmöten och andra möten mellan bolag',
      '•Signerar avtal och genomför säkerhetsavtal',
      '•Säkerhetsansvarig XLU',
      '•Huvudsaklig kontaktperson till/från andra XLENT-bolag samt VD XCG',
      '•Månadsrapport XCG',
      '•Attest av fakturor',
      '•Godkännande av tidrapporter',
    ]
  },
];
}

