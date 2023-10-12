import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  selectedPersonName$: Observable<string | null> = this.personService.selectedPerson$.pipe(
    map((person) => person?.name || 'N/A')
  );

  constructor(
    private personService: PersonService,
  ) { }

  isActive = 1;

  // Define the slides array
  slides = [
    {
      title: "PLACEHOLDER",
      content: "Vi är väldigt glada att du blir en del av vårt gäng! Under första veckorna på XLENT så kommer det säkert bli många som du får hälsa på och säga hej till. Tag gärna chansen och surra en stund när du får tillfälle, så kommer du snabbt in i gänget",
      imagePath: "../../../assets/image 4.png"
    },
    {
      title: "Buddy/coach",
      content: "Du har säkert redan träffat din Buddy, som är den som håller ihop din intro och har lite extra koll på att du får svar på dina frågor och funderingar. Sen efter några månader när du kommit igång, så kommer du få möjlighet att själv önska en coach.",
      imagePath: "../../../assets/image 5.png"
    },
    {
      title: "Startklar",
      content: "Vi vill att du så snart som möjligt ska känna dig hemmastadd och redo för uppdrag. Det är det vi menar med ”Startklar”. För at hålla koll på vad som behöver göras under den första tiden på XLU så checklista som du får av din Buddy.",
      imagePath: "../../../assets/image 4.png"
    },
    {
      title: "Anställning och admin",
      content: "Det finns en hel del praktisk formalia att fixa i samband med din anställningsstart. Veronica är vår VD och den som har koll på vad som behöver vara på plats när du börjar.",
      imagePath: "../../../assets/image 4.png"
    },
    {
      title: "Digital setup",
      content: "Den digitala setupen handlar om att den utrustning och teknik som du behöver för att jobba som konsult hos XLU. Vi har en IT-ansvarig som heter Christian. Han hjälper dig om du stöter på problem",
      imagePath: "../../../assets/image 4.png"
    },
    {
      title: "Konsultrollen",
      content: "På XLENT är vi alla konsulter som arbetar i uppdrag hos olika företag/organisationer. Som ny anställd får du en liten introduktion till vad det innebär att vara konsult på XLENT. Hör av dig till Ola när du vill ha din intro.",
      imagePath: "../../../assets/image 4.png"
    },
    {
      title: "Fokusgrupper",
      content: "Lorem ipsum dolor sit amet consectetur. Mollis suspendisse nibh mus nec facilisis. Vitae nam eget sit eget. Neque eu augue sit tincidunt.Pretium sollicitudin quis elementum ac diam. Nec lectus senectus diam elementum.",
      imagePath: "../../../assets/image 4.png"
    },
    {
      title: "Jämställdhet",
      content: "Lorem ipsum dolor sit amet consectetur. Mollis suspendisse nibh mus nec facilisis. Vitae nam eget sit eget. Neque eu augue sit tincidunt.Pretium sollicitudin quis elementum ac diam. Nec lectus senectus diam elementum.",
      imagePath: "../../../assets/image 4.png"
    },
    {
      title: "Avslut!",
      content: "Lorem ipsum dolor sit amet consectetur. Mollis suspendisse nibh mus nec facilisis. Vitae nam eget sit eget. Neque eu augue sit tincidunt.Pretium sollicitudin quis elementum ac diam. Nec lectus senectus diam elementum.",
      imagePath: "../../../assets/image 4.png"
    },

  ];

  totalSlides = this.slides.length;

  next() {
    if (this.isActive == this.totalSlides) this.isActive = 1;
    else this.isActive++;
  }

  pre() {
    if (this.isActive == 1) this.isActive = this.totalSlides;
    else this.isActive--;
  }
}
