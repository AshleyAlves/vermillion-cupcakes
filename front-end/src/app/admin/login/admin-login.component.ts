import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private adminAuthService: AdminAuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.adminAuthService.login(email, password).subscribe({
        next: (user) => {
          if (user.isAdmin) {
            this.router.navigate(['/admin/painel']);
          } else {
            this.errorMessage = 'Acesso negado. Apenas administradores podem acessar esta área.';
          }
        }, error: () => {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        }
      });
    }
  }

}
