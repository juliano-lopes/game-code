import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.user$ = user(this.auth);
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
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
      this.router.navigate(['/modules']);
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}