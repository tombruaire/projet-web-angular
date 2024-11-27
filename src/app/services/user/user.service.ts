import { Injectable } from '@angular/core';
import { store } from 'src/app/database/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  editUser(email: string) {
    //
  }

  deleteUser(email: string) {
    //
  }
}
