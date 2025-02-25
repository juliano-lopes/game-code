import { AfterViewInit, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-welcome',
  imports: [MatCardModule],
  template: `
  <mat-card>
<h2 mat-card-subtitle>Seja bem-vindo!</h2>
<mat-card-content>
    <p>
      Selecione a guia da categoria desejada, por exemplo HTML, escolha um exercício e coloque os elementos em ordem! Vamos lá?
    </p>
</mat-card-content>
  </mat-card>
  `,
  styles: ``
})
export class WelcomeComponent implements AfterViewInit {
  title: string = "Game Code App";
  ngAfterViewInit(): void {
    document.title = this.title;
  }

}
