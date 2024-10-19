import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  imports: [FormsModule, CommonModule]
})
export class FilterComponent implements OnInit {
  selectedCategory: string = '';
  categorias: string[] = [];

  @Output() filterProducts = new EventEmitter<string>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.categorias = this.extractCategories(data);
    });
  }

  loadCategories() {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        console.log('Produtos recebidos:', products);
        this.categorias = [...new Set(products.map(product => product.categoria))];
        console.log('Categorias filtradas:', this.categorias);
      },
      error: (error) => {
        console.error('Erro ao carregar categorias dos produtos', error);
      }
    });
  }

  onFilterChange() {
    this.filterProducts.emit(this.selectedCategory);
  }

  private extractCategories(products: Product[]): string[] {
    const categorias = [...new Set(products.map(product => product.categoria))];
    return categorias;
  }
}