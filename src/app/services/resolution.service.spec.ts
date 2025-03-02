import { TestBed } from '@angular/core/testing';
import { ResolutionService } from './resolution.service';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { of, throwError } from 'rxjs';
import { Resolution } from '../types/resolution';
import { Exercise } from '../types/exercise';
import { Timestamp } from '@firebase/firestore';
import { FirebaseService } from './firebase.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

describe('ResolutionService', () => {
    let service: ResolutionService;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let dataServiceSpy: jasmine.SpyObj<DataService>;
    let firebaseServiceSpy: jasmine.SpyObj<FirebaseService<Resolution>>;

    const mockExercise: Exercise = {
        id: 'exercise-1',
        moduleId: 'module-1',
        number: 1,
        instructions: 'Exercise instructions',
        statement: 'Exercise statement'
    };

    const mockResolution: Resolution = {
        exerciseId: 'exercise-1',
        moduleId: 'module-1',
        userId: 'user-1',
        completedAt: Timestamp.now(),
    };

    const mockUser = {
        uid: 'user-1',
    } as User;

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AuthService', [''], {
            user$: of(mockUser)
        });
        dataServiceSpy = jasmine.createSpyObj('DataService', ['createDataObject']);
        firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', ['createOrUpdate', 'getByField']);

        TestBed.configureTestingModule({
            providers: [
                ResolutionService,
                { provide: AuthService, useValue: authServiceSpy },
                { provide: DataService, useValue: dataServiceSpy },
            ],
        });

        service = TestBed.inject(ResolutionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('registerExerciseCompletion', () => {
        it('should register exercise completion successfully', async () => {
            // Arrange
            let subscribeCallback: any;
            let subscription: Subscription = new Subscription();
            spyOn(authServiceSpy.user$, 'subscribe').and.callFake((callback) => {
                subscribeCallback = callback;
                subscription = new Subscription();
                return subscription
            });

            firebaseServiceSpy.createOrUpdate.and.resolveTo(mockResolution);
            dataServiceSpy.createDataObject.and.returnValue(firebaseServiceSpy);

            // Act
            const promise = service.registerExerciseCompletion(mockExercise);
            subscribeCallback(mockUser);
            const result = await promise;
            subscription.unsubscribe();

            // Assert
            expect(authServiceSpy.user$.subscribe).toHaveBeenCalled();
            expect(dataServiceSpy.createDataObject).toHaveBeenCalledWith('resolutions');
            expect(firebaseServiceSpy.createOrUpdate).toHaveBeenCalledWith(jasmine.objectContaining({
                exerciseId: mockExercise.id,
                moduleId: mockExercise.moduleId,
                userId: mockUser.uid
            }));
            expect(result).toBeTrue();
        });

        it('should throw an error if exerciseId is missing', async () => {
            // Arrange
            const invalidExercise = {
                id: '',
                number: 0,
                moduleId: 'module-1',
                instructions: 'Exercise instructions',
                statement: 'Exercise statement',
                description: 'Invalid exercise desc'
            };

            // Act & Assert
            try {
                await service.registerExerciseCompletion(invalidExercise);
                fail('Expected an error to be thrown');
            } catch (error: any) {
                expect(error.message).toBe("É preciso haver um exercício válido para registrar a finalização do exercício");
            }
        });

        it('should reject if createOrUpdate fails', async () => {
            // Arrange
            let subscribeCallback: any;
            let subscription: Subscription = new Subscription();
            spyOn(authServiceSpy.user$, 'subscribe').and.callFake((callback) => {
                subscribeCallback = callback;
                subscription = new Subscription();
                return subscription;
            });
            const error = new Error('Simulated Firestore error');
            firebaseServiceSpy.createOrUpdate.and.rejectWith(error);
            dataServiceSpy.createDataObject.and.returnValue(firebaseServiceSpy);

            // Act & Assert
            const promise = service.registerExerciseCompletion(mockExercise);
            subscribeCallback(mockUser);
            subscription.unsubscribe();
            await expectAsync(promise).toBeRejectedWith(false);
            expect(dataServiceSpy.createDataObject).toHaveBeenCalledWith('resolutions');
            expect(firebaseServiceSpy.createOrUpdate).toHaveBeenCalled();
        });

    });

    describe('getExercisesCompleted', () => {
        it('should get completed exercises successfully', async () => {
            // Arrange
            firebaseServiceSpy.getByField.and.returnValue(of([mockResolution]));
            dataServiceSpy.createDataObject.and.returnValue(firebaseServiceSpy);
            const expectedResult = {
                'module-1': ['exercise-1'],
            };

            // Act
            const result = await service.getExercisesCompleted();

            // Assert
            expect(dataServiceSpy.createDataObject).toHaveBeenCalledWith('resolutions');
            expect(firebaseServiceSpy.getByField).toHaveBeenCalledWith('userId', mockUser.uid);
            expect(result).toEqual(expectedResult);
        });

        it('should return an empty object if no resolutions are found', async () => {
            // Arrange
            firebaseServiceSpy.getByField.and.returnValue(of([]));
            dataServiceSpy.createDataObject.and.returnValue(firebaseServiceSpy);
            const expectedResult = {};

            // Act
            const result = await service.getExercisesCompleted();

            // Assert
            expect(dataServiceSpy.createDataObject).toHaveBeenCalledWith('resolutions');
            expect(firebaseServiceSpy.getByField).toHaveBeenCalledWith('userId', mockUser.uid);
            expect(result).toEqual(expectedResult);
        });

        it('should handle getByField errors', async () => {

            // Arrange
            const error = new Error('Simulated Firestore error');
            firebaseServiceSpy.getByField.and.returnValue(throwError(() => error));
            dataServiceSpy.createDataObject.and.returnValue(firebaseServiceSpy);
            //Act and Assert
            await expectAsync(service.getExercisesCompleted()).toBeRejectedWithError(error.message);
            expect(dataServiceSpy.createDataObject).toHaveBeenCalledWith('resolutions');
            expect(firebaseServiceSpy.getByField).toHaveBeenCalled();
        });

    });
});
