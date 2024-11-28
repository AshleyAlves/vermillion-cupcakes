import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'api/produtos';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  private searchTerm = new BehaviorSubject<string>('');

  setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm.asObservable();
  }

  searchProducts(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`api/produtos/search?term=${term}`);
  }

  getProductsBySearch(): Observable<Product[]> {
    return this.searchTerm.pipe(
      switchMap((term) => this.searchProducts(term))
    );
  }

  addProduct(product: Product): Observable<Product> { 
    return this.http.post<Product>(this.apiUrl, product); 
  }
}