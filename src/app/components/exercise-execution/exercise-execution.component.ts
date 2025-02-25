import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Exercise } from '../../types/exercise';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ResolutionService } from '../../services/resolution.service';
@Component({
  selector: 'app-exercise-execution',
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule],
  templateUrl: './exercise-execution.component.html',
  styleUrl: './exercise-execution.component.css'
})
export class ExerciseExecutionComponent implements OnInit, AfterViewInit {
  @ViewChild('exerciseTitle') exerciseTitle!: ElementRef;
  @Input() exercise!: Exercise;
  trustedExerciseStatement: any;
  @Output() backToExerciseList = new EventEmitter();
  originalLines: string[] = [];
  shuffledElements: string[] = [];
  elementsToFormLine: string[] = [];
  formedLine: string = '';
  formedLinesCorrectly: string[] = [];
  currentLineIndex: number = 0;
  isConfirmDisabled: boolean = true;
  showStatusMessage: string = '';
  isExerciseCompleted: boolean = false;
  exerciseId: string | null = null;

  SEPARATOR = '@@';

  constructor(private dataService: DataService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private resolution: ResolutionService) { }

  ngOnInit(): void {
    this.trustedExerciseStatement = this.sanitizer.bypassSecurityTrustHtml(this.exercise.statement);
    this.originalLines = this.cleanLine(this.exercise.instructions, '*hash*', '#').split('\n');
    this.originalLines = this.originalLines.length > 1 ? this.originalLines : this.cleanLine(this.exercise.instructions, '*hash*', '#').split('*end*');
    this.shuffleLine();

  }

  ngAfterViewInit(): void {
    this.exerciseTitle.nativeElement.focus();
  }


  shuffleLine(): void {
    this.elementsToFormLine = [];
    this.formedLine = '';
    this.shuffledElements = this.originalLines[this.currentLineIndex].split(this.SEPARATOR).sort();
    this.isConfirmDisabled = true;
  }

  addElementToFormedLine(element: string): void {
    this.elementsToFormLine.push(element);
    this.formedLine = this.elementsToFormLine.join('');

    this.shuffledElements = this.shuffledElements.filter((el, index, array) => index != array.indexOf(element));
    this.isConfirmDisabled = this.shuffledElements.length > 0;
    this.showStatusMessage = '';
  }

  removeElementFromFormedLine(): void {
    const element = this.elementsToFormLine.pop();
    element ? this.shuffledElements.push(element) : null;
    this.formedLine = this.elementsToFormLine.join('');
    this.isConfirmDisabled = true;
    this.showStatusMessage = '';
  }

  isFormedLineCorrect(): boolean {
    const originalLine = this.cleanLine(this.originalLines[this.currentLineIndex], this.SEPARATOR, '');
    return this.formedLine === originalLine;
  }

  cleanLine(originalLine: string, from: string, to: string): string {
    while (originalLine.indexOf(from) !== -1) {
      originalLine = originalLine.replace(from, to);
    }
    return originalLine;
  }

  confirmLine(): void {

    if (this.isFormedLineCorrect()) {
      this.showStatusMessage = "success";
      // Handle correct line

      this.formedLinesCorrectly.push(this.formedLine);
      if (this.currentLineIndex < this.originalLines.length - 1) {
        this.currentLineIndex++;
        this.shuffleLine();
      } else {
        // Handle exercise completion
        this.isExerciseCompleted = true;
        this.exerciseCompletion();
      }
    } else {
      // Handle incorrect line
      this.showStatusMessage = "fail";
      //alert('Incorrect! Try again.');
    }
  }
  onBackToExerciseListActivated() {
    this.backToExerciseList.emit();
  }
  async exerciseCompletion() {
    try {
      const resolution = await this.resolution.registerExerciseCompletion(this.exercise.id);
      if (resolution) {
        alert('Parabéns! Exercício concluído!');
      } else {
        alert("A resolução do exercício não pôde ser salva.");
      }
    } catch (error) {
      alert("Exercício não registrado: " + error);
    }
  }
}
