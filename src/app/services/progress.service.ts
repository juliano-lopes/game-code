import { inject, Injectable } from '@angular/core';
import { ResolutionService } from './resolution.service';
import { DataService } from './data.service';
import { Exercise } from '../types/exercise';
import { firstValueFrom, lastValueFrom, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  constructor(private dataService: DataService, private resolutionService: ResolutionService) {

  }
  async moduleProgress(moduleId: string): Promise<number> {
    const resolutions = await this.resolutionService.getExercisesCompleted();
    const exercises = await firstValueFrom(this.dataService.createDataObject<Exercise>('exercises').getByField('moduleId', moduleId));
    const qtResolutions = resolutions[moduleId] ? [... new Set(resolutions[moduleId])].length : 0;
    const percentage = Math.round(exercises.length > 0 ? (qtResolutions / exercises.length) * 100 : 0);
    console.log("qtResolutions foi ", qtResolutions, "; qtExercises foi ", exercises.length, "; percentage foi ", percentage);
    return percentage;
  }

  async generalProgress(): Promise<number> {

    const resolutions = await this.resolutionService.getExercisesCompleted();
    const completedExercises = Object.values(resolutions).reduce((ac, exercisesOfAModule) => ac + [...new Set(exercisesOfAModule)].length, 0);
    return new Promise((resolve, reject) => {
      try {
        this.dataService.createDataObject<Exercise>('exercises').list().subscribe((allExercises) => {
          const percentage = Math.round(allExercises.length > 0 ? (completedExercises / allExercises.length) * 100 : 0);
          console.log("completed exercises foi: ", completedExercises, "; AllExercises foi ", allExercises.length, "; percentage foi ", percentage);
          resolve(percentage);

        });
      } catch (error) {
        reject(0);
      }
    });

  }

}
