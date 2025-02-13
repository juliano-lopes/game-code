import { AfterViewInit, Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Exercise } from '../../types/exercise';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ExerciseExecutionComponent } from '../exercise-execution/exercise-execution.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  @Input() moduleId: string | null = null;
  selectedExercise: Exercise | undefined;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    //this.route.paramMap.subscribe(params => {
    //this.moduleId = params.get('moduleId');
    if (this.moduleId) {
      this.exercises$ = this.dataService.getExercisesByModuleId(this.moduleId);
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
      let el = document.getElementById(id);
      el ? el.focus() : false;
    }, 500);
  }
}
