import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../shared/models/user.model";
import { Observable } from "rxjs";
import { UserAuth } from "models/user-auth.models.ts";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;

  constructor(private http: HttpClient) { }

  addUser(user: UserAuth) {
    return this.http.post<User>('http://localhost:3000/users', user).subscribe();
  }

  login(user: UserAuth): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users?username=' + user.username + '&password=' + user.password);
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedUser() {
    return localStorage.getItem('user');
  }

  isUserConnected() {
    if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getSavedUser()) {
      this.getSavedUserInfo().subscribe((users: User[]) => {
        this.user = users[0];
        return true;
      });
    }
    return false;
  }

  private getSavedUserInfo(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users?id=' + this.getSavedUser());
  }
}
