import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[precent]',
})
export class PercentDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onKeypress(event) {
    if (event.target.value < 0) {
      this.el.nativeElement.value = 0;
    }
    if (event.target.value >= 100) {
      this.el.nativeElement.value = 100;
    }
  }
}
