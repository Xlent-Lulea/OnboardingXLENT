import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoxDialogComponent, BoxDialogData } from '../box-dialog/box-dialog.component';
import { PersonService } from 'src/app/services/person.service';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  boxes = [
    { id: 0, title: 'Hej!', description: 'Placeholder text' },
    { id: 2, title: 'Buddy/Coach', description: 'Du har säkert redan träffat din Buddy, som är den som håller ihop din intro och har lite extra koll på att du får svar på dina frågor och funderingar. Sen efter några månader när du kommit igång, så kommer du få möjlighet att själv önska en coach.' },
    { id: 3, title: 'Startklar', description: 'Vi vill att du så snart som möjligt ska känna dig hemmastadd och redo för uppdrag. Det är det vi menar med ”Startklar”. För att hålla koll på vad som behöver göras under den första tiden på XLU så checklista som du får av din Buddy.' },
    { id: 4, title: 'Anställning och admin', description: 'Det finns en hel del praktisk formalia att fixa i samband med din anställningsstart. Veronica är vår VD och den som har koll på vad som behöver vara på plats när du börjar.' },
    { id: 5, title: 'Digital setup', description: 'Den digitala setupen handlar om att den utrustning och teknik som du behöver för att jobba som konsult hos XLU. Vi har en IT-ansvarig som heter Christian. Han hjälper dig om du stöter på problem' },
    { id: 6, title: 'Konsultrollen', description: 'På XLENT är vi alla konsulter som arbetar i uppdrag hos olika företag/organisationer. Som ny anställd får du en liten introduktion till vad det innebär att vara konsult på XLENT. Hör av dig till Ola när du vill ha din intro.' },
    { id: 7, title: 'Fokusgrupper', description: 'På XLU finns det ett antal fokusgrupper, detta för att vi effektivt ska kunna jobba med allt från hur vi mår till hur vi ska växa och frodas som bolag. Det är frivilligt att vara med i en eller flera fokusgrupper, men då det är viktigt för oss att alla känner sig delaktiga så uppmuntrar vi det.' },
    { id: 8, title: 'Jämställdhet', description: 'Lorem ipsum dolor sit amet consectetur. Mollis suspendisse nibh mus nec facilisis. Vitae nam eget sit eget. Neque eu augue sit tincidunt.Pretium sollicitudin quis elementum ac diam. Nec lectus senectus diam elementum.' },
    { id: 9, title: 'Avslut!', description: 'Lorem ipsum dolor sit amet consectetur. Mollis suspendisse nibh mus nec facilisis. Vitae nam eget sit eget. Neque eu augue sit tincidunt.Pretium sollicitudin quis elementum ac diam. Nec lectus senectus diam elementum.' },

  ];

  selectedPersonName$: Observable<string | null> = this.personService.selectedPerson$.pipe(
    map((person) => person?.name || 'N/A')
  );

  constructor(public dialog: MatDialog , private personService: PersonService,
    ) {}

  openDialog(boxData: BoxDialogData): void {

    this.dialog.open(BoxDialogComponent, {
      width: '400px',
      data: boxData
    });
  }


  openDialogForFirstBox(): void {
    this.selectedPersonName$.pipe(take(1)).subscribe(name => {
      const boxData = {
        id: 1,
        title: 'Hej ' + name + '!',
        description: 'Vi är väldigt glada att du blir en del av vårt gäng! Under första veckorna på XLENT så kommer det säkert bli många som du får hälsa på och säga hej till. Tag gärna chansen och surra en stund när du får tillfälle, så kommer du snabbt in i gänget"'  // Modify as needed
      };
      this.dialog.open(BoxDialogComponent, {
        width: '400px',
        data: boxData
      });
    });
  }

}
