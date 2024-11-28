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

  @HostListener("input", ["$event.target"])
  changeHandler(target: any,) {
    this.fieldsValues[target.id] = target.value;
  }

  @HostListener('submit', ["$event"])
  onSubmit(e: any) {
    e.preventDefault();
    console.log(this.fieldsValues);
    // this.userService.login(this.fieldsValues);
  }
}
