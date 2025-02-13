import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Module } from '../../types/module';
import { DataService } from '../../services/data.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';

import { WelcomeComponent } from '../welcome/welcome.component';
@Component({
  selector: 'app-module-list',
  imports: [CommonModule, MatTabsModule, ExerciseListComponent, WelcomeComponent],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.css'
})
export class ModuleListComponent implements OnInit {
  modules$: Observable<Module[]> | undefined;
  modules: Module[] = [];
  selectedModuleId: number| null = null;
  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.modules$ = this.dataService.getModules();
    this.modules$.subscribe((modules) => this.modules = modules);
    this.modules$.subscribe((modules) => console.log("Modules: ", modules));
  }
  selectModule(moduleId: number): void {
    this.selectedModuleId = moduleId;
  }
}

