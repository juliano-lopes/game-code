import { AfterViewInit, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Exercise } from '../../types/exercise';
import { MultipleChoiceExerciseComponent } from "../multiple-choice-exercise/multiple-choice-exercise.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-welcome',
  imports: [MatCardModule, MultipleChoiceExerciseComponent, CommonModule],
  template: `
  <mat-card>
<h2 mat-card-subtitle>Seja bem-vindo!</h2>
<mat-card-content>
    <p>
      Selecione a guia da categoria desejada, por exemplo HTML, escolha um exercício e coloque os elementos em ordem! Vamos lá?
    </p>
</mat-card-content>
  </mat-card>
  <div *ngIf="exercise.type === 'multiple-choice'">
        <app-multiple-choice-exercise [exercise]="exercise"></app-multiple-choice-exercise>
    </div>
  `,
  styles: ``
})
export class WelcomeComponent implements AfterViewInit {
  title: string = "Game Code App";
  exercise: Exercise = { instructions: "Instruções", statement: "Resolva este exercício", type: "multiple-choice", number: 1, moduleId: "444" };
  ngAfterViewInit(): void {
    document.title = this.title;
  }

}
