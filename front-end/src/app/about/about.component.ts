import { Component } from '@angular/core';
import { CoverComponent } from '../core/cover/cover.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CoverComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
