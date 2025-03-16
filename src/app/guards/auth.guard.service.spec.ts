import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth.guard.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of } from 'rxjs';
import { User } from '@angular/fire/auth';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let userSubject: Subject<User | null>;

  beforeEach(() => {
    userSubject = new Subject<User | null>();
    mockAuthService = jasmine.createSpyObj('AuthService', [], { user$: userSubject.asObservable() });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuardService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow access when user is logged in', fakeAsync(() => {
    const mockUser = { uid: 'someuid', email: 'test@example.com' } as User;
    userSubject.next(mockUser);
    let canActivateResult: boolean | undefined;
    service.canActivate({} as any, {} as any).subscribe(canActivate => {
      canActivateResult = canActivate;
      expect(canActivateResult).toBe(true);

    });
    tick();
  }));

  it('should deny access and redirect to login when user is not logged in', fakeAsync(() => {
    userSubject.next(null);
    let canActivateResult: boolean | undefined;
    service.canActivate({} as any, {} as any).subscribe(canActivate => {
      canActivateResult = canActivate;
      expect(canActivateResult).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  
    });
    tick();
  }));
});
