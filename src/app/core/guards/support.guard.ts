import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const supportGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService)
    const router = inject(Router)


    console.log('authService.isAuthenticated(): ', authService.isAuthenticated());
    if (authService.isAuthenticated()){
      return true;
    }

    return router.navigate(['/login']);

};
