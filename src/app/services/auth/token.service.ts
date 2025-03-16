import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environments.prod';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); //  no se cambia de inmediato de iniciar sesion a cerrar sesion en la parte del clientepor lo que se usa el behaviorSubject

  constructor(
    private cookieService: CookieService,
  ) {
    this.isAuthenticatedSubject.next(this.cookieService.check(this.ACCESS_TOKEN_KEY));

   }

  saveToken(token: string, refreshToken: string): void {
    this.cookieService.set(this.ACCESS_TOKEN_KEY, token,{
      path: '/',
      secure: environment.tokenSecure,
      sameSite: 'Strict',
    })
    this.cookieService.set(this.REFRESH_TOKEN_KEY, refreshToken, {
      path: '/',
      secure: environment.tokenSecure,
      sameSite: 'Strict',
    });
    this.isAuthenticatedSubject.next(true);
  }
  getAccessToken() {
    return this.cookieService.get(this.ACCESS_TOKEN_KEY);
  }
  getRefreshToken() {
    return this.cookieService.get(this.REFRESH_TOKEN_KEY);
  }

  removeToken(): void {
    this.cookieService.delete(this.ACCESS_TOKEN_KEY, '/','',false,'Strict');
    this.cookieService.delete(this.REFRESH_TOKEN_KEY, '/','',false,'Strict');
    this.isAuthenticatedSubject.next(false);
  }
}
