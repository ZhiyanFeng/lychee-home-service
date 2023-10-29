import {Component, ViewChild} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {TranslatePipe} from "../../../shared/pipes/translate-pipe/translate.pipe";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {languageReducer} from "../../store/languages/language.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexModule} from "@angular/flex-layout";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {languageActions} from "../../store/languages/language.actions";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, AsyncPipe, MatToolbarModule, FlexModule, MatMenuModule, MatIconModule, MatButtonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  language = 'en';
  isEnglish = true;
  constructor(private translateService: TranslateService, private router: Router, private translate: TranslateService, private store: Store) {
  }

  goHome(){
    this.router.navigateByUrl('/');
  }

  setLanguage(lan: string){
    this.store.dispatch(languageActions.setLanguage({language: lan}));
    this.translate.use(lan);
  }

}
