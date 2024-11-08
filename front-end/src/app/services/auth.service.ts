import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../core/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private router: Router) {
    this.isLoggedIn.next(!!localStorage.getItem('isLoggedIn'));
  }

  login(user: any): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedIn.next(true);
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

  addFavorite(product: Product): void {
    const user = this.getUser();
    if (!user.favorites) {
      user.favorites = [];
    }
    user.favorites.push(product);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getFavorites(): Product[] {
    const user = this.getUser();
    return user.favorites || [];
  }
}
