import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { Resolution } from '../types/resolution';
import { Timestamp } from '@firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Exercise } from '../types/exercise';
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  constructor(private auth: AuthService, private data: DataService) {
  }

  registerExerciseCompletion(exerciseId: string | undefined): Promise<boolean> {
    if (!exerciseId) {
      throw new Error("É preciso haver um id válido para registrar a finalização do exercício");
    }
    try {

      return new Promise((resolve, reject) => {

        this.auth.user$.subscribe((user) => {
          const userId = user.uid;
          const resolution: Resolution = { exerciseId: exerciseId, userId: userId, completedAt: Timestamp.now() };
          console.log("Resolução exercício: ", resolution);
          this.data.createDataObject<Resolution>("resolution").createOrUpdate(resolution).then((data) => resolve(true)).catch((error) => reject(false));

        });
      });
    } catch (error) {
      throw error;
    }
  }
  async getExercisesCompleted() {

    const user = await firstValueFrom(this.auth.user$);
    const resolutions = await firstValueFrom(this.data.createDataObject<Resolution>("resolution").getByField("userId", user.uid));
    const resolutionsId = resolutions.map((resolution) => resolution.exerciseId);
    return resolutionsId;

  }
}
