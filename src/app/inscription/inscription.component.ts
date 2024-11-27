import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  constructor(private userService: UserService) {}
  
  fieldsValues:any = {}

  @HostListener("input", ["$event.target"])
  changeHandler(target: any,) {
    this.fieldsValues[target.id] = target.value;
  }

  @HostListener('submit', ["$event"])
  onSubmit(e: any) {
    e.preventDefault();
    this.userService.addUser(this.fieldsValues);
  }
}
