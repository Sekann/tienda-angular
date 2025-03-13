import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments.prod';
import { TokenService } from '../auth/token.service';
import { UseStateService } from '../auth/use-state.service';
import { PopupService } from '../utils/popup.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private popupService: PopupService
    ,private http: HttpClient,
    private tokenService: TokenService,
    private useStateService: UseStateService) {}

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

  getUserProfile(): Observable<any> {
    const username = this.useStateService.getUsername();
    if (!username) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    return this.http.post(`${this.apiUrl}/profile`, { username }, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener perfil:', error);
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
  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    const username = this.useStateService.getUsername();
    if (!username) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    const passwordData = { username, oldPassword, newPassword };

    return this.http.post<void>(`${this.apiUrl}/change-password`, passwordData, {
      headers: this.getHeaders()
    }).pipe(
      catchError((error) => {
        console.error('❌ Error al cambiar contraseña:', error);
        return throwError(() => error);
      })
    );
  }
  
}
