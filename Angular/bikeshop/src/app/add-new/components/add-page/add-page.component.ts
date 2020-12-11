import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { Product, SelectOption } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public loading: boolean = false;
  private subscribe: Subscription;
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

  constructor(
    private store: StoreService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialization();
  }

  getNextDay(): Date {
    let today = new Date().getTime();
    let tomorrow = today + 24 * 60 * 60 * 1000;
    return new Date(tomorrow);
  }

  initialization(): void {
    this.form = new FormGroup({
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

  onCheckboxChange(event, controlName): void {
    const array: FormArray = this.form.get(controlName) as FormArray;
    if (event.target.checked) {
      array.push(new FormControl(event.target.value));
    } else {
      array.controls.forEach((item: FormControl, index) => {
        if (item.value === event.target.value) {
          array.removeAt(index);
          return;
        }
      });
    }
  }

  addImage(event): void {
    let container: Array<File> = event.currentFiles;
    this.form.get('images').setValue(container);
  }

  toUpper(array: Array<string>): Array<string> {
    return array.map((item) => item[0].toUpperCase() + item.slice(1));
  }

  toPercent(value: number): number {
    if (value < 0) {
      return 0;
    }
    if (value >= 100) {
      return 100;
    }
    return value;
  }

  submit(): void {
    this.loading = true;
    this.subscribe = this.store
      .pastedImage(this.form.value.images)
      .pipe(
        map((value) => this.registrationItem(value)),
        switchMap((item) => this.store.create(item))
      )
      .subscribe(
        () => {},
        () => {},
        () => {
          this.loading = false;
          this.alert.success('Product added to the store!');
          this.router.navigate(['/']);
        }
      );
  }

  registrationItem(images): Product {
    return {
      images: images,
      price: this.form.value.price,
      shop: this.form.value.shop.value,
      name: this.form.value.model,
      main: this.form.value.main,
      review: [],
      description: this.form.value.description,
      shipping: this.form.value.shipping.free
        ? 'Free shipping'
        : this.form.value.shipping.price,
      new: this.form.value.new,
      color: this.toUpper(this.form.value.color),
      size: this.form.value.size,
      discount: this.form.value.discount.exist
        ? this.toPercent(this.form.value.discount.amount)
        : 0,
      discountUntil: this.form.value.discount.exist
        ? this.form.value.discount.date
        : null,
    };
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
