import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Product, SelectOption } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  public form: FormGroup;
  public deafault: string | number = 'Select';
  public model: string = '';
  public loading: boolean = false;
  private subscribe: Subscription;
  private id: string = '';
  public item: Product;
  public images: Array<any> = [];
  public files: Array<File> = [];
  public patchedColors: Array<string> = [];
  public patchedSizes: Array<string> = [];
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialization();
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = params['id'];
          return this.store.getById(params['id']);
        })
      )
      .subscribe((value) => {
        this.patchForm(value);
      });
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

  patchForm(prodcut: Product): void {
    this.images = prodcut.images;
    this.deafault = prodcut.shop;
    this.model = prodcut.name;
    this.patchedColors = prodcut.color.map((color) => color.toLowerCase());
    this.patchedSizes = prodcut.size;
    prodcut.size.forEach((value) => {
      (this.form.get('size') as FormArray).push(new FormControl(value));
    });
    prodcut.color.forEach((value) => {
      (this.form.get('color') as FormArray).push(new FormControl(value));
    });
    this.form.patchValue({
      model: prodcut.name,
      description: prodcut.description,
      images: this.images,
      price: prodcut.price,
      shop: prodcut.shop,
      discount: {
        exist: prodcut.discount ? true : false,
        amount: prodcut.discount,
        date: prodcut.discountUntil ? prodcut.discountUntil : this.getNextDay(),
      },
      shipping: {
        free: prodcut.shipping === 'Free shipping' ? true : false,
        price: isNaN(+prodcut.shipping) ? 0 : prodcut.shipping,
      },
      main: prodcut.main,
      new: prodcut.new,
    });
  }

  getNextDay(): Date {
    let today = new Date().getTime();
    let tomorrow = today + 24 * 60 * 60 * 1000;
    return new Date(tomorrow);
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
    this.files = event.currentFiles;
    this.form.get('images').setValue(this.images.concat(this.files));
    
  }

  removeImage(item): void {
    this.images = this.images.filter((value) => value !== item);
    this.form.get('images').setValue(this.images);
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

  registrationItem(images = []): Product {
    return {
      id: this.id,
      images: this.images.concat(images),
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

  submit(): void {
    this.loading = true;
    if (this.files.length) {
      this.subscribe = this.store
        .pastedImage(this.files)
        .pipe(
          map((value) => this.registrationItem(value)),
          switchMap((item) => this.store.update(item))
        )
        .subscribe(
          () => {},
          () => {},
          () => {
            console.log(this.form);
            this.loading = false;
            this.alert.success('The product was successfully changed!');
            this.router.navigate(['/management']);
          }
        );
    } else {
      this.store.update(this.registrationItem()).subscribe(
        () => {},
        () => {},
        () => {
          this.loading = false;
          this.alert.success('The product was successfully changed!');
          this.router.navigate(['/management']);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
