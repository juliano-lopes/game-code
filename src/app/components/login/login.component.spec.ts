import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick, flush } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError, Subject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { User } from '@angular/fire/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let userSubject: Subject<User | null>;

  beforeEach(waitForAsync(() => {
    userSubject = new Subject<User | null>();
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'loginWithGoogle', 'logout'], { user$: userSubject.asObservable() });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
    flush();
  }));

  it('should set the document title on ngOnInit', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(document.title).toContain(component.title);
    flush();
  }));

  it('should navigate to /home if user is already logged in', fakeAsync(() => {
    // Arrange
    const mockUser = { uid: 'someuid', email: 'test@example.com' } as User;
    fixture.detectChanges();
    // Act
    component.ngOnInit();
    userSubject.next(mockUser); // Emit a user
    tick();
    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    flush();
  }));

  it('should call authService.login and navigate to /home on successful login', fakeAsync(async () => {
    mockAuthService.login.and.resolveTo();
    component.email = 'test@example.com';
    component.password = 'password';
    fixture.detectChanges();
    await component.onSubmit();
    tick();
    expect(mockAuthService.login).toHaveBeenCalledWith(component.email, component.password);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    flush();
  }));

  it('should set loginError on failed login', fakeAsync(async () => {
    const errorMessage = 'Invalid credentials';
    mockAuthService.login.and.rejectWith(errorMessage);
    component.email = 'test@example.com';
    component.password = 'wrongpassword';
    fixture.detectChanges();
    await component.onSubmit();
    tick();
    expect(component.loginError).toBe(errorMessage);
    flush();
  }));

  it('should call authService.loginWithGoogle on loginWithGoogle', fakeAsync(async () => {
    mockAuthService.loginWithGoogle.and.resolveTo();
    fixture.detectChanges();
    await component.loginWithGoogle();
    tick();
    expect(mockAuthService.loginWithGoogle).toHaveBeenCalled();
    flush();
  }));

  it('should alert on failed login with google', fakeAsync(async () => {
    spyOn(window, 'alert');
    const errorMessage = 'Invalid credentials';
    mockAuthService.loginWithGoogle.and.rejectWith(errorMessage);
    fixture.detectChanges();
    await component.loginWithGoogle();
    tick();
    expect(window.alert).toHaveBeenCalledWith("Não foi possível entrar no sistema via conta Google");
    flush();
  }));

  it('should have the email input field', () => {
    fixture.detectChanges();
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]'));
    expect(emailInput).toBeTruthy();
  });

  it('should have the password input field', () => {
    fixture.detectChanges();
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]'));
    expect(passwordInput).toBeTruthy();
  });

  it('should have the submit button', () => {
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton).toBeTruthy();
  });
});
