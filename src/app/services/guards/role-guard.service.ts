import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UseStateService } from '../auth/use-state.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const useStateService = inject(UseStateService);

  const userRole = useStateService.getRolename();

  if (userRole === 'CLIENT') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
