import {
  Directive,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[multi-check]',
})
export class MultiCheckDirective {
  @HostListener('keypress', ['$event']) onKeypress() {
    return false;
  }
}
