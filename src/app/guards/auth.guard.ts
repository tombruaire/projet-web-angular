import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); // Injection du UserService
  const router = inject(Router); // Injection du Router

  return userService.user$.pipe(
    take(1), // On écoute uniquement la première valeur
    map(user => {
      if (user) {
        // Si l'utilisateur est connecté, rediriger vers la page d'accueil
        router.navigate(['/']);
        return false; // Empêche l'accès à la route
      }
      return true; // Autorise l'accès si l'utilisateur n'est pas connecté
    })
  );
};