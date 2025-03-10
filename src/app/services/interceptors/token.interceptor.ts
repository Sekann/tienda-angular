import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../auth/token.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next): Observable<any> => {
  const tokenService = inject(TokenService);
  const accsessToken = tokenService.getAccessToken();

  const cloneReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      ...(accsessToken ? { 'Authorization': 'Bearer ' + accsessToken } : {}),
    },
  });

  return next(cloneReq);
};
