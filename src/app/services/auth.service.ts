import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  // SIGNUP
  signup(userData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/signup`,
      userData,
      { withCredentials: true }
    );
  }

  // LOGIN
  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      credentials,
      { withCredentials: true }
    );
  }

  isLoggedIn(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/me`,
      { withCredentials: true }
    );
  }

  // LOGOUT
  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
