import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../core/cover/cover.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CoverComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) { this.checkoutForm = this.fb.group({ name: ['', Validators.required], cardNumber: [''], expiryDate: [''], cvv: [''] });}
}
