import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private apiUrl = 'api/produtos/pesquisa';
  menuOpen: boolean = false;
  isLoggedIn = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`);
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => { this.isLoggedIn = status; });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
}

