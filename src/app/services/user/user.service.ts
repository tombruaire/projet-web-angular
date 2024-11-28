import { Injectable } from '@angular/core';
import { store } from 'src/app/database/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth) {}

  async addUser({ prenom, nom, email, password }: any) {
    const newUserId = doc(collection(store, "utilisateurs")).id;
    return setDoc(doc(store, "utilisateurs", newUserId), {
        id: newUserId,
        prenom,
        nom,
        email,
        password,
        nbTentatives: 0,
        createdAt: serverTimestamp(),
      })
      .then((res) => {
        console.log("success")
      })
      .catch(() => {
        console.log("erreur")
      })
  }

  login({ email, password }: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  editUser(email: string) {
    //
  }

  deleteUser(email: string) {
    //
  }
}
