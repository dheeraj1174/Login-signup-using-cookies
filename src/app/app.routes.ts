import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] 

    },
    { path: '**', redirectTo: 'login' }
];

