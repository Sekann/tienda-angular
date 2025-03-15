import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UseStateService {
  private readonly USER_KEY = 'tienda_online'
  constructor( private cookieService: CookieService) { }

  save(username: string, roleName: string, userId: number): void {
    const userData = JSON.stringify({ username, roleName, userId });
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
  getUserId(): number | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    return session ? session.userId : null;
  }
  
  removeSession(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }
}
