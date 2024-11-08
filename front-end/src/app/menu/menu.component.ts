import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../core/product/product.component';
import { CoverComponent } from '../core/cover/cover.component';
import { Product } from '../core/product/product.model';
import { ProductService } from '../core/product/product.service';
import { FilterComponent } from '../core/filter/filter.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

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

  constructor(private productService: ProductService, private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
    this.updateItemsPerPage();
    window.addEventListener('resize', this.updateItemsPerPage.bind(this));
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
    console.log(`Cupcake ${product.nome} adicionado ao carrinho`);
  }

  adicionarAosFavoritos(product: Product): void {
    const user = this.authService.getUser();
    const url = `api/usuarios/${user.id}/favoritos/${product.id}`;
    this.http.put(url, {}).subscribe({
      next: () => console.log(`Cupcake ${product.nome} adicionado aos favoritos`),
      error: (err) => console.error(`Erro ao adicionar ${product.nome} aos favoritos:`, err)
    });
  }
}
