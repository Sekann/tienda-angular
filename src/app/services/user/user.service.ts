import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environments.prod';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Obtener encabezados con token
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


  // Obtener perfil del usuario autenticado
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('❌ Error al obtener perfil:', error);
        return throwError(() => error);
      })
    );
  }

  // Actualizar perfil del usuario
  updateUserProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, userData, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('❌ Error al actualizar perfil:', error);
        return throwError(() => error);
      })
    );
  }

  // Cambiar contraseña
  changePassword(passwordData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, passwordData, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('❌ Error al cambiar contraseña:', error);
        return throwError(() => error);
      })
    );
  }
}
