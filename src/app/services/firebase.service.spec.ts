import { TestBed } from '@angular/core/testing';
import { FirebaseService, COLLECTION_PATH, COLLECTION_FN } from './firebase.service';
import { FirebaseDocument } from '../types/firebase-document';
import { collection, Firestore } from '@angular/fire/firestore';
import { CollectionReference, DocumentReference, Query, QueryConstraint, DocumentData } from '@angular/fire/firestore';

export function mockCollection(firestore: any, path: string): CollectionReference {
  const mockCollectionReference: any = {
    id: path,
    path: path,
    firestore: firestore,
    doc: (documentPath?: string) => {
      const mockDocumentReference: any = {
        id: documentPath || 'mockDocumentId',
        path: `${path}/${documentPath || 'mockDocumentId'}`,
        firestore: firestore,
        set: (data: DocumentData) => Promise.resolve(),
        get: () => Promise.resolve({ exists: true, data: () => ({}) }),
        update: (data: DocumentData) => Promise.resolve(),
        delete: () => Promise.resolve()
      };
      return mockDocumentReference;
    },
    add: (data: DocumentData) => {
      return Promise.resolve({ id: 'mockDocumentId' });
    },
    where: (fieldPath: string, opStr: any, value: any) => {
      const mockQuery: any = {
        get: () => Promise.resolve({ docs: [] }),
        where: (fieldPath: string, opStr: any, value: any) => { return mockQuery },
        orderBy: (fieldPath: string, directionStr?: any) => { return mockQuery },
        limit: (limit: number) => { return mockQuery }
      };
      return mockQuery;
    },
    get: () => {
      return Promise.resolve({ docs: [] });
    },
    orderBy: (fieldPath: string, directionStr?: any) => {
      const mockQuery: any = {
        get: () => Promise.resolve({ docs: [] }),
        where: (fieldPath: string, opStr: any, value: any) => { return mockQuery },
        orderBy: (fieldPath: string, directionStr?: any) => { return mockQuery },
        limit: (limit: number) => { return mockQuery }
      };
      return mockQuery;
    },
    limit: (limit: number) => {
      const mockQuery: any = {
        get: () => Promise.resolve({ docs: [] }),
        where: (fieldPath: string, opStr: any, value: any) => { return mockQuery },
        orderBy: (fieldPath: string, directionStr?: any) => { return mockQuery },
        limit: (limit: number) => { return mockQuery }
      };
      return mockQuery;
    },
    withConverter: (converter: any) => {
      return mockCollectionReference;
    }
  };
  return mockCollectionReference as CollectionReference;
}

describe('FirebaseService', () => {
  let service: FirebaseService<FirebaseDocument>;
  let mockFirestore: Firestore;

  const collectionPath = 'test-collection';
  let mockCollectionSpy: jasmine.Spy;
  beforeEach(() => {
    mockFirestore = {
      type: 'firestore',
      toJSON: () => {

        return {};
      },
      app: {
        options: {},
        name: 'test',
        automaticDataCollectionEnabled: false
      }
    };
    mockCollectionSpy = spyOn({ fn: mockCollection }, 'fn').and.callThrough(); // Adicione um spy
    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: Firestore, useValue: mockFirestore },
        { provide: COLLECTION_PATH, useValue: collectionPath },
        { provide: COLLECTION_FN, useValue: mockCollection },
      ],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});