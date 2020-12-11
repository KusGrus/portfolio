import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartItem, Payment } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.scss'],
})
export class OrderLayoutComponent implements OnInit, OnDestroy {
  public result;
  public total: number;
  public form: FormGroup;
  public storage: CartItem[];
  public indexPage: number = 1;
  public payment: Payment = {
    type: 'card',
    valid: false,
  };
  subscribe: Subscription;
  constructor(private cart: CartService, private alert: AlertService) {}

  ngOnInit(): void {
    this.initialization();
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  nextPage(): void {
    this.indexPage += 1;
  }

  previousPage(): void {
    this.indexPage -= 1;
  }

  initialization(): void {
    this.total = this.cart.getTotal();
    this.subscribe = this.cart.getStream().subscribe((value) => {
      this.storage = value;
    });
    this.form = new FormGroup({
      cart: new FormControl(),
      location: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
      }),
      payment: new FormControl(this.payment),
      delivery: new FormGroup({
        date: new FormControl('today'),
        customDate: new FormControl(null, [CustomValidators.calendarDate]),
      }),
    });
  }

  clearCart(): void {
    this.storage = [];
    this.cart.clearCart();
    this.alert.success('The trash is completely cleared!');
  }

  submit(): void {
    console.log(this.form);
    this.alert.success('The order was accepted and sent for processing!');
    this.nextPage();
    setTimeout(() => {
      this.cart.clearCart();
    }, 0);
  }

  handle(): void {
    this.cart.updateCart(this.storage);
    this.total = this.cart.getTotal();
  }
}
