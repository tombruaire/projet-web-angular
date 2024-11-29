import { Injectable } from '@angular/core';
import { store } from 'src/app/database/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<any>; // Observable pour surveiller l'état utilisateur

  constructor(private afAuth: AngularFireAuth) {
    // Initialisation de l'observable user$
    this.user$ = this.afAuth.authState;
  }

  async addUser({ prenom, nom, email, password }: any) {
    try {
      // Étape 1 : Création de l'utilisateur dans Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  
      // Récupération de l'ID utilisateur généré par Firebase Authentication
      const uid = userCredential.user?.uid;
  
      // Étape 2 : Ajout de l'utilisateur dans Cloud Firestore
      if (uid) {
        await setDoc(doc(store, "utilisateurs", uid), {
          id: uid, // On utilise l'UID de Firebase Auth pour lier les deux systèmes
          prenom,
          nom,
          email,
          nbTentatives: 0,
          createdAt: serverTimestamp(),
        });
        console.log("Utilisateur créé dans Authentication et Firestore !");
      } else {
        console.error("Impossible de récupérer l'UID de l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  }

  login({ email, password }: any): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // console.log("Connexion réussie : ", userCredential.user);
        console.log("Connexion réussie !");
        return userCredential;
      })
      .catch((error) => {
        // console.error("Erreur de connexion : ", error.message);
        console.log("Identifiants incorrects !");
        // throw error; // Relance l'erreur pour gestion dans le composant
      });
  }

  /* SAVE
  logout(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => console.log("Déconnexion réussie !"))
      .catch((error) => console.error("Erreur lors de la déconnexion : ", error));
  }
  */

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  editUser(email: string) {
    //
  }

  deleteUser(email: string) {
    //
  }
}
