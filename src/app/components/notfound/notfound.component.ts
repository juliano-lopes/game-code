import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-notfound',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './notfound.component.html',
  styles: ``
})
export class NotfoundComponent { }
