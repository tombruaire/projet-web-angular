import { Injectable } from '@angular/core';
import { store } from 'src/app/database/firebase';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Firestore, getFirestore } from '@firebase/firestore';
import { Auth, signInWithEmailAndPassword, deleteUser } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore: Firestore;
  private auth: Auth;

  user$: Observable<any>; // Observable pour surveiller l'état utilisateur

  constructor(private afAuth: AngularFireAuth) {
    // Initialisation de l'observable user$
    this.user$ = this.afAuth.authState;
    this.firestore = getFirestore();
    this.auth = getAuth();
  }

  // Méthode pour vérifier si l'email est déjà utilisé par un autre utilisateur
  async ifEmailExist(email: string): Promise<boolean> {
    try {
      // console.log(`Vérification de l'email : ${email}`);
      const usersRef = collection(store, 'utilisateurs');
      const querySnapshot = await getDocs(query(usersRef, where('email', '==', email)));
      // console.log('Résultat de la requête :', querySnapshot);
      return !querySnapshot.empty;
    } catch (error) {
      // console.error('Erreur lors de la vérification de l\'email :', error);
      return false;
    }
  }

  async addUser(fieldsValues: any): Promise<void> {
    try {
      // Créer l'utilisateur sans le connecter automatiquement
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        fieldsValues.email,
        fieldsValues.password
      );
      
      // Ne pas connecter automatiquement l'utilisateur après l'inscription
      await setDoc(doc(this.firestore, `utilisateurs/${userCredential.user.uid}`), {
        prenom: fieldsValues.prenom,
        nom: fieldsValues.nom,
        email: fieldsValues.email,
        createdAt: serverTimestamp(),
      });

      // Déconnection de l'utilisateur après sa création
      await this.logout();
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      throw error;
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

  async getUserInfo(uid: string): Promise<any> {
    try {
      const userDocRef = doc(store, `utilisateurs/${uid}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log('Utilisateur non trouvé');
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      return null;
    }
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  editUser(email: string) {
    //
  }

  async deleteUser(email: string, password: string): Promise<void> {
    try {
      // Connexion de l'utilisateur pour vérifier les identifiants avant la suppression
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        const user = userCredential.user;
        
        // Suppression de l'utilisateur dans Firestore avant la suppression de l'utilisateur de Authentication
        const firestore = getFirestore();
        await deleteDoc(doc(firestore, `utilisateurs/${user.uid}`));
        console.log('Utilisateur supprimé de Firestore !');
        
        // Suppression de l'utilisateur dans Firebase Authentication
        await deleteUser(user);
        console.log('Utilisateur supprimé de Firebase Authentication !');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }

}
