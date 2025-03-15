import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environments.prod';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getAccessToken();
    if (!token) {
      console.error('⚠️ No hay token disponible');
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProducts(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?userId=${userId}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('❌ Error al obtener productos:', error);
        return throwError(() => error);
      })
    );
  }

  createProduct(userId: number, productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create?userId=${userId}`, productData, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('❌ Error al agregar producto:', error);
        return throwError(() => error);
      })
    );
  }

  deleteProduct(productId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${productId}?userId=${userId}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('❌ Error al eliminar producto:', error);
        return throwError(() => error);
      })
    );
  }
}
