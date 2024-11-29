import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isConnected = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Surveiller l'état de connexion de l'utilisateur
    this.userService.user$.subscribe((user) => {
      this.isConnected = !!user; // true si connecté, false sinon
    });
  }

  logout(): void {
    this.userService.logout().then(() => {
      console.log('Déconnecté avec succès');
    });
  }
}
