import {Injectable, Output} from '@angular/core';
import {User} from "../../../features/moving/services/models/user";
import {Router} from "@angular/router";
// import {AngularFireAuth, PERSISTENCE} from "@angular/fire/compat/auth";
import { getAuth, signInWithEmailAndPassword, Auth, browserLocalPersistence} from "firebase/auth";
// import firebase from "firebase";
import firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable(
)
export class AuthService {
  @Output() isLoginedChanged = new BehaviorSubject<boolean>(false);
  isLogined$ :Observable<boolean>;
  auth:Auth ;
  currentUser: any;

  constructor(private router: Router) {
    this.auth = getAuth();
    this.isLogined$ = this.isLoginedChanged.asObservable();
  }

  login(user: User): void {
    this.auth.setPersistence(browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(this.auth, user.email, user.password).then((userCredential) => {
        // Signed in
        debugger;
        this.currentUser = userCredential.user;
        this.isLoginedChanged.next(true);
        this.authSuccessfully();
        // ...
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.isLoginedChanged.next(false);
      this.router.navigate(["/home"]);
    }).catch((error) => {
      // An error happened.
  });
  }

  authSuccessfully(){
    this.router.navigate(["/moving-orders"]);
  }
}
