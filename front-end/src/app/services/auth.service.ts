import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../core/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  private apiUrl = '/api/login';

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn.next(!!localStorage.getItem('isLoggedIn'));
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(response));
        this.isLoggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.isLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  checkLoginStatus(): boolean {
    return this.isLoggedIn.getValue();
  }
}
