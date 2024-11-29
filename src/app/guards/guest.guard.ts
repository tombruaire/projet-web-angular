import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1),
      map((user) => {
        if (!user) {
          return true; // Utilisateur non connecté, accès autorisé
        } else {
          this.router.navigate(['/']); // Redirection si déjà connecté
          return false;
        }
      })
    );
  }
}