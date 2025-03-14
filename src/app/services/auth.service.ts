import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User, user } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this._user$.asObservable();
  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    authState(this.auth).subscribe((user) => {
      this._user$.next(user);
    });
  }

  async loginWithGoogle() {
    try {
      const userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      this._user$.next(userCredential.user);
      console.log("Login success with google");
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this._user$.next(userCredential.user);
      console.log("Login success");
    } catch (error: any) {
      console.error("Login error:", error);
      let message = '';
      switch (error.code) {
        case 'auth/user-not-found': {
          message = 'Não	existe	usuário	para	o	email	informado';
          break;
        }
        case 'auth/invalid-email': {
          message = 'Email	inválido';
          break;
        }
        case 'auth/wrong-password': {
          message = 'Senha	Inválida';
          break;
        }
        case 'auth/invalid-credential': {
          message = "Usuário ou senha inválidos";
          break;
        }
        case 'auth/missing-password': {
          message = "A senha é obrigatória";
          break;
        }
        default: {
          message = error.message;
          break;
        }
      }
      throw message;
    }
  }

  async register(name: string, email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        // Store additional user data in Firestore
        const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
        await setDoc(userDocRef, {
          name: name,
          email: email,
        });
      }
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this._user$.next(null);
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}