import {Component, ViewChild} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {TranslatePipe} from "../../../shared/pipes/translate-pipe/translate.pipe";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {languageReducer} from "../../store/languages/language.reducer";
import {TranslateService} from "../../services/translate-service/translate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexModule} from "@angular/flex-layout";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, AsyncPipe, MatToolbarModule, FlexModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  language = 'en';
  isEnglish = true;
  constructor(private translateService: TranslateService, private router: Router) {
  }

  setLanguage(lan: string){
    this.language = lan;
    this.isEnglish = !this.isEnglish;
    this.translateService.setLanguage(lan);
  }

  goHome(){
    this.router.navigateByUrl('/');
  }

}
