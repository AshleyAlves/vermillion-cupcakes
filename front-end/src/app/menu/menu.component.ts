import { Component } from '@angular/core';
import { ProductComponent } from '../core/product/product.component';
import { CoverComponent } from '../core/cover/cover.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductComponent, CoverComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
