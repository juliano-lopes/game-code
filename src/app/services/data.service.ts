import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, where, addDoc, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Module } from '../types/module';
import { Exercise } from '../types/exercise';
import { orderBy, query } from '@firebase/firestore';
import { FirebaseService } from './firebase.service';
import { FirebaseDocument } from '../types/firebase-document';

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