import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1), // Prendre seulement la première émission
      map((user) => {
        if (user) {
          return true; // L'utilisateur est connecté, accès autorisé
        } else {
          this.router.navigate(['/connexion']); // Rediriger si non connecté
          return false;
        }
      })
    );
  }
}