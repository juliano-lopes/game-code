import { Component } from '@angular/core';
import { ModuleListComponent } from '../module-list/module-list.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  imports: [ModuleListComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  constructor(private authService: AuthService) { }
  logout() {
    this.authService.logout();
  }
}
