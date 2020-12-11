import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-product-page-description',
  templateUrl: './product-page-description.component.html',
  styleUrls: ['./product-page-description.component.scss'],
})
export class ProductPageDescriptionComponent implements OnInit {
  ratingStars = Array.from(new Array(5));
  submitted: boolean = false;
  avgRating: number;
  form: FormGroup;
  hide: boolean = true;
  discountPeriod: Date;

  @Input() bike: Product;
  constructor(private cart: CartService, private alert: AlertService) {}

  ngOnInit(): void {
    this.initialization();
  }

  submit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.cart.addToCart({
        id: this.cart.getNextIndex(),
        storeID: this.bike.id,
        count: this.form.controls.amount.value,
        color: this.form.controls.color.value,
        size: this.form.controls.size.value,
        name: this.bike.name,
        price: this.bike.price,
        discount: this.bike.discount,
        information: this.bike,
      });
      this.alert.success('The item is added to cart!');
    } else {
      this.alert.danger('A data-entry error!');
    }
  }

  initialization(): void {
    this.discountPeriod = new Date(this.bike.discountUntil);
    if (this.bike.review) {
      this.avgRating = Math.round(
        this.bike.review.reduce((acc, value) => acc + value.rating, 0) /
          this.bike.review.length
      );
    }

    this.form = new FormGroup({
      color: new FormControl(
        'preview',
        CustomValidators.excludeSelect('preview')
      ),
      size: new FormControl(
        'preview',
        CustomValidators.excludeSelect('preview')
      ),
      amount: new FormControl(1, [
        Validators.required,
        CustomValidators.onlyDigit,
      ]),
    });
  }
}
