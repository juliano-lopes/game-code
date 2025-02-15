import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { ICrudInterface } from '../types/icrud.interface';
import { catchError, map, Observable } from 'rxjs';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentReference, getDoc, query, setDoc, where } from '@firebase/firestore';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { FirebaseDocument } from '../types/firebase-document';

export const COLLECTION_PATH = new InjectionToken<string>('collectionPath');
@Injectable({
  providedIn: 'root'
})
export class FirebaseService<T extends FirebaseDocument> implements ICrudInterface<T> {
  ref: CollectionReference<T>;
  constructor(private firestore: Firestore, @Inject(COLLECTION_PATH) private path: string) {
    this.ref = collection(this.firestore, this.path) as CollectionReference<T>;
  }
  get(id: string): Observable<T> {
    const docRef = doc(this.firestore, this.ref.path, id);
    return docData(docRef, { idField: 'id' }).pipe(
      map(data => {
        if (data) {
          return data as T;
        } else {
          throw new Error("Documento não encontrado");
        }
      }),
      catchError(error => {
        console.error("Erro ao buscar documento:", error);
        throw error; // Re-lança o erro para ser tratado por quem chama o método
      })
    );
  }

  list(): Observable<T[]> {
    return collectionData(this.ref, { idField: 'id' }).pipe(
      catchError(error => {
        console.error("Erro ao listar documentos:", error);
        throw error; // Re-lança o erro para ser tratado por quem chama o método
      })
    ) as Observable<T[]>;
  }

  async createOrUpdate(item: T): Promise<T> {
    try {
      if (item.id) {
        // Atualizar documento existente
        const docRef = doc(this.firestore, this.ref.path, item.id);
        await setDoc(docRef, item, { merge: true }); // 'merge: true' preserva outros campos
        return item; // Retorna o item atualizado
      } else {
        // Criar novo documento
        const docRef = await addDoc(this.ref, item);
        const newItem = { ...item, id: docRef.id } as T; // Adiciona o ID ao item
        return newItem; // Retorna o novo item com o ID
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar documento:", error);
      throw error; // Re-lança o erro para ser tratado por quem chama o método
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, this.ref.path, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
      throw error; // Re-lança o erro para ser tratado por quem chama o método
    }
  }

}
