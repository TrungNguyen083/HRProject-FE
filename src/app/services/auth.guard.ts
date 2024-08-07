import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from '../shared/message/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
    
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  const requiredRole = route.data['requiredRole'];
  const user = authService.getUser();

  if (authService.isLoggedIn() && user && Array.isArray(user.role) && user.role.includes(requiredRole)) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect to home or any other page
    notificationService.warnNotification("You don't have permission to access this page");
    return false;
  }
};