import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../services/auth-service/auth.service";
import {Credentials} from "../../../features/moving/models/credentials";
import 'firebase/auth';
import {Auth, getAuth} from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import {UserService} from "../../services/user-service/user.service";
import {User} from "../../../shared/models/user";
import {ROLES} from "../../../shared/enums/roles";
import {serverTimestamp} from "@angular/fire/firestore";
import {Store} from "@ngrx/store";
import {UserActions} from "../../store/user/user.actions";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy{

  ui: firebaseui.auth.AuthUI;
  uiConfig: any;
  auth:Auth ;

  public email: string;
  public password: string;
  private user: Credentials ={
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private userService: UserService, private store:Store) {
    this.auth = getAuth();
  }
  ngOnInit() {
    debugger;
    this.ui = this.authService.getFirebaseUi();
    this.uiConfig = this.authService.getFirebaseUiConfig();
    this.ui.start('#firebaseui-auth-container', this.uiConfig);
  }
  ngOnDestroy() {
    if (this.ui) {
      this.ui.delete();
    }
  }
  onSubmit(){
    this.user.email = this.email;
    this.user.password = this.password;
    this.authService.login(this.user);
  }

}
