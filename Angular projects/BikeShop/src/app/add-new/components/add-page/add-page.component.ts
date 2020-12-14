import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SelectOption } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ManagementService } from 'src/app/shared/services/management.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public loading: boolean = false;
  private subscribe: Subscription;
  public shops: Array<SelectOption>;
  public sizes: Array<string>;
  public colors: Array<string>;

  constructor(
    private store: StoreService,
    private alert: AlertService,
    private router: Router,
    private manage: ManagementService
  ) {
    this.sizes = manage.sizes;
    this.colors = manage.colors;
    this.shops = manage.shops;
  }

  ngOnInit(): void {
    this.form = this.manage.initialization();
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

  submit(): void {
    this.loading = true;
    this.subscribe = this.store
      .pastedImage(this.form.value.images)
      .pipe(
        map((value) => {
          this.form.get('images').setValue(value);
          return this.manage.registrationItem(this.form);
        }),
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

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
