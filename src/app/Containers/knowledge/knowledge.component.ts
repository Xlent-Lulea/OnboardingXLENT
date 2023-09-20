import { Component } from '@angular/core';


@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],

})
export class KnowledgeComponent {

  focusGroups = [
    {
      heading: 'VD, ledningsfrågor',
      subheading: 'Ansvarig: Veronica Andersson',
      tasks: [
        '•Formellt personalansvar, chef för XLUs anställda',
        '•Deltagande på ledningsmöten och andra möten mellan bolag',
      	'•Signerar avtal och genomför säkerhetsavtal',
      	'•Säkerhetsansvarig XLU',
      	'•Huvudsaklig kontaktperson till/från andra XLENT-bolag samt VD XCG.',
      	'•Medverkan i rekryteringar i 2a intervju.',
      	'•Månadsrapport XCG',
      	'•Attest av fakturor',
      	'•Godkännande av tidrapporter',
      ]
    },

    {
      heading: 'Medarbetarenkät',
      subheading: 'Ansvarig: Christian Werme',
      tasks: [
        '•	Skickar ut enkät och sammanställer resultat 2 ggr per år ',

      ]
    },

    {
      heading: 'Rekrytering',
      subheading: 'Ansvarig: Alexandra Rönnkvist',
      tasks: [
        '•	Ansvarig för rekryteringsprocessen',
        '•	Samarbete med rekryteringsfirmor',
        '•	Sammanhållande av rekryterings-processen för varje rekrytering',
        '•	Planera för kommande rekryteringar, vem som skriver annons, vilka som ska delta på intervjuer m.m ',
        '•	Ansvarar för pågående rekryteringar och beslut',
        '•	Informerar övriga och tar in input kring beslut'
      ]
    },

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
      heading: 'Sälj och relationsbyggande ',
      subheading: 'Ansvarig: Sofia Flodmark',
      tasks: [
        '•	Bevaka beläggning framåt',
        '•	Bevaka ramavtal (nya och befintliga avrop)',
        '•	Nätverksbyggande (delta på nätverksträffar, planera för egna arrangemang, representera etc)',
        '•	Stötta konsulter i eget säljarbete (om konsult ej har full beläggning blir denne automatiskt med i fokusgrupp sälj)',
        '•	Säljaktiviteter nya kunder'
      ]
    },

    {
      heading: 'Markad - Kund och event, synlighet',
      subheading: 'Ansvarig: Sofia Flodmark',
      tasks: [
        '•	Marknadsföring av XLU',
        '•	Delta på externa event'
      ]
    },

    {
      heading: 'Lokaler',
      subheading: 'Ansvarig: Katja Perunka',
      tasks: [
        '•	Upprätta och underhålla dokumentationen rörande lokaler och lösöre.',
        '•	Företagets kontakt med de servicebolag XLENT Luleå har avtal/kontakt med.'

      ]
    },
    {
      heading: 'Onboarding',
      subheading: 'Ansvarig: Emmy Valfridsson',
      tasks: [
        '•	Ansvarar för och utvecklar processen för att ta emot nyanställda',
        '•	Initiera onboardingprocessen vid nyanställning enligt överenskommelse i dokumentation',
        '•	Ansvara för samordning av årlig fotografering'
      ]
    },
    {
      heading: 'Hälsoundersökning',
      subheading: 'Ansvarig: Emmy Valfridsson',
      tasks: [
        '•	Att hälsoundersökning genomförs vartannat år'
      ]
    },
    {
      heading: 'IT & telefoni',
      subheading: 'Ansvarig: Christian Werme',
      tasks: [
        '•	Beställningar av utrustning kopplat till teknik såsom Telefoner, Datorer, teknisk utrustning till kontor.',
        '•	Telefonabonnemang.',
        '•	Vara behjälplig om någon har problem med teknik.'

      ]
    },
    {
      heading: 'Sociala aktiviteter (internt) (fokusgrupp)',
      subheading: 'Ansvarig: August Wande',
      tasks: [
        '•	Ansvarig för rekryteringsprocessen',
        '•	Samarbete med rekryteringsfirmor',
        '•	Sammanhållande av rekryterings-processen för varje rekrytering',
        '•	Planera för kommande rekryteringar, vem som skriver annons, vilka som ska delta på intervjuer m.m ',
        '•	Ansvarar för pågående rekryteringar och beslut',
        '•	Informerar övriga och tar in input kring beslut'
      ]
    },
    {
      heading: 'HR',
      subheading: 'Ansvarig: Christian Wande',
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
      heading: 'Coach',
      subheading: 'Ansvarig: Katja Perunka',
      tasks: [
        '•	Utbyter erfarenhet mellan coacherna',
        '•	Utvecklar processen för att säkerställa att fånga upp medarbetarnas mående'
      ]
    },
    {
      heading: 'Studentambassadör',
      subheading: 'Ansvarig: August Wande',
      tasks: [
        '•	Ansvarig LITA',
        '•	Kontaktperson gentemot Universitet',
        '•	Initiera Studentträffar',
      ]
    },


  ];
}

