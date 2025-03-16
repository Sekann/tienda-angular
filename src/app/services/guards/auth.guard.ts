import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from '../auth/token.service';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environments';
import { UseStateService } from '../auth/use-state.service';

export const authGuard: CanActivateFn = async (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);
  const http = inject(HttpClient);
  const userState = inject(UseStateService);

  const accessToken = tokenService.getAccessToken();
  const refreshToken = tokenService.getRefreshToken();
  const username = userState.getUsername();

  if (!accessToken) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const response: any = await firstValueFrom(
      http.post(`${environment.apiUrl}/users/check-token`, {
        username: username, // actualizado a username
        token: accessToken,
      })
    )

    return true;
  } catch (error) {
    // tokenService.removeToken()
    router.navigate(['/login']);
    return false;
  }
};
