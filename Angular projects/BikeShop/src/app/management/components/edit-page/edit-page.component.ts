import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Product, SelectOption } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ManagementService } from 'src/app/shared/services/management.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
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
  public shops: Array<SelectOption>;
  public sizes: Array<string>;
  public colors: Array<string>;
  constructor(
    private store: StoreService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private manage: ManagementService
  ) {
    this.sizes = manage.sizes;
    this.colors = manage.colors;
    this.shops = manage.shops;
  }

  ngOnInit(): void {
    this.form = this.manage.initialization();
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
        date: prodcut.discountUntil
          ? prodcut.discountUntil
          : this.manage.getNextDay(),
      },
      shipping: {
        free: prodcut.shipping === 'Free shipping' ? true : false,
        price: isNaN(+prodcut.shipping) ? 0 : prodcut.shipping,
      },
      main: prodcut.main,
      new: prodcut.new,
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
    this.files = event.currentFiles;
    this.form.get('images').setValue(this.images.concat(this.files));
  }

  removeImage(item): void {
    this.images = this.images.filter((value) => value !== item);
    this.form.get('images').setValue(this.images);
  }

  submit(): void {
    this.loading = true;
    this.subscribe = this._selectSubmit().subscribe(
      () => {},
      () => {},
      () => {
        this.loading = false;
        this.alert.success('The product was successfully changed!');
        this.router.navigate(['/management']);
      }
    );
  }

  private _selectSubmit(): Observable<any> {
    if (this.files.length) {
      return this.store.pastedImage(this.files).pipe(
        map((value) => {
          this.form.get('images').setValue(this.images.concat(value));
          return this.manage.registrationItem(this.form, this.id);
        }),
        switchMap((item) => this.store.update(item))
      );
    } else {
      return this.store.update(
        this.manage.registrationItem(this.form, this.id)
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
