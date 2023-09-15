import { Injectable } from '@angular/core';
import {TranslationSet} from "./translationSet";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  languages = ['zh-cn', 'en'];
  language = 'zh-en';

  private dictionary: { [key: string]: TranslationSet } = {
    'zh-en': {
       language : 'zh-en',
        values : {
           service: '服务'
        }
    },

    en: {
      language: 'en',
      values: {
        service: 'service'
      }
    }
  }

  constructor() { }

  translate( value: string) : string {
    if(this.dictionary[this.language] != null){
      return this.dictionary[this.language].values[value]
    }
    return "";
  }
}
