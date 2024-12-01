import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../product/product.model';
import { FavoriteService } from '../../services/favorite.service';
import { ProductService } from '../product/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private apiUrl = 'api/produtos/pesquisa';
  menuOpen: boolean = false;
  isLoggedIn = false;
  totalQuantity: number = 0;
  totalPrice: number = 0.00;
  searchQuery: string = ''; 
  searchResults: Product[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private cartService: CartService, private favoriteService: FavoriteService, private productService: ProductService) {
    this.router.events.subscribe((event) => { if (event instanceof NavigationEnd) { this.clearSearch(); } });

  }

  onSearch(): void {
    if (this.searchQuery.trim() !== '') {
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.searchResults = products.filter(product => product.nome.toLowerCase().includes(this.searchQuery.toLowerCase()));
      });
    } else {
      this.searchResults = [];
    }
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => { this.isLoggedIn = status; });
    this.updateCartValues(); this.cartService.cartItemsChanged.subscribe(() => { this.updateCartValues(); });
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
  updateCartValues(): void {
    this.totalQuantity = this.cartService.getCartQuantity(); this.totalPrice = this.cartService.getTotalPrice();
  }

  clearSearch(): void { this.searchQuery = ''; this.searchResults = []; }

  adicionarAoCarrinho(product: Product): void {
    this.cartService.addToCart(product);
    this.clearSearch();
    console.log(`Produto ${product.nome} adicionado ao carrinho`);
  }

  adicionarAosFavoritos(product: Product): void {
    this.clearSearch();
    const user = this.authService.getUser();
    if (!user || !user.id) {
      console.error('Usuário não está logado.');
      this.router.navigate(['/login']);
      return;
    }

    const productId = String(product.id);
    this.favoriteService.addToFavorites(user.id, productId).subscribe({
      next: () =>
        console.log(`Produto ${product.nome} adicionado aos favoritos`),
      error: (err) =>
        console.error(`Erro ao adicionar ${product.nome} aos favoritos:`, err)
    });
  }
}

