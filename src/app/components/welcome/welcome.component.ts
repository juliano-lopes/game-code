import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../../services/progress.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-welcome',
  imports: [MatCardModule, CommonModule, MatProgressBarModule],
  template: `
  <mat-card>
    <mat-card-header>
      <div class="container-column center">
<h2 mat-card-title>Seja bem-vindo!</h2>
<mat-progress-bar aria-hidden="true" mode="determinate" [value]="generalProgress"></mat-progress-bar>
        <mat-card-subtitle>{{generalProgress}}% de todos os exercícios concluídos</mat-card-subtitle>
</div>
</mat-card-header>
<mat-card-content>
    <p>
      Selecione a guia da categoria desejada, por exemplo HTML, escolha um exercício e coloque seu  aprendizado em prática! Vamos lá?
    </p>
</mat-card-content>
  </mat-card>
  `,
  styles: ``
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  title: string = "Game Code App";
  generalProgress: number = 0;
  constructor(private progressService: ProgressService) { }
  ngOnInit(): void {
    this.progressService.generalProgress().then((percentage) => {
      this.generalProgress = percentage;
      console.log("no init foi ", percentage);

    });
  }


  ngAfterViewInit(): void {
    document.title = this.title;
  }

}
