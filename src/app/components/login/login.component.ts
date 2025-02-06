import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
if(user) {
  this.router.navigate(['/modules']);
}
    });
  }

  async onSubmit(): Promise<void> {
    try {
      alert(this.email)
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/modules']); // Redirect to modules page on success
    } catch (error: any) {
      this.loginError = error.message;
    }
  }
}