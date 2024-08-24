import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../services/auth-service/auth.service";
import {User} from "../../../features/moving/services/models/user";
import 'firebase/auth';
import {Auth, getAuth} from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  ui: firebaseui.auth.AuthUI;
  auth:Auth ;

  public email: string;
  public password: string;
  private user: User ={
    email: '',
    password: ''
  };
constructor(private authService: AuthService) {
  this.auth = getAuth();
}
ngOnInit() {
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
  };

  this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  this.ui.start('#firebaseui-auth-container', uiConfig);
}

// ngOnInit() {
//   // Initialize the FirebaseUI Widget using Firebase.
//   const ui = new firebaseui.auth.AuthUI(firebase.auth());
//   const uiConfig = {
//     callbacks: {
//       signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//         // User successfully signed in.
//         // Return type determines whether we continue the redirect automatically
//         // or whether we leave that to developer to handle.
//         return true;
//       },
//       uiShown: function() {
//         // The widget is rendered.
//         // Hide the loader.
//         document.getElementById('loader').style.display = 'none';
//       }
//     },
//     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//     signInFlow: 'popup',
//     signInSuccessUrl: '/home',
//     signInOptions: [
//       // Leave the lines as is for the providers you want to offer your users.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       firebase.auth.PhoneAuthProvider.PROVIDER_ID
//     ],
//     // Terms of service url.
//     tosUrl: '<your-tos-url>',
//     // Privacy policy url.
//     privacyPolicyUrl: '<your-privacy-policy-url>'
//   };
//   // The start method will wait until the DOM is loaded.
//   ui.start('#firebaseui-auth-container', uiConfig);
// }
//

  onSubmit(){
    this.user.email = this.email;
    this.user.password = this.password;
    this.authService.login(this.user);
  }

  // loginWithGoogle() {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(this.afAuth.auth, provider)
  //     .then((result) => {
  //       // User successfully signed in
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       console.log(result.user); // User data (including ID token)
  //       // Send the access token to your backend for further processing
  //       this.router.navigate(['/home']); // Redirect to home page after login
  //     })
  //     .catch((error) => {
  //       console.error(error); // Handle errors
  //     });
  // }
}
