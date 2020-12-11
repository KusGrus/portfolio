import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

type CardOptions = 'name' | 'number' | 'date';

@Directive({
  selector: '[card]',
})
export class CardDirective {
  @Input('card') options: CardOptions;
  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('input', ['$event']) handle(event) {
    switch (this.options) {
      case 'name':
        this.processingName(event.target.value);
        break;
      case 'number':
        this.processingNumber(event.target.value);
        break;
      case 'date':
        this.processingDate(event.target.value);
        break;
    }
  }
  processingName(data: string) {
    this.renderResult(data.toUpperCase());
  }

  processingNumber(data) {
    let result = data;
    result = result.replace(/[^\d]/g, '');
    let currentLen = result.length;

    if (currentLen > 4 && currentLen < 9) {
      result = result.replace(/(\d{4})(\d{1,4})/, '$1 $2');
    } else if (currentLen > 8 && currentLen < 13) {
      result = result.replace(/(\d{4})(\d{4})(\d{1,4})/, '$1 $2 $3');
    } else if (currentLen > 12) {
      result = result.replace(/(\d{4})(\d{4})(\d{4})(\d{1,4})/, '$1 $2 $3 $4');
    }
    this.renderResult(result);
  }

  processingDate(data) {
    let result = data.replace(/[^\d\/]/g, '');
    let currentLen = data.length;
    if (currentLen > 2) {
      result = result.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    this.renderResult(result);
  }

  renderResult(data: string) {
    this.el.nativeElement.value = data;
  }
}
