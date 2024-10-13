import { Component } from '@angular/core';
import { ProductComponent } from '../core/product/product.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
