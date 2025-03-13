import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UseStateService {
  private readonly USER_KEY = 'tienda_online'
  constructor( private cookieService: CookieService) { }

  save(username: string, roleName: string): void {
    const userData = JSON.stringify({ username, roleName });
    sessionStorage.setItem(this.USER_KEY, userData);
  }

  getUsername(): string | null {
    const session= JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }else{
      return session.username
    }
  }
  getRolename(): string | null {
    const session= JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }else{
      return session.roleName
    }
  }
  removeSession(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }
}
