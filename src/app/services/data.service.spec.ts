import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Firestore } from '@angular/fire/firestore';

describe('DataService', () => {
  let service: DataService;
  let mockFirestore: jasmine.SpyObj<Firestore>;
  beforeEach(() => {
    mockFirestore = jasmine.createSpyObj('Firestore', ['collection']);
    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: Firestore, useValue: mockFirestore }
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
