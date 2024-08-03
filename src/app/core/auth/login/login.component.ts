import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../services/auth-service/auth.service";
import {User} from "../../../features/moving/services/models/user";

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
