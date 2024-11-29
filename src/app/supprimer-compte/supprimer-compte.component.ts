import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supprimer-compte',
  templateUrl: './supprimer-compte.component.html',
  styleUrls: ['./supprimer-compte.component.css']
})
export class SupprimerCompteComponent {

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
  changeHandler(target: any,) {
    this.fieldsValues[target.id] = target.value;
  }

  @HostListener('submit', ["$event"])
  async onSubmit(e: any) {
    e.preventDefault();
    const { email, password } = this.fieldsValues;
    try {
      await this.userService.deleteUser(email, password);
      this.successMessage = 'Votre compte a été supprimé avec succès.';
      this.router.navigate(['/connexion']);
      // setTimeout(() => {
      //   this.router.navigate(['/connexion']);
      // }, 2000);
    } catch (error) {
      // console.error('Erreur lors de la suppression du compte:', error);
      this.errorMessage = 'Identifiants incorrect !';
    }
  }
}
