import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from '../core/product/product.model';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private apiUrl = '/api'; // URL base da API
    productAddedToFavorites = new Subject<void>(); // Subject para notificar quando um produto é adicionado aos favoritos

    constructor(private http: HttpClient) { }

    addToFavorites(userId: string, productId: string): Observable<void> {
        const url = `${this.apiUrl}/${userId}/favoritos/${productId}`;
        return this.http.put<void>(url, {}).pipe(
            tap(() => this.productAddedToFavorites.next()) // Emitir evento de produto adicionado aos favoritos
        );
    }

    getFavorites(userId: string): Observable<Product[]> {
        const url = `${this.apiUrl}/${userId}/favoritos`;
        return this.http.get<Product[]>(url);
    }
    removeFromFavorites(userId: string, productId: string): Observable<void> { 
        const url = `${this.apiUrl}/${userId}/favoritos/${productId}`; 
        return this.http.delete<void>(url).pipe( tap(() => this.productAddedToFavorites.next()) ); 
    }
}
