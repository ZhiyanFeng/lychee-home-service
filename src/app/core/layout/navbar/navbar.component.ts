import {Component, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {TranslatePipe} from "../../../shared/pipes/translate-pipe/translate.pipe";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexModule} from "@angular/flex-layout";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {languageActions} from "../../store/languages/language.actions";
import {MatInputModule} from "@angular/material/input";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, AsyncPipe, MatToolbarModule, FlexModule, MatMenuModule, MatIconModule, MatButtonModule, TranslateModule, MatInputModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  language = 'en';
  collapsed = '';
  isExpanded = false;
  public isLogined = true;

  constructor(private router: Router, private translate: TranslateService, private store: Store, private authService: AuthService) {
  }

  goHome(){
    this.router.navigateByUrl('/');
  }
  ngOnInit(): void {
    this.authService.isLoginedChanged.subscribe((isLogined) => {
      if(isLogined){
        this.isLogined = true;
      }else{
        this.isLogined = false;
      }
    });
  }

  setLanguage(lan: string){
    this.store.dispatch(languageActions.setLanguage({language: lan}));
    this.translate.use(lan);
    this.language = lan;
    this.onCollapsed();
  }

  onCollapsed(){
    let name = document.getElementById('navbarScroll') as HTMLElement;
    name.className = 'navbar-collapse collapse';
  }

  onLogin(){
    this.router.navigate(['/login']);
  }
  onLogout(){
    this.authService.logout();
  }

}
