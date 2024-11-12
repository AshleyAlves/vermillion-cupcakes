import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../core/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = this.loadCart();
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cartItemsChanged = this.cartItemsSubject.asObservable();
  productAdded = new Subject<Product>(); // Novo Subject para produto adicionado

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.saveCart();
    this.cartItemsSubject.next(this.cartItems); // Notificar mudança
    this.productAdded.next(product); // Emitir evento de produto adicionado
  }

  getCartItems(): Product[] {
    return this.loadCart();
  }

  getCartQuantity(): number {
    return this.cartItems.length;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + product.preco, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems); // Notificar mudança
    localStorage.removeItem('cart');
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart(): Product[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
}
