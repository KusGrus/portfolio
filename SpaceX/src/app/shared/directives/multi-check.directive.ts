import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[multi-check]',
})
export class MultiCheckDirective {
  @HostListener('change', ['$event']) onChange(event) {
    console.log(event);
  }
  @HostListener('keypress', ['$event']) onKeypress(event) {
    return false;
  }
}
