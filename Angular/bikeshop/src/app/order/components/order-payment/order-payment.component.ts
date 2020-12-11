import {
  AfterContentChecked,
  Component,
  forwardRef,
  Input,
  OnInit,
  Provider,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Payment } from 'src/app/shared/interfaces';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OrderPaymentComponent),
  multi: true,
};

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class OrderPaymentComponent
  implements OnInit, ControlValueAccessor, AfterContentChecked {
  private onChange = (value: any) => {};
  private onTouched = () => {};
  public payment: Payment = {
    type: 'card',
    valid: false,
  };
  public form: FormGroup;
  public card = {
    name: '',
    number: '',
    date: '',
    code: '',
    flip: false,
  };

  ngAfterContentChecked(): void {
    this.form.get('type').setValue(this.payment.type);
  }

  ngOnInit(): void {
    this.initialization();
  }

  initialization() {
    this.form = new FormGroup({
      type: new FormControl(),
      card: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        number: new FormControl(null, [
          Validators.required,
          Validators.minLength(19),
        ]),
        date: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          CustomValidators.cardExpiration,
        ]),
        code: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
      }),
      cash: new FormGroup({
        currency: new FormControl('dollars'),
        remains: new FormControl(false),
        remainsCount: new FormControl({ value: null, disabled: true }),
      }),
    });
  }

  writeValue(value: Payment): void {
    this.payment = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  pushChange() {
    let result;
    if (this.payment.type === 'paypal') {
      result = {
        type: this.payment.type,
        valid: true,
      };
    }

    if (this.payment.type === 'cash') {
      result = {
        type: this.payment.type,
        currency: this.form.get(this.payment.type).value.currency,
        remains: this.form.get(this.payment.type).value.remainsCount,
        valid:
          this.form.get(this.payment.type).status === 'VALID' ? true : false,
      };
    }

    if (this.payment.type === 'card') {
      result = {
        type: this.payment.type,
        name: this.form.get(this.payment.type).value.name,
        number: this.form.get(this.payment.type).value.number,
        date: this.form.get(this.payment.type).value.date,
        code: this.form.get(this.payment.type).value.code,
        valid:
          this.form.get(this.payment.type).status === 'VALID' ? true : false,
      };
    }
    this.payment = result;
    this.onChange(result);
  }

  checkRemains(): void {
    if (this.form.get('cash').get('remains').value) {
      this.form.get('cash').get('remainsCount').enable();
    } else {
      this.form.get('cash').get('remainsCount').setValue('');
      this.form.get('cash').get('remainsCount').disable();
    }
  }
}
