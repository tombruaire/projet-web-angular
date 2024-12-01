import { Component, HostListener, NgModule } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent {

  constructor(private userService: UserService,  private router: Router,) {}

  userInfo: any;
  isLoading = true;
  fieldsValues: any = {}
  errorMessage: string = '';
  successMessage: string = '';
  isPasswordVisible = false;

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isPasswordVisible = checkbox.checked;
  }

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

  @HostListener("input", ["$event.target"])
  changeHandler(target: any): void {
    this.userInfo[target.id] = target.value;
  }

  @HostListener('submit', ["$event"])
  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.fieldsValues.password !== this.fieldsValues.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const emailTaken = await this.userService.ifEmailExist(this.fieldsValues.email);
    if (emailTaken) {
      this.errorMessage = 'Adresse email déjà utilisée !';
      return; 
    }

    // Effacer le message d'erreur
    this.errorMessage = '';

    try {
      await this.userService.editUser(this.userInfo);
      console.log('Profil modifié avec succès.');
    } catch (error) {
      console.error('Erreur lors de la modification du profil : ', error);
    }
  }

}
