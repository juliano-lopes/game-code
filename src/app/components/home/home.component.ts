import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
  styles: `
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribute space evenly */
  padding: 0 16px; /* Add some padding to the sides */
}

.spacer {
  flex: 1; /* Take up available space */
}

.user-info {
  margin-right: 16px; /* Add spacing between the user info and the button */
}
  `
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('title') title!: ElementRef;
  constructor(protected authService: AuthService) {
    //fetch("https://us-central1-game-code-482d3.cloudfunctions.net/sendEmail").then((data) => data.text()).then((data) => console.log("resposta sendEmail: ", data)).catch((error) => console.log("erro sendEmail: ", error));

  }
  ngAfterViewInit(): void {
    this.title.nativeElement.focus();
  }
  logout() {
    this.authService.logout();
  }
}
