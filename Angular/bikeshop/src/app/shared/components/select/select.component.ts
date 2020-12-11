import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  Provider,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SelectOption } from '../../interfaces';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [VALUE_ACCESSOR],
  animations: [
    trigger('box', [
      transition('void => *', [style({ opacity: 0 }), animate(200)]),
      transition('* => void', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() default: string | number = 'Select';
  @Input() data: Array<SelectOption> = [];
  public visible: boolean = false;
  private onChange = (_) => {};
  private onTouched = () => {};

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.visible = false;
    }
  }

  writeValue(value: SelectOption[]): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  handle(option: SelectOption) {
    this.default = option.value;
    this.visible = !this.visible;
    this.onChange(option);
  }

  touched() {
    setTimeout(() => {
      this.onTouched();
    }, 500);
  }
}
