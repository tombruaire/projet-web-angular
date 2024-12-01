import { Injectable } from '@angular/core';
import { store } from 'src/app/database/firebase';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword, updateEmail, updatePassword } from 'firebase/auth';
import { Firestore, getFirestore } from '@firebase/firestore';
import { Auth, signInWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from '@firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore: Firestore;
  private auth: Auth;

  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afAuth.authState;
    this.firestore = getFirestore();
    this.auth = getAuth();
  }

  // Méthode pour vérifier si l'email est déjà utilisé par un autre utilisateur
  async ifEmailExist(email: string): Promise<boolean> {
    try {
      const usersRef = collection(store, 'utilisateurs');
      const querySnapshot = await getDocs(query(usersRef, where('email', '==', email)));
      return !querySnapshot.empty;
    } catch (error) {
      return false;
    }
  }

  // Méthode pour ajouter un utilisateur à la base de données
  async addUser(fieldsValues: any): Promise<void> {
    try {
      // Création d'un utilisateur sans le connecter automatiquement
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        fieldsValues.email,
        fieldsValues.password
      );
      
      // Ne pas connecter automatiquement l'utilisateur après l'inscription
      await setDoc(doc(this.firestore, `users/${userCredential.user.uid}`), {
        prenom: fieldsValues.prenom,
        nom: fieldsValues.nom,
        email: fieldsValues.email,
        nbTenatives: 0,
        createdAt: serverTimestamp(),
      });

      // Déconnection de l'utilisateur après sa création
      await this.logout();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      throw error;
    }
  }

  // Méthode pour connecter l'utilisateur
  login({ email, password }: any): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // console.log("Connexion réussie : ", userCredential.user);
        return userCredential;
      })
      .catch((error) => {
        // console.error("Erreur de connexion : ", error.message);
        console.log("Identifiants incorrects !");
        throw error; // Relance l'erreur pour gestion dans le composant
      });
  }

  // Méthode pour obtenir les informations de l'utilisateur
  async getUserInfo(uid: string): Promise<any> {
    try {
      const userDocRef = doc(store, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log("Utilisateur non trouvé");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
      return null;
    }
  }

  // Méthode de déconnexion
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Méthode de déconnexion puis redirection
  async logoutAndRedirect(): Promise<void> {
    try {
      await this.logout();
      console.log("Utilisateur déconnecté !");
      this.router.navigate(['/connexion']);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }

  // Méthode pour modifier les informations de l'utilisateur
  async editUser(updatedData: any): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error("Aucun utilisateur connecté");
      }
  
      // Vérification si les champs sont remplis
      if (!updatedData.prenom || !updatedData.nom || !updatedData.email) {
        throw new Error("Tous les champs doivent être remplis !");
      }
  
      // Réauthentification avec le mot de passe actuel
      if (updatedData.currentPassword) {
        const credential = EmailAuthProvider.credential(user.email as string, updatedData.currentPassword);
        try {
          await reauthenticateWithCredential(user, credential);
          console.log("Réauthentification réussie.");
        } catch (error) {
          console.error("Erreur lors de la réauthentification :", error);
        }
      } else {
        throw new Error("Le mot de passe actuel est requis pour effectuer cette modification.");
      }
  
      // Mise à jour de l'email (si nécessaire)
      if (updatedData.email && updatedData.email !== user.email) {
        try {
          await updateEmail(user, updatedData.email);
          console.log("Adresse email mise à jour !");
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'adresse email :", error);
        }
      }
  
      // Mise à jour du mot de passe (si nécessaire)
      if (updatedData.password) {
        try {
          await updatePassword(user, updatedData.password);
          console.log("Mot de passe mis à jour !");
        } catch (error) {
          console.error("Erreur lors de la mise à jour du mot de passe :", error);
        }
      }
  
      // Mise à jour des informations dans Firestore
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
          prenom: updatedData.prenom,
          nom: updatedData.nom,
          email: updatedData.email,
        }
      );
      console.log("Informations utilisateur mises à jour dans Firestore.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  }  

  // Méthode pour supprimer un compte utilisateur
  async deleteUser(email: string, password: string): Promise<void> {
    try {
      // Connexion de l'utilisateur pour vérifier les identifiants avant la suppression
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        const user = userCredential.user;
        
        // Suppression de l'utilisateur dans Firestore avant la suppression de l'utilisateur de Authentication
        const firestore = getFirestore();
        await deleteDoc(doc(firestore, `users/${user.uid}`));
        console.log("Utilisateur supprimé de Firestore !");
        
        // Suppression de l'utilisateur dans Firebase Authentication
        await deleteUser(user);
        console.log("Utilisateur supprimé de Firebase Authentication !");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  }

}
