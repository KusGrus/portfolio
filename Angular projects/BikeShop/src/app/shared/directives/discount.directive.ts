import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[discount]',
})
export class DiscountDirective implements OnInit {
  @Input('discount') num = 0;
  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    this.setDiscount(this.num);
  }
  
  setDiscount(num: number): void {
    let discountSize;
    if (num < 100 && num >= 70) {
      discountSize = 'large';
    } else if (num < 70 && num > 40) {
      discountSize = 'medium';
    } else if (num <= 40 && num > 0) {
      discountSize = 'low';
    }
    this.render.addClass(this.el.nativeElement, discountSize);
  }
}
