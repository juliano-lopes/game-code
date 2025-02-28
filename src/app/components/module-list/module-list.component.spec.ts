import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModuleListComponent } from './module-list.component';
import { DataService } from '../../services/data.service';
import { of, throwError, firstValueFrom } from 'rxjs';
import { Module } from '../../types/module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';
import { WelcomeComponent } from '../welcome/welcome.component';

// Mock for DataService
const mockDataService = {
    createDataObject: jasmine.createSpy('createDataObject').and.returnValue({
        list: jasmine.createSpy('list')
    })
};

@Component({
    selector: 'app-welcome',
    template: '',
})
class MockWelcomeComponent {
}
@Component({
    selector: 'app-exercise-list',
    template: '',
})
class MockExerciseListComponent {
}

describe('ModuleListComponent', () => {
    let component: ModuleListComponent;
    let fixture: ComponentFixture<ModuleListComponent>;
    let dataService: any;
    let listSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ModuleListComponent, BrowserAnimationsModule, MatTabsModule],
            providers: [
                { provide: DataService, useValue: mockDataService },
            ],
        }).overrideComponent(ModuleListComponent, {
            remove: { imports: [ExerciseListComponent, WelcomeComponent] },
            add: { imports: [MockExerciseListComponent, MockWelcomeComponent] },
        }).compileComponents();

        fixture = TestBed.createComponent(ModuleListComponent);
        component = fixture.componentInstance;
        dataService = TestBed.inject(DataService);
        listSpy = dataService.createDataObject().list;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch and display modules', waitForAsync(async () => {
        // Arrange
        const mockModules: Module[] = [
            { id: '1', number: 1, name: 'Module 1', description: 'Module 1 desc' },
            { id: '2', number: 2, name: 'Module 2', description: 'Module 2 desc' },
        ];
        listSpy.and.returnValue(of(mockModules));

        // Act
        fixture.detectChanges(); // Trigger ngOnInit

        // Assert
        expect(listSpy).toHaveBeenCalledWith('number');
        const modules = await firstValueFrom(component.modules$!);
        expect(modules.length).toBe(2);
        expect(modules[0].number).toBe(1);
        expect(modules[1].number).toBe(2);

    }));

    it('should handle no modules', waitForAsync(async () => {
        // Arrange
        listSpy.and.returnValue(of([]));

        // Act
        fixture.detectChanges(); // Trigger ngOnInit

        // Assert
        const modules = await firstValueFrom(component.modules$!);
        expect(modules.length).toBe(0);
    }));

    it('should sort modules by number', waitForAsync(async () => {
        // Arrange
        const mockModules: Module[] = [
            { id: '1', number: 1, name: 'Module 1', description: 'Module 1 desc' },
            { id: '2', number: 2, name: 'Module 2', description: 'Module 2 desc' },
            { id: '3', number: 3, name: 'Module 3', description: 'Module 3 desc' },
        ];
        listSpy.and.returnValue(of(mockModules));

        // Act
        fixture.detectChanges(); // Trigger ngOnInit

        // Assert
        const modules = await firstValueFrom(component.modules$!);
        expect(modules.length).toBe(3);
        expect(modules[0].number).toBe(1);
        expect(modules[1].number).toBe(2);
        expect(modules[2].number).toBe(3);
    }));

    it('should select a module', () => {
        // Arrange
        const moduleId = 123;

        // Act
        component.selectModule(moduleId);

        // Assert
        expect(component.selectedModuleId).toBe(moduleId);
    });
});
