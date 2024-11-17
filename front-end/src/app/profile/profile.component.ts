import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';
import { Product } from '../core/product/product.model';
import { User } from '../core/user/user.model';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../core/cover/cover.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CoverComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User = {
    id: '',
    email: '',
    address: '',
    city: '',
    cpf: '',
    district: '',
    fullname: '',
    housenumber: '',
    password: '',
    phonenumber: '',
    zipcode: ''
  };
  favorites: Product[] = [];
  message: string = ''; // Adicionar a mensagem de confirmação

  constructor(
    private authService: AuthService, 
    private favoriteService: FavoriteService, 
    private cartService: CartService, // Adicionar o serviço de carrinho
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      email: [''],
      fullname: [''],
      address: [''],
      city: [''],
      cpf: [''],
      district: [''],
      housenumber: [''],
      password: [''],
      phonenumber: [''],
      zipcode: ['']
    });
  }

  ngOnInit(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser) as User;
      this.profileForm.patchValue(this.user);

      if (this.user && this.user.id) {
        this.favoriteService.getFavorites(this.user.id).subscribe({
          next: (favorites) => {
            this.favorites = favorites;
          },
          error: (err) => console.error('Erro ao carregar favoritos:', err)
        });
      }
    }
  }

  onUpdate(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.value };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.http.put(`/api/usuario/${this.user.id}`, updatedUser).subscribe({
        next: () => alert('Dados atualizados com sucesso!'),
        error: () => alert('Erro ao atualizar dados. Tente novamente.')
      });
    }
  }

  adicionarAoCarrinho(product: Product): void {
    this.cartService.addToCart(product);
    console.log(`Produto ${product.nome} adicionado ao carrinho`);
    this.showConfirmationMessage('Produto adicionado ao carrinho com sucesso');
  }

  removerDosFavoritos(product: Product): void {
    if (this.user && this.user.id) {
      this.favoriteService.removeFromFavorites(this.user.id, String(product.id)).subscribe({
        next: () => {
          console.log(`Produto ${product.nome} removido dos favoritos`);
          this.favorites = this.favorites.filter(p => p.id !== product.id);
          this.showConfirmationMessage('Produto removido dos favoritos com sucesso');
        },
        error: (err) => console.error(`Erro ao remover ${product.nome} dos favoritos:`, err)
      });
    }
  }

  showConfirmationMessage(message: string): void {
    this.message = message;
    setTimeout(() => this.message = '', 3000); // Mensagem desaparece após 3 segundos
  }
}
