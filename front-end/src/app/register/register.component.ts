import { Component } from '@angular/core';
import { CoverComponent } from '../core/cover/cover.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../core/user/user.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CoverComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
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
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  apiUrl: string = 'api/register';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/.*[A-Z].*/), // Pelo menos uma letra maiúscula
        Validators.pattern(/.*[a-z].*/), // Pelo menos uma letra minúscula
        Validators.pattern(/.*\d.*/), // Pelo menos um número
        Validators.pattern(/.*\W.*/) // Pelo menos um símbolo
      ]],
      phonenumber: ['', Validators.required],
      address: [''],
      city: [''],
      district: [''],
      housenumber: [''],
      zipcode: [''],
      cpf: ['']
    });
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.http.post<User>(this.apiUrl, this.user).subscribe(
        (response: User) => {
          // Utiliza o serviço de autenticação para fazer o login do usuário
          this.authService.login({ email: this.user.email, password: this.user.password }).subscribe(() => {
            this.successMessage = 'Cadastro realizado com sucesso!';
            this.errorMessage = '';
            this.router.navigate(['']);
          });
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
