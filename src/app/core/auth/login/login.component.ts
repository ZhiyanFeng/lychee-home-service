import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../services/auth-service/auth.service";
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public email: string;
  public password: string;
  public loginValid = true;
  private user: User ={
    email: '',
    password: ''
  };
constructor(private authService: AuthService) {
}
  onSubmit(){
    this.user.email = this.email;
    this.user.password = this.password;
    this.loginValid = this.authService.login(this.user);
  }
}
