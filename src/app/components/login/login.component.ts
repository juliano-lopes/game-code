import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, MatFormField, MatInput, MatLabel, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  title: string = "Entrar no sistema";
  email = '';
  password = '';
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    document.title = `${this.title} - Game Code App`;
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
    if (environment.mode == "production") {
      console.log("Em prod");
    } else if (environment.mode == "staging") {
      console.log("Em staging");
    } else {
      console.log("Em dev");
    }
  }

  async onSubmit(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']); // Redirect to modules page on success
    } catch (error: any) {
      this.loginError = error;
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      alert("Não foi possível entrar no sistema via conta Google");
    }
  }
}