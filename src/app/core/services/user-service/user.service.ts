import { Injectable } from '@angular/core';
import {doc, Firestore, getFirestore, serverTimestamp, setDoc} from "@angular/fire/firestore";
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
    debugger;
    await setDoc(userRef, {...user, createdAt: serverTimestamp()}).then(() => {
      console.log('User saved')})
      .catch((error) => {
        console.error('Error saving user: ', error)});
  }



}
