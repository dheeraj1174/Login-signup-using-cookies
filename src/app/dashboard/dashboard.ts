import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
    user: any = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.isLoggedIn().subscribe({
            next: (res) => {
                this.user = res.user;
            },
            error: (err) => {
                console.error('Session error:', err);
                this.router.navigate(['/login']);
            }
        });
    }

    onLogout() {
        this.authService.logout().subscribe({
            next: () => {
                console.log('Logged out successfully');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error('Logout error:', err);
                this.router.navigate(['/login']);
            }
        });
    }
}
