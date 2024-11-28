import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PanelComponent } from '../panel/panel.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
