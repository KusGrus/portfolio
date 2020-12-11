import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyLetter]',
})
export class LetterDirective {
  @HostListener('keypress', ['$event']) onKeypress(event) {
    const re = /[A-zА-яЁё-]/;
    return re.test(event.key);
  }
}
