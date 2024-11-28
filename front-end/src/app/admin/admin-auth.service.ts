import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminAuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) { }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user'); return !!user;
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    console.log('getUser:', user);
    return user ? JSON.parse(user) : null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        if (user) {
          user.isAdmin = user.admin || false;
          console.log('Login successful, user:', user);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          console.log('Login failed, user is not an admin');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user'); 
    localStorage.removeItem('token'); 
    console.log('Logout successful');
  }
}

