import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';
import { Product } from '../product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  results: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSearch(term: string) {
    this.productService.setSearchTerm(term);
  }
  viewProduct(product: Product) {
    this.router.navigate(['/cardapio'], { queryParams: { category: product.categoria } });
  }
}
