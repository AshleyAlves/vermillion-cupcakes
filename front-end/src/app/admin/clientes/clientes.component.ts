import { Component } from '@angular/core';
import { User } from '../../core/user/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    }, error => {
      console.error('Erro ao carregar usuários:', error);
    });
  }

}
