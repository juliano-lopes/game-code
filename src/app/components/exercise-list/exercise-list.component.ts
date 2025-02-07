import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Exercise } from '../../types/exercise';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-exercise-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit {
  exercises$: Observable<Exercise[]> | undefined;
  exercises: Exercise[] = [];
  moduleId: string | null = null;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    if (this.moduleId) {
      this.exercises$ = this.dataService.getExercisesByModuleId(this.moduleId);
      this.exercises$.subscribe((exercises) => this.exercises = exercises);
    }
  }
}
