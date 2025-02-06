import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-module-list',
  imports: [CommonModule],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.css'
})
export class ModuleListComponent implements OnInit {
  
constructor(protected auth: AuthService) {

}
  ngOnInit(): void {
    
  }

}
