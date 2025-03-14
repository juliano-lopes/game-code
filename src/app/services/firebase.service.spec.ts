import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { FirebaseDocument } from '../types/firebase-document';

describe('FirebaseService', () => {
  let service: FirebaseService<FirebaseDocument>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
