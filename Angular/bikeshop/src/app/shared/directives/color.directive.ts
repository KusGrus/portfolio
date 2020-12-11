import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[color]',
})
export class ColorDirective implements OnInit {
  @Input('color') col;
  @HostBinding("style.backgroundColor") elColor;
  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    this.elColor = this.col.toLowerCase();
  }

}
