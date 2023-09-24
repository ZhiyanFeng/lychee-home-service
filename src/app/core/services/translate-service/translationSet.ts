export interface TranslationSet {
  language: string;
  values: {[key: string]: string};
}

export  interface  Dictionary {
  languageCode: string;
  value: TranslationSet;
}
