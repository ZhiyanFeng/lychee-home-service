import {Component, OnChanges, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./core/layout/navbar/navbar.component";
import {Store} from "@ngrx/store";
import {languageActions} from "./core/store/languages/language.actions";
import {FooterComponent} from "./core/layout/footer/footer.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {PrimeNGConfig} from "primeng/api";
import {SizeDetectorComponent} from "./shared/component/size-detector/size-detector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, TranslateModule, SizeDetectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'professional-moving';
  language: string;

  constructor(private store: Store, translate: TranslateService, private primengConfig: PrimeNGConfig) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
    this.store.dispatch(languageActions.setLanguage({language: 'en'}));
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
    this.primengConfig.csp.set({nonce: '...'});

  }
}
