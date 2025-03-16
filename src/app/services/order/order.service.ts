import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environments.prod';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

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

  getAllOrders(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener órdenes:', error);
        return throwError(() => error);
      })
    );
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener orden por ID:', error);
        return throwError(() => error);
      })
    );
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, orderData, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al crear orden:', error);
        return throwError(() => error);
      })
    );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al eliminar orden:', error);
        return throwError(() => error);
      })
    );
  }
}
