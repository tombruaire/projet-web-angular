import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {

  constructor(private userService: UserService) {}
  
  fieldsValues:any = {}
  errorMessage: string = ''; // Stocker les erreurs pour l'affichage

  @HostListener("input", ["$event.target"])
  changeHandler(target: any,) {
    this.fieldsValues[target.id] = target.value;
  }

  @HostListener('submit', ["$event"])
  async onSubmit(e: any) {
    e.preventDefault();
    // console.log(this.fieldsValues);
    this.userService.login(this.fieldsValues);
    try {
      const result = await this.userService.login(this.fieldsValues);
      console.log("Utilisateur connecté :", result.user);
      // Redirection ou action après la connexion réussie
    } catch (error) {
      this.errorMessage = error.message; // Affiche l'erreur dans l'interface utilisateur
    }
  }
}

