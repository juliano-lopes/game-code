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
@Component({
  selector: 'app-exercise-list',
  imports: [CommonModule, ExerciseExecutionComponent, MatButtonModule, MatIconModule],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit, AfterViewInit {
  title!: string;
  exercises$: Observable<Exercise[]> | undefined;
  exercises: Exercise[] = [];
  @Input() moduleName!: string;
  @Input() moduleId: string | undefined = undefined;
  selectedExercise: Exercise | undefined;
  resolutions: string[] = [];
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
  }
  ngAfterViewInit(): void {
    this.title = `Exercícios ${this.moduleName}`;
    document.title = `${this.title} - Game Code App`;

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
}
