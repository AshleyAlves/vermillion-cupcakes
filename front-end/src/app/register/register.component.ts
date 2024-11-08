import { Component } from '@angular/core';
import { CoverComponent } from '../core/cover/cover.component';
import { FormsModule } from '@angular/forms';
import { User } from '../core/user/user.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CoverComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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
  errorMessage: string = '';
  successMessage: string = '';
  apiUrl: string = 'api/register';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.user.fullname && this.user.email && this.user.password && this.user.phonenumber) {
      this.http.post<User>(this.apiUrl, this.user).subscribe(
        (response: User) => {
          // Utiliza o serviço de autenticação para armazenar o usuário
          this.authService.login(response);
          this.successMessage = 'Cadastro realizado com sucesso!';
          this.errorMessage = '';
          this.router.navigate(['']);
        },
        error => {
          console.error('Erro da API:', error);
          this.errorMessage = 'Erro ao realizar o cadastro. Tente novamente mais tarde.';
          this.successMessage = '';
        }
      );
    } else {
      console.warn('Campos obrigatórios não preenchidos.');
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      this.successMessage = '';
    }
  }
}
