import { Injectable } from '@angular/core';
import {doc, DocumentData, Firestore, getDoc, getFirestore, serverTimestamp, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {User} from "../../../shared/models/user";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  db: Firestore;

  constructor(private authService: AuthService,
              private router: Router) {
    this.db = getFirestore();
  }

  async saveUser(user: User) {
    const userRef = doc(this.db, "users", user.id);
    await setDoc(userRef, {...user, createdAt: serverTimestamp()}).then(() => {
      console.log('User saved')
    })
      .catch((error) => {
        console.error('Error saving user: ', error)
      });
  }

  async getUser(id: string): Promise<User> {
    debugger;
    const userRef = doc(this.db, "users", id);
    let user: User | DocumentData;
    await getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        user = doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    return user as User;
  }



}
