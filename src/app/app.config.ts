import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Import Firestore functions
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getApp } from '@firebase/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore(getApp(), environment.firebase.database)), // Provide Firestore
    AuthService,
    DataService, provideAnimationsAsync()
  ]
};