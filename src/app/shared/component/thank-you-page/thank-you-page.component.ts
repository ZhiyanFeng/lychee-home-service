import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslateModule],
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css']
})
export class ThankYouPageComponent {
constructor(private router: Router) {
}
  onGoHome(){
    this.router.navigate(['/home']);
  }
}
