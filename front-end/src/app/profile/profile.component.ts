import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../core/user/user.model';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../core/cover/cover.component';
import { Product } from '../core/product/product.model';
import { AuthService } from '../services/auth.service';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.profileForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      address: [''],
      city: [''],
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
      this.favorites = this.authService.getFavorites();
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
}
