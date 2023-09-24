import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "../../../core/services/translate-service/translate.service";

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService : TranslateService) {
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.translationService.translate(value);
  }

}
