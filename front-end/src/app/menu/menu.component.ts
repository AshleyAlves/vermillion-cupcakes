import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../core/product/product.component';
import { CoverComponent } from '../core/cover/cover.component';
import { Product } from '../core/product/product.model';
import { ProductService } from '../core/product/product.service';
import { FilterComponent } from '../core/filter/filter.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductComponent, CoverComponent, FilterComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categorias: string[] = [];
  selectedCategory: string = '';
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  message: string = '';

  constructor(private productService: ProductService, private authService: AuthService, private http: HttpClient, private cartService: CartService, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.updateItemsPerPage();
    window.addEventListener('resize', this.updateItemsPerPage.bind(this));
    this.cartService.productAdded.subscribe(() => { this.showConfirmationMessage('Produto adicionado ao carrinho com sucesso'); });
    this.favoriteService.productAddedToFavorites.subscribe(() => { this.showConfirmationMessage('Produto adicionado aos favoritos com sucesso'); });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.setPage(1);
    }, error => {
      console.error('Erro ao carregar produtos:', error);
    });
  }

  updateItemsPerPage(): void {
    const width = window.innerWidth;
    this.itemsPerPage = width < 768 ? 3 : 6;
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  filterProductsByCategory(category: string) {
    if (category) {
      this.filteredProducts = this.products.filter(product => product.categoria === category);
    } else {
      this.filteredProducts = this.products;
    }
  }
  adicionarAoCarrinho(product: Product): void { 
    this.cartService.addToCart(product); 
    console.log(`Produto ${product.nome} adicionado ao carrinho`); 
  }

  showConfirmationMessage(message: string): void { 
    this.message = message; setTimeout(() => this.message = '', 3000);
  }

  adicionarAosFavoritos(product: Product): void { 
    const user = this.authService.getUser(); 
    if (!user || !user.id) { 
      console.error('Usuário não está logado.'); 
      return; 
    } 
    const productId = String(product.id); 
    this.favoriteService.addToFavorites(user.id, productId).subscribe({ 
      next: () => console.log(`Produto ${product.nome} adicionado aos favoritos`), 
      error: (err) => console.error(`Erro ao adicionar ${product.nome} aos favoritos:`, err) 
    }); 
  }
}
