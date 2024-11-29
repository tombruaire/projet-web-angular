import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-mes-blogs',
  templateUrl: './mes-blogs.component.html',
  styleUrls: ['./mes-blogs.component.css']
})
export class MesBlogsComponent {
  userInfo: any;
  isLoading = true;

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
