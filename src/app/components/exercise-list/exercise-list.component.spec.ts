import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ExerciseListComponent } from './exercise-list.component';
import { DataService } from '../../services/data.service';
import { ResolutionService } from '../../services/resolution.service';
import { of, throwError, firstValueFrom, take } from 'rxjs';
import { Exercise } from '../../types/exercise';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseExecutionComponent } from '../exercise-execution/exercise-execution.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { ProgressService } from '../../services/progress.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// Mock for ExerciseExecutionComponent
@Component({
  selector: 'app-exercise-execution',
  template: '',
})
class MockExerciseExecutionComponent {
  @Input() exercise: any;
  @Input() isNextExerciseAvailable: boolean = false;
  @Output() backToExerciseList = new EventEmitter();
  @Output() nextExercise = new EventEmitter();
}

// Mock for DataService
const mockDataService = {
  createDataObject: jasmine.createSpy('createDataObject').and.returnValue({
    getByField: jasmine.createSpy('getByField')
  })
};

// Mock for ResolutionService
const mockResolutionService = {
  getExercisesCompleted: jasmine.createSpy('getExercisesCompleted').and.returnValue(Promise.resolve([]))
};

const mockProgressService = {
  moduleProgress: jasmine.createSpy('moduleProgress').and.returnValue(Promise.resolve(0))
};

const moduleId = 'testModule';
const exercise1 = { id: '1', number: 1, moduleId: moduleId, statement: ``, instructions: `` };
const exercise2 = { id: '2', number: 2, moduleId: moduleId, statement: ``, instructions: `` };
const moduleName = "Module test";

//Mock for Activated route
const mockActivatedRoute = {
  snapshot: {
    paramMap: convertToParamMap({ moduleId: 'testModule' })
  }
};

describe('ExerciseListComponent', () => {
  let component: ExerciseListComponent;
  let fixture: ComponentFixture<ExerciseListComponent>;
  // Class-level dataService and getByFieldSpy
  let dataService: any;
  let resolutionService: any;
  let getByFieldSpy: jasmine.Spy;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseListComponent, BrowserAnimationsModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule, RouterTestingModule, MatProgressBarModule],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ResolutionService, useValue: mockResolutionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProgressService, useValue: mockProgressService },
        Title
      ],
    }).overrideComponent(ExerciseListComponent, {
      remove: { imports: [ExerciseExecutionComponent] },
      add: { imports: [MockExerciseExecutionComponent] },
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseListComponent);
    component = fixture.componentInstance;
    // Inject and assign to the class property
    dataService = TestBed.inject(DataService);
    resolutionService = TestBed.inject(ResolutionService);
    getByFieldSpy = dataService.createDataObject().getByField;
    titleService = TestBed.inject(Title);
    component.moduleName = moduleName; // <-- Set moduleName here!
    component.moduleId = moduleId;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display exercises based on moduleId', waitForAsync(async () => {
    // Arrange
    const mockExercises: Exercise[] = [exercise1, exercise2];
    getByFieldSpy.and.returnValue(of(mockExercises));
    fixture.detectChanges();
    await fixture.whenStable();

    // Act
    // Assert
    expect(component.moduleId).toBe(moduleId);
    expect(getByFieldSpy).toHaveBeenCalledWith('moduleId', moduleId);
    const exercises = await firstValueFrom(component.exercises$);
    expect(exercises.length).toBe(2);
    expect(exercises[0].number).toBe(1);
  }));

  it('should filter correctly by moduleId', waitForAsync(async () => {
    // Arrange
    const mockExercises: Exercise[] = [exercise1, exercise2];
    getByFieldSpy.and.returnValue(of(mockExercises));
    component.moduleId = moduleId;
    fixture.detectChanges();

    // Act

    // Assert
    expect(component.moduleId).toBe(moduleId);
    const exercises = await firstValueFrom(component.exercises$);
    expect(exercises.length).toBe(2);
  }));

  it('should handle no exercises', waitForAsync(async () => {
    // Arrange
    getByFieldSpy.and.returnValue(of([]));
    component.moduleId = moduleId;
    fixture.detectChanges();

    // Act

    // Assert
    const exercises = await firstValueFrom(component.exercises$);
    expect(exercises.length).toBe(0);
  }));


  it('should display the title correctly', async () => {
    // Arrange


    // Act
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    // Assert
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain(`Exercícios ${moduleName}`);
  });

  it('should set the document title', () => {
    // Arrange

    // Act
    fixture.detectChanges();
    //Assert
    expect(document.title).toEqual(`Exercícios ${moduleName} - Game Code App`);
  });

  it('should display exercise buttons', waitForAsync(async () => {
    // Arrange
    const mockExercises: Exercise[] = [exercise1, exercise2];
    getByFieldSpy.and.returnValue(of(mockExercises));
    fixture.detectChanges();
    // Act
    // Assert
    await fixture.whenStable();
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent).toContain('Abrir Exercício 1');
    expect(buttons[1].nativeElement.textContent).toContain('Abrir Exercício 2');
  }));

  it('should display check icon for completed exercises', waitForAsync(async () => {
    // Arrange
    const mockExercises: Exercise[] = [exercise1, exercise2];
    const completedExercises: { [moduleId: string]: string[] } = {};
    completedExercises[moduleId] = [];
    completedExercises[moduleId].push('2');
    getByFieldSpy.and.returnValue(of(mockExercises));
    resolutionService.getExercisesCompleted.and.returnValue(Promise.resolve(completedExercises));
    // Act

    // Assert
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const icons = fixture.debugElement.queryAll(By.css('mat-icon'));
    expect(icons.length).toBe(2);
    expect(icons[0].nativeElement.textContent).toContain('radio_button_unchecked');
    expect(icons[1].nativeElement.textContent).toContain('check_circle');
  }));

  it('should display empty message when no exercises available', waitForAsync(async () => {
    // Arrange
    getByFieldSpy.and.returnValue(of([]));
    fixture.detectChanges();

    // Act

    // Assert
    await fixture.whenStable();
    fixture.detectChanges();
    const emptyMessage = fixture.debugElement.query(By.css('mat-list'));
    expect(emptyMessage).toBeTruthy();
    if (emptyMessage) {
      expect(emptyMessage.nativeElement.textContent).toContain('Nenhum exercício disponível.');
    }
  }));

  it('should set selectedExercise when onSelectExercise is called', () => {
    // Arrange
    const exercise: Exercise = exercise1;

    // Act
    component.onSelectExercise(exercise);

    // Assert
    expect(component.selectedExercise).toEqual(exercise);
  });

  it('should clear selectedExercise and focus on previous exercise button when onBackToExerciseList is called', fakeAsync(() => {
    // Arrange
    getByFieldSpy.and.returnValue(of([exercise1, exercise2]));
    component.moduleId = moduleId;
    fixture.detectChanges();
    component.onSelectExercise(exercise1);
    fixture.detectChanges();
    spyOn(document, 'getElementById').and.returnValue(document.createElement('button'));
    // Act
    component.onBackToExerciseList();
    tick(500);

    // Assert
    expect(component.selectedExercise).toBeUndefined();
    expect(document.getElementById).toHaveBeenCalledWith('1');
  }));
});
