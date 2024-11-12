import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../core/user/user.model';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../core/cover/cover.component';
import { Product } from '../core/product/product.model';
import { AuthService } from '../services/auth.service';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CoverComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;
  favorites: Product[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private favoriteService: FavoriteService, private cartService: CartService) {
    this.profileForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      address: [''],
      city: [''],
      cpf: [''],
      district: [''],
      housenumber: [''],
      zipcode: ['']
    });
  }

  ngOnInit(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.profileForm.patchValue(this.user);
      if (this.user && this.user.id) {
        this.favoriteService.getFavorites(this.user.id).subscribe({
          next: (favorites) => { this.favorites = favorites;        
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
  }

  removerDosFavoritos(product: Product): void { 
    if (this.user && this.user.id) { 
      this.favoriteService.removeFromFavorites(this.user.id, String(product.id)).subscribe({ 
        next: () => { 
          console.log(`Produto ${product.nome} removido dos favoritos`); 
          this.favorites = this.favorites.filter(p => p.id !== product.id); 
        }, 
        error: (err) => console.error(`Erro ao remover ${product.nome} dos favoritos:`, err) 
      }); 
    } 
  }
}
