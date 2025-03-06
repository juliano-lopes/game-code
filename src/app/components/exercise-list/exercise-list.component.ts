import { AfterViewInit, Component, ElementRef, Input, input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Exercise } from '../../types/exercise';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ExerciseExecutionComponent } from '../exercise-execution/exercise-execution.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResolutionService } from '../../services/resolution.service';
import { Resolution } from '../../types/resolution';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MultipleChoiceExerciseComponent } from '../multiple-choice-exercise/multiple-choice-exercise.component';
@Component({
  selector: 'app-exercise-list',
  imports: [CommonModule, ExerciseExecutionComponent, MatButtonModule, MatIconModule, MatCardModule, MatListModule, MultipleChoiceExerciseComponent],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit, AfterViewInit {
  title!: string;
  exercises$: Observable<Exercise[]> = new Observable<Exercise[]>();
  exercises: Exercise[] = [];
  @Input() moduleName!: string;
  @Input() moduleId: string | undefined = undefined;
  selectedExercise: Exercise | undefined;
  resolutions: { [moduleId: string]: string[] } = {};
  constructor(private dataService: DataService, private route: ActivatedRoute, protected resolutionService: ResolutionService) { }

  async ngOnInit(): Promise<void> {
    this.resolutions = await this.resolutionService.getExercisesCompleted();
    //this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    //this.route.paramMap.subscribe(params => {
    //this.moduleId = params.get('moduleId');
    if (this.moduleId) {
      this.exercises$ = this.dataService.createDataObject<Exercise>("exercises").getByField('moduleId', this.moduleId);
      this.exercises$.subscribe((exercises) => {
        this.exercises = exercises.sort((a, b) => a.number - b.number);

      });

    }
    //});
    this.title = `Exercícios ${this.moduleName}`;
    document.title = `${this.title} - Game Code App`;

  }
  ngAfterViewInit(): void {

  }

  onSelectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
  }
  onBackToExerciseList() {
    let id = this.selectedExercise ? this.selectedExercise.id : '';
    this.selectedExercise = undefined;
    setTimeout(() => {
      let el = id ? document.getElementById(id) : null;
      el ? el.focus() : false;
    }, 500);
  }
  onNextExercise(currentExerciseId: string) {
    const nextExerciseIndex = this.getNextExerciseIndex(currentExerciseId);
    if (nextExerciseIndex) {
      this.selectedExercise = this.exercises[nextExerciseIndex];
      console.log("next vai ser: ", nextExerciseIndex);
    } else {
      // Caso seja o ultimo exercicio, você pode decidir o que fazer.
      console.log('Último exercício.');
      //pode deixar o selectedExercise como null, ou mostrar uma mensagem.
      this.selectedExercise = undefined;
    }
  }
  getNextExerciseIndex(currentExerciseId: string | undefined): number {
    const currentIndex = this.exercises.findIndex(exercise => exercise.id === currentExerciseId);
    if (currentIndex < this.exercises.length - 1) {
      return currentIndex + 1;
    }
    return 0;
  }
}
