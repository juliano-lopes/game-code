import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Module } from '../../types/module';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-module-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.css'
})
export class ModuleListComponent implements OnInit {
  modules$: Observable<Module[]> | undefined;
  modules: Module[] = [];  
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.modules$ = this.dataService.getModules();
    this.modules$.subscribe((modules)=> this.modules = modules);
    this.modules$.subscribe((modules) => console.log("Modules: ", modules));
  }

}

