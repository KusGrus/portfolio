import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onlyDigit]',
})
export class DigitDirective {
  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('keypress', ['$event']) onKeypress(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
