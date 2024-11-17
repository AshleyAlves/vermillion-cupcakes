import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../core/product/product.model';
import { CheckoutService } from '../services/checkout.service';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../core/cover/cover.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CoverComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder, 
    private cartService: CartService, 
    private checkoutService: CheckoutService, 
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      paymentMethod: ['credit_card', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const orderDetails = {
        ...this.checkoutForm.value,
        items: this.cartItems,
        total: this.totalPrice
      };
      this.checkoutService.processPayment(orderDetails).subscribe({
        next: () => {
          this.cartService.clearCart();
          this.router.navigate(['/confirmation']);
        },
        error: (err) => console.error('Erro ao processar pagamento:', err)
      });
    }
  }
}
