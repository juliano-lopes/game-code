import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MultipleChoiceExerciseService } from '../../services/multiple-choice-exercise.service';
import { MultipleChoiceQuestion } from '../../types/exercise';
import { ResolutionService } from '../../services/resolution.service';
import { Exercise } from '../../types/exercise';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-multiple-choice-exercise',
  templateUrl: './multiple-choice-exercise.component.html',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  styleUrls: ['./multiple-choice-exercise.component.css'],
})
export class MultipleChoiceExerciseComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('questionTitle') questionTitle!: ElementRef;
  @Input() exercise!: Exercise;
  @Input() isNextExerciseAvailable: boolean = false;
  @Output() nextExercise = new EventEmitter();
  @Output() backToExerciseList = new EventEmitter();
  currentQuestionData!: MultipleChoiceQuestion | undefined;
  isConfirmDisabled: boolean = true;
  showConfirmationArea: boolean = false;
  confirmationTitle: string = '';
  confirmationText: string = '';
  showScoreArea: boolean = false;
  scoreTitle: string = '';
  scoreText: string = '';
  percentage: number = 0;

  constructor(
    public multipleChoiceService: MultipleChoiceExerciseService,
    private resolution: ResolutionService
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
      this.showScoreArea = false;
      this.scoreTitle = '';
      this.scoreText = '';
      this.percentage = 0;
      this.questionTitle ? this.questionTitle.nativeElement.focus() : false;
    }
  }

  onRadioChange(): void {
    this.isConfirmDisabled = false;
  }

  checkAnswer(): void {

    this.isConfirmDisabled = true;
    const options = Array.from(
      document.querySelectorAll('input[name="options"]')
    );
    const userAnswer = options.filter(
      (option) =>
        option instanceof HTMLInputElement &&
        option.checked &&
        this.currentQuestionData &&
        parseInt(option.value) === this.currentQuestionData.answer
    ).length > 0;

    this.multipleChoiceService.setScore(userAnswer);
    const status = this.getStatus(userAnswer);
    this.showConfirmation(status, this.currentQuestionData);

  }

  getStatus(userAnswer: boolean): string {
    let status;
    if (
      userAnswer &&
      this.multipleChoiceService.currentQuestion + 1 <
      this.multipleChoiceService.questions.length
    ) {
      status = 'success';
    } else if (
      !userAnswer &&
      this.multipleChoiceService.currentQuestion + 1 <
      this.multipleChoiceService.questions.length
    ) {
      status = 'error';
    } else if (
      userAnswer &&
      !(
        this.multipleChoiceService.currentQuestion + 1 <
        this.multipleChoiceService.questions.length
      )
    ) {
      status = 'final-success';
    } else {
      status = 'final-error';
    }
    return status;
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

  nextQuestion(): void {
    /*
    if (
      this.multipleChoiceService.currentQuestion + 1 <
      this.multipleChoiceService.questions.length
    ) {
      this.multipleChoiceService.currentQuestion++;
      this.currentQuestionData =
        this.multipleChoiceService.questions[
        this.multipleChoiceService.currentQuestion
        ];
      this.showConfirmationArea = false;
      this.isConfirmDisabled = true;
    } else {
      this.showConfirmationArea = false;
      this.showScore();
    }

    */
  }
  emitNextExercise() {
    this.nextExercise.emit(this.exercise.id);
  }
  onBackToExerciseListActivated() {
    this.backToExerciseList.emit();
  }



  async showScore() {
    /*
    this.showScoreArea = true;
    this.scoreTitle = 'Verifique sua pontuação';
    this.percentage = Math.floor(
      (this.multipleChoiceService.score * 100) /
      this.multipleChoiceService.questions.length
    );
    this.scoreText =
      this.percentage >= 70
        ? 'Você acertou ' +
        this.percentage +
        '% das questões, continue desenvolvendo!'
        : 'Você acertou ' +
        this.percentage +
        '% das questões. Um acerto acima de 70% seria mais interessante para que o conhecimento seja consolidado. Revise o material e procure entender qual conteúdo não foi totalmente absorvido e faça o exercício novamente.';
    setTimeout(() => {
      const scoreTitleElement = document.getElementById('score-title');
      if (scoreTitleElement) {
        scoreTitleElement.focus();
      }
    }, 0);
    this.exerciseCompletion();
    */

  }

  getProgressBarPercentage(): number {
    return 0;
    /*
    return Math.floor(
      ((this.multipleChoiceService.currentQuestion + 1) * 100) /
      this.multipleChoiceService.questions.length
    );
    */
  }

  async exerciseCompletion() {
    /*
    try {
      const completedExercises = await this.resolution.getExercisesCompleted();
      const exerciseId: string = this.exercise.id ? this.exercise.id : '';
      if (
        exerciseId &&
        completedExercises[this.exercise.moduleId] &&
        completedExercises[this.exercise.moduleId].includes(exerciseId)
      ) {
        console.log('Exercício já completado');
        alert('Parabéns! Exercício concluído!');
      } else {
        const resolution = await this.resolution.registerExerciseCompletion(
          this.exercise
        );
        if (resolution) {
          console.log('Exercício sendo completado 1X');
          alert('Parabéns! Exercício concluído!');
        } else {
          alert('A resolução do exercício não pôde ser salva.');
        }
      }
    } catch (error) {
      alert('Exercício não registrado: ' + error);
    }
      */
  }
}
