import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.prod';
import { LoginInterface, UserInterface } from '../interfaces/auth';
import { Router } from '@angular/router';
import { PopupService } from '../utils/popup.service';
import { TokenService } from './token.service';
import { UseStateService } from './use-state.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor( 
    private http: HttpClient,private useStateService: UseStateService,
        private popupService: PopupService,
        private tokenService: TokenService,
        private router: Router,
  ) { }

  login(credentials: LoginInterface):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, credentials);
}

register(userData: UserInterface): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/users/register`, userData)
}

async logout(): Promise<void> {
  const confirmed = await this.popupService.showConfirmation(
    "¿Estás seguro?",
    "Se cerrará tu sesión."
  );

  if (confirmed) {
    this.popupService.loader("Cerrando sesión", "Espere un momento");
    this.tokenService.removeToken();
    this.useStateService.removeSession();
    setTimeout(() => {
      this.popupService.close();
      this.router.navigate(["/login"]);
    }, 1500);
  }
}
}
