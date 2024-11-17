import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'api/checkout';

  constructor(private http: HttpClient) {}

  processPayment(orderDetails: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, orderDetails);
  }
}
