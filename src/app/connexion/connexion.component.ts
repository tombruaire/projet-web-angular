import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {

  constructor(private userService: UserService, private router: Router) {}
  
  fieldsValues:any = {}
  errorMessage: string = ''; // Stocker les erreurs pour l'affichage

  @HostListener("input", ["$event.target"])
  changeHandler(target: any,) {
    this.fieldsValues[target.id] = target.value;
  }

  @HostListener('submit', ["$event"])
  async onSubmit(e: any) {
    e.preventDefault();
    try {
      const result = await this.userService.login(this.fieldsValues);
      console.log("Utilisateur connecté :", result.user);
      this.errorMessage = '';
      this.router.navigate(['/']);
    } catch (error) {
      console.error("Identifiants incorrects !");
      // this.errorMessage = error.message; // Affiche l'erreur dans l'interface utilisateur
      this.errorMessage = "Identifiants incorrects, veuillez réessayer.";
    }
  }
}

