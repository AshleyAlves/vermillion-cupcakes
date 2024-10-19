import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../core/product/product.component';
import { CoverComponent } from '../core/cover/cover.component';
import { Product } from '../core/product/product.model';
import { ProductService } from '../core/product/product.service';
import { FilterComponent } from '../core/filter/filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductComponent, CoverComponent, FilterComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categorias: string[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data; // Inicialmente, mostrar todos os produtos
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    });
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
    console.log(`Cupcake ${product.nome} adicionado aos favoritos`);
  }
}