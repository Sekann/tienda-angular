import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environments.prod';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private apiUrl = `${environment.apiUrl}/order-items`;

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

  getAllOrderItems(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener items de órdenes:', error);
        return throwError(() => error);
      })
    );
  }

  getOrderItemById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener item por ID:', error);
        return throwError(() => error);
      })
    );
  }

  createOrderItem(orderItemData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, orderItemData, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al agregar item a la orden:', error);
        return throwError(() => error);
      })
    );
  }

  deleteOrderItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al eliminar item de la orden:', error);
        return throwError(() => error);
      })
    );
  }
}
