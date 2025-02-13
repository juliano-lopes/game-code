import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleListComponent } from '../module-list/module-list.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home',
  imports: [ModuleListComponent, MatButtonModule, MatToolbarModule, CommonModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  constructor(protected authService: AuthService) { }
  logout() {
    this.authService.logout();
  }
}
