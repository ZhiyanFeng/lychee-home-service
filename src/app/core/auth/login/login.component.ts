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
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        debugger;
        console.log(authResult);
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
  };
  this.ui = new firebaseui.auth.AuthUI(this.auth);
  this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  onSubmit(){
    this.user.email = this.email;
    this.user.password = this.password;
    this.authService.login(this.user);
  }
}
