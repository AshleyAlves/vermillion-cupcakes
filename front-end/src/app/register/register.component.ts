import { Component } from '@angular/core';
import { CoverComponent } from '../core/cover/cover.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CoverComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    nome: '',
    email: '',
    senha: '',
    telefone: ''
  };

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('http://localhost:8080/api/cadastro', this.user)
      .subscribe(response => {
        console.log('Usuário cadastrado com sucesso!', response);
      }, error => {
        console.error('Erro ao cadastrar o usuário', error);
      });
  }
}
