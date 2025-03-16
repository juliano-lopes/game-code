import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuth: jasmine.SpyObj<Auth>;
  let mockFirestore: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuth = jasmine.createSpyObj('Auth', ['createUserWithEmailAndPassword', 'signInWithEmailAndPassword', 'signOut']);
    mockFirestore = jasmine.createSpyObj('Firestore', ['collection']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter },
        { provide: Auth, useValue: mockAuth },
        { provide: Firestore, useValue: mockFirestore },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
