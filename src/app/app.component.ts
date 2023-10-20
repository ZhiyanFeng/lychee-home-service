import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./core/layout/navbar/navbar.component";
import {Store} from "@ngrx/store";
import {languageActions} from "./core/store/languages/language.actions";
import {FooterComponent} from "./core/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'professional-moving';

  constructor(private store: Store) {
  }
  ngOnInit(): void {
    this.store.dispatch(languageActions.loadLanguages());
    localStorage.setItem('lan', 'en');
  }
}
