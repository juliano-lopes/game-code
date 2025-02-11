import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseExecutionComponent } from './exercise-execution.component';

describe('ExerciseExecutionComponent', () => {
  let component: ExerciseExecutionComponent;
  let fixture: ComponentFixture<ExerciseExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
