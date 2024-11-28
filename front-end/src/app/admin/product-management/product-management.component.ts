import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../core/product/product.model';
import { ProductService } from '../../core/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagem: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    }, error => {
      console.error('Erro ao carregar produtos:', error);
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          this.loadProducts(); // Recarregar a lista de produtos
          this.productForm.reset();
        },
        error: (err) => console.error('Erro ao adicionar produto:', err)
      });
    }
  }
}
