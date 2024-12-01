import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userInfo: any; // Pour stocker les informations complètes de l'utilisateur
  isLoading = true; // Indicateur de chargement

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(async (user) => {
      if (user) {
        const utilisateur = await this.userService.getUserInfo(user.uid);
        this.userInfo = utilisateur;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
}
