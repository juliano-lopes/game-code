import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { AuthGuard } from './guards/auth.guard.service';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

//import { RegisterComponent } from './modules/auth/register/register.component';
//import { ModuleListComponent } from './modules/modules/module-list/module-list.component';
//import { ExerciseListComponent } from './modules/exercises/exercise-list/exercise-list.component';
//import { ExerciseExecutionComponent } from './modules/exercises/exercise-execution/exercise-execution.component';
//import { AuthGuard } from './guards/auth.guard'; // Import your AuthGuard

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
      { path: 'exercises/:moduleId', component: ExerciseListComponent, canActivate: [AuthGuard] }
    ]

  },
  { path: '**', component: NotfoundComponent }

];