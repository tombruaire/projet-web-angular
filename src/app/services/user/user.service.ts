import { Injectable } from '@angular/core';
import type { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: {
    prenom: string,
    nom: string,
    email: string,
    password: string
  }[] = [];

  // constructor(private http: HttpClient) { }

  addUser(prenom: string, nom: string, email: string, password: string) {
    this.users.push({prenom, nom, email, password});
  }

  editUser(email: string) {
    //
  }

  deleteUser(email: string) {
    this.users = this.users.filter(user => user.email !== email);
  }
}
