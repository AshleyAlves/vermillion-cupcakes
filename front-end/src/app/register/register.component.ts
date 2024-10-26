import { Component } from '@angular/core';
import { CoverComponent } from '../core/cover/cover.component';
import { FormsModule } from '@angular/forms';
import { User } from '../core/user/user.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CoverComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    id: '',
    email: '',
    address: '',
    city: '',
    cpf: '',
    district: '',
    fullName: '',
    houseNumber: '',
    password: '',
    phoneNumber: '',
    zipCode: ''
  };

  successMessage: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('api/register', this.user)
      .subscribe(response => {
        console.log(response);
        this.successMessage = 'Usuário registrado com sucesso!';
      }, error => {
        console.error(error);
        this.successMessage = 'Ocorreu um erro ao registrar o usuário.';
      });
  }
}