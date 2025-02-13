import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [],
  template: `
    <p>
      Seja bem-vindo ao Code Game, selecione a categoria de exercícios e vamos lá!
    </p>
  `,
  styles: ``
})
export class WelcomeComponent implements AfterViewInit {
  title: string = "Game Code App";
  ngAfterViewInit(): void {
    document.title = this.title;
  }

}
