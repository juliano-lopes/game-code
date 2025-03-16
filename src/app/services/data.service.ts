import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseDocument } from '../types/firebase-document';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) {
  }
  createDataObject<T extends FirebaseDocument>(collectionName: string) {
    return new FirebaseService<T>(this.firestore, collectionName);
  }
}