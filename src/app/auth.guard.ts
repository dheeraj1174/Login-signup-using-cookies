import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLoggedIn().pipe(
        map(() => {
            console.log('AuthGuard: Session valid. Access granted.');
            return true;
        }),
        catchError((err) => {
            console.error('AuthGuard: Session invalid. Redirecting to login.', err);
            router.navigate(['/login']);
            return of(false);
        })
    );
};
