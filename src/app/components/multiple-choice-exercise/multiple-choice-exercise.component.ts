import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MultipleChoiceExerciseService } from '../../services/multiple-choice-exercise.service';
import { MultipleChoiceQuestion } from '../../types/exercise';
import { ResolutionService } from '../../services/resolution.service';
import { Exercise } from '../../types/exercise';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-multiple-choice-exercise',
  templateUrl: './multiple-choice-exercise.component.html',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatRadioModule],
  styleUrls: ['./multiple-choice-exercise.component.css'],
})
export class MultipleChoiceExerciseComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('exerciseTitle') questionTitle!: ElementRef;
  @Input() exercise!: Exercise;
  @Input() isNextExerciseAvailable: boolean = false;
  @Output() nextExercise = new EventEmitter();
  @Output() backToExerciseList = new EventEmitter();
  currentQuestionData!: MultipleChoiceQuestion | undefined;
  isConfirmDisabled: boolean = true;
  showConfirmationArea: boolean = false;
  confirmationTitle: string = '';
  confirmationText: string = '';
  selectedOption: string = '';
  constructor(
    private resolutionService: ResolutionService
  ) { }

  ngOnInit(): void {
    this.currentQuestionData = this.exercise && this.exercise.questions ? this.exercise.questions[0] : undefined;
  }
  ngAfterViewInit(): void {
    this.questionTitle ? this.questionTitle.nativeElement.focus() : false;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['exercise']) {
      console.log("mudança no exercício");
      this.currentQuestionData = this.exercise && this.exercise.questions ? this.exercise.questions[0] : undefined;
      this.isConfirmDisabled = true;
      this.showConfirmationArea = false;
      this.confirmationTitle = '';
      this.confirmationText = '';
      this.questionTitle ? this.questionTitle.nativeElement.focus() : false;
      this.selectedOption = '';
    }
  }

  onRadioChange(event: any): void {
    this.selectedOption = event.value;
    this.isConfirmDisabled = this.showConfirmationArea ? true : false;
  }

  checkAnswer(): void {

    this.isConfirmDisabled = true;
    const userAnswer = parseInt(this.selectedOption) === this.currentQuestionData?.answer;
    console.log("selected option ", this.selectedOption, "; real answer: ", this.currentQuestionData?.answer, "; resultado = ", userAnswer);
    const status = this.getStatus(userAnswer);
    this.showConfirmation(status, this.currentQuestionData);
    userAnswer ? this.exerciseCompletion() : false;

  }

  getStatus(userAnswer: boolean): string {
    return userAnswer ? 'success' : 'error';
  }

  showConfirmation(status: string, question: MultipleChoiceQuestion | undefined): void {
    switch (status) {
      case 'success':
        this.confirmationText = 'Muito bem, continue assim.';
        this.confirmationTitle = 'Parabéns, resposta certa!';
        break;
      case 'error':
        this.confirmationText = 'não foi dessa vez. ' + question?.explain;
        this.confirmationTitle = 'Resposta incorreta...';
        break;
      case 'final-success':
        this.confirmationText =
          'Muito bem! Essa foi a última questão deste exercício. Não pare por aqui, você já sabe, a programação só vinga se praticar!';
        this.confirmationTitle = 'Parabéns, você fechou com chave de ouro!';
        break;
      case 'final-error':
        this.confirmationText = 'não foi dessa vez. ' + question?.explain;
        this.confirmationTitle = 'Resposta incorreta...';
        break;
    }
    this.showConfirmationArea = true;
    setTimeout(() => {
      const confirmationTitleElement = document.getElementById(
        'confirmation-title'
      );
      if (confirmationTitleElement) {
        confirmationTitleElement.focus();
      }
    }, 90);
  }

  emitNextExercise() {
    this.nextExercise.emit(this.exercise.id);
  }
  onBackToExerciseListActivated() {
    this.backToExerciseList.emit();
  }


  async exerciseCompletion() {

    try {
      const completedExercises = await this.resolutionService.getExercisesCompleted();
      const exerciseId: string = this.exercise.id ? this.exercise.id : '';
      if (
        exerciseId &&
        completedExercises[this.exercise.moduleId] &&
        completedExercises[this.exercise.moduleId].includes(exerciseId)
      ) {
        console.log('Exercício já completado');
        //alert('Parabéns! Exercício concluído!');
      } else {
        const resolution = await this.resolutionService.registerExerciseCompletion(
          this.exercise
        );
        if (resolution) {
          console.log('Exercício sendo completado 1X');
          //alert('Parabéns! Exercício concluído!');
        } else {
          alert('A resolução do exercício não pôde ser salva.');
        }
      }
    } catch (error) {
      alert('Resolução do exercício não registrada: ' + error);
    }

  }
}
