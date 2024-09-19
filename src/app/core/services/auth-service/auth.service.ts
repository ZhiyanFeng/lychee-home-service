import {Injectable, OnInit, Output} from '@angular/core';
import {Credentials} from "../../../features/moving/models/credentials";
import {Router} from "@angular/router";
import { getAuth, signInWithEmailAndPassword, Auth, browserLocalPersistence} from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import {BehaviorSubject, Observable} from "rxjs";
import {ROLES} from "../../../shared/enums/roles";
import {UserActions} from "../../store/user/user.actions";
import {User} from "../../../shared/models/user";
import {Store} from "@ngrx/store";


@Injectable(
)
export class AuthService {
  @Output() isLoginedChanged = new BehaviorSubject<boolean>(false);
  isLoggedIn$ :Observable<boolean>;
  auth:Auth ;
  ui: firebaseui.auth.AuthUI;
  currentUser: any;
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (function(authResult, redirectUrl) {
        // Credentials successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        let user = {
          id: this.auth.currentUser.uid,
          email: authResult.additionalUserInfo.profile.email,
          firstName: authResult.additionalUserInfo.profile.given_name,
          lastName: authResult.additionalUserInfo.profile.family_name,
          picture: authResult.additionalUserInfo.profile.picture.toString(),
          role: ROLES.USER,
        }
        debugger;
        if(authResult.additionalUserInfo.isNewUser){
          this.store.dispatch(UserActions.saveUser({user: user}));
        }else {
          this.store.dispatch(UserActions.getUser({id: user.id}));
        }
        return false;
      }).bind(this),
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
  };

  constructor(private router: Router, private store: Store) {
    this.auth = getAuth();
    this.auth.onAuthStateChanged((user) => {
      this.isLoginedChanged.next(!!user);
      this.isLoggedIn$ = this.isLoginedChanged.asObservable();
    })
  }
  login(user: Credentials): void {
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

  getFirebaseUi(){
    return new firebaseui.auth.AuthUI(this.auth);
  }
  getFirebaseUiConfig(){
    return this.uiConfig;
  }
}
