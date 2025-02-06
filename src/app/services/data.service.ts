import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, addDoc, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Module } from '../types/module';
import { Exercise } from '../types/exercise';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getModules(): Observable<Module[]> {
    const modulesCollection = collection(this.firestore, 'modules');
    return collectionData(modulesCollection, { idField: 'id' }) as Observable<Module[]>;
  }

  getExercisesByModuleId(moduleId: string): Observable<Exercise[]> {
    const exercisesCollection = collection(this.firestore, 'exercises');
    const q = query(exercisesCollection, where('moduleId', '==', moduleId));
    return collectionData(q, { idField: 'id' }) as Observable<Exercise[]>;
  }

  addExerciseResolution(userId: string, moduleId: string, exerciseId: string): Promise<any> {
    const exerciseResolutionsCollection = collection(this.firestore, 'exercise_resolutions');
    return addDoc(exerciseResolutionsCollection, {
      userId: userId,
      moduleId: moduleId,
      exerciseId: exerciseId,
      timestamp: new Date()
    });
  }

  addExercise(exercise: Exercise): Promise<any> {
    const exercisesCollection = collection(this.firestore, 'exercises');
    return addDoc(exercisesCollection, exercise);
  }

  // Example: Update an existing document
  updateModule(moduleId: string, data: any): Promise<void> {
    const moduleDocRef = doc(this.firestore, `modules/${moduleId}`);
    return setDoc(moduleDocRef, data, { merge: true });  // Use merge to update only specified fields
  }

  // Example: Delete a document
  deleteModule(moduleId: string): Promise<void> {
    const moduleDocRef = doc(this.firestore, `modules/${moduleId}`);
    return deleteDoc(moduleDocRef);
  }
}