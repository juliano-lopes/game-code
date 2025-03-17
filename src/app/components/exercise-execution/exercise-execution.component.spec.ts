import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseExecutionComponent } from './exercise-execution.component';
import { Firestore } from '@angular/fire/firestore';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ResolutionService } from '../../services/resolution.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExerciseExecutionComponent', () => {
  let component: ExerciseExecutionComponent;
  let fixture: ComponentFixture<ExerciseExecutionComponent>;
  let mockFirestore: any;
  let mockDataService: any;
  let mockActivatedRoute: any;
  let mockDomSanitizer: any;
  let mockResolutionService: any;

  beforeEach(async () => {
    mockFirestore = {}; // Mock do Firestore
    mockDataService = {}; // Mock do DataService
    mockActivatedRoute = { snapshot: { paramMap: { get: () => 'test' } } }; // Mock do ActivatedRoute
    mockDomSanitizer = { bypassSecurityTrustHtml: (html: string) => html }; // Mock do DomSanitizer
    mockResolutionService = {}; // Mock do ResolutionService

    await TestBed.configureTestingModule({
      imports: [ExerciseExecutionComponent, RouterTestingModule], // Adicione RouterTestingModule
      providers: [
        { provide: Firestore, useValue: mockFirestore },
        { provide: DataService, useValue: mockDataService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DomSanitizer, useValue: mockDomSanitizer },
        { provide: ResolutionService, useValue: mockResolutionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseExecutionComponent);
    component = fixture.componentInstance;
    component.exercise = {
      id: 'test-exercise',
      number: 1,
      moduleId: 'test-module',
      statement: 'Test statement',
      instructions: 'Test instructions'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});