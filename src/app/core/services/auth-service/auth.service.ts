import { Injectable } from '@angular/core';
import {User} from "../../../features/moving/services/models/user";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable(
)
export class AuthService {
  private loginValid: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  login(user: User): boolean{
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.loginValid = true;
        this.authSuccessfully();
      }).catch(error => {
    })
    return this.loginValid;
  }

  authSuccessfully(){
    this.router.navigate(["/home"]);
  }
}
