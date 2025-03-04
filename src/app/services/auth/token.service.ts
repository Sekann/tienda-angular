import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environments.prod';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(
    private cookieService: CookieService,

  ) { }

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
    })
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
  }
}
