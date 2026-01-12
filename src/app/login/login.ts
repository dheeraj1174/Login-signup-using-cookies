import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { log } from 'console';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {

    email: string = '';
    password: string = '';
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onLogin() {
        if (!this.email || !this.password) {
            this.error = 'Please fill in all fields';
            return;
        }
        this.authService.login({
            email: this.email,
            password: this.password
        }).subscribe({
            next: (response) => {
                console.log('Login successful');
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error('Login error:', err);
                this.error = err.error?.message || 'Login failed';
            }
        });
    }

    addEventListener(){
        log('hello');
    }

    goToSignup() {
        this.router.navigate(['/signup']);
    }
}
