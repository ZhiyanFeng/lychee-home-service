import { Injectable } from '@angular/core';
import {User} from "../../../features/moving/services/models/user";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable(
)
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  login(user: User): boolean{
    let loginValid = false;
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.authSuccessfully();
        loginValid = true;
      }).catch(error => {
        loginValid = false;
    })
    return loginValid;
  }

  authSuccessfully(){
    this.router.navigate(["/home"]);
  }
}
