import {Injectable, OnInit} from '@angular/core';
import {Dictionary, TranslationSet} from "./translationSet";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class TranslateService implements OnInit{
  language: string;
  private dictionary: Dictionary;

  constructor(private store: Store<{language:  Dictionary}>) {
    this.store.select('language').subscribe((dict)=>{
      this.dictionary = dict;
    });
  }

  ngOnInit(): void {

  }

  translate( value: string) : string {
    this.language = localStorage.getItem('lan');
    if(this.dictionary[this.language] != null){
      return this.dictionary[this.language].values[value]
    }
    return "";
  }

  setLanguage(lan: string){
    localStorage.setItem('lan', lan);
  }
}
