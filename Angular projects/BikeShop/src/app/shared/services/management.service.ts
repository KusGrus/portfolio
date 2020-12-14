import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product, SelectOption } from '../interfaces';
import { CustomValidators } from '../validators/custom.validators';

@Injectable({ providedIn: 'root' })
export class ManagementService {
  public shops: Array<SelectOption> = [
    { key: 'canadabike', value: 'Canada Bike' },
    { key: 'amazon', value: 'Amazon' },
    { key: 'alibaba', value: 'Alibaba' },
  ];
  public sizes: Array<string> = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  public colors: Array<string> = [
    'blue',
    'grey',
    'orange',
    'green',
    'balck',
    'red',
  ];

  initialization(): FormGroup {
    return new FormGroup({
      model: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      images: new FormControl(null, [Validators.required]),
      size: new FormArray([], [Validators.required]),
      color: new FormArray([], [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      shop: new FormControl(null, CustomValidators.selectNonDeafult),
      discount: new FormGroup({
        exist: new FormControl(false),
        amount: new FormControl(0, [Validators.required]),
        date: new FormControl(this.getNextDay(), [
          Validators.required,
          CustomValidators.calendarDate,
        ]),
      }),
      shipping: new FormGroup({
        free: new FormControl(true),
        price: new FormControl(0, [Validators.required]),
      }),
      main: new FormControl(false),
      new: new FormControl(false),
    });
  }

  registrationItem(form, id = null): Product {
    return {
      id: id ? id : null,
      images: form.value.images,
      price: form.value.price,
      shop: form.value.shop.value,
      name: form.value.model,
      main: form.value.main,
      review: [],
      description: form.value.description,
      shipping: form.value.shipping.free
        ? 'Free shipping'
        : form.value.shipping.price,
      new: form.value.new,
      color: this._toUpper(form.value.color),
      size: form.value.size,
      discount: form.value.discount.exist
        ? this._toPercent(form.value.discount.amount)
        : 0,
      discountUntil: form.value.discount.exist
        ? form.value.discount.date
        : null,
    };
  }

  getNextDay(): Date {
    let today = new Date().getTime();
    let tomorrow = today + 24 * 60 * 60 * 1000;
    return new Date(tomorrow);
  }

  private _toUpper(array: Array<string>): Array<string> {
    return array.map((item) => item[0].toUpperCase() + item.slice(1));
  }

  private _toPercent(value: number): number {
    if (value < 0) {
      return 0;
    }
    if (value >= 100) {
      return 100;
    }
    return value;
  }
}
