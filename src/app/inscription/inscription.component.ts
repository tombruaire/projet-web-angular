import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  constructor(private userService: UserService, private router: Router) {}
  
  fieldsValues:any = {}
  errorMessage:string = '';
  isPasswordVisible = false;

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isPasswordVisible = checkbox.checked; // Modifie la visibilité en fonction de l'état de la checkbox
  }

  @HostListener("input", ["$event.target"])
  changeHandler(target: any,) {
    this.fieldsValues[target.id] = target.value;
  }

  @HostListener('submit', ["$event"])
  async onSubmit(e: any) {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (this.fieldsValues.password !== this.fieldsValues.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return; // Arrêter l'exécution de la soumission du formulaire
    }

    const emailTaken = await this.userService.ifEmailExist(this.fieldsValues.email);
    if (emailTaken) {
      this.errorMessage = 'Adresse email déjà utilisée !';
      return; 
    }

    // Effacer le message d'erreur
    this.errorMessage = '';
    
    try {
      await this.userService.addUser(this.fieldsValues);
      this.router.navigate(['/connexion']);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
    }
  }
}
