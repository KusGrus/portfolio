import { Component, Input } from '@angular/core';
import {
  CartItem,
  Delivery,
  Location,
  Order,
  Payment,
} from 'src/app/shared/interfaces';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss'],
})
export class OrderResultComponent {
  public total: number;
  public curentDay: Date = new Date();
  public _order: Order = {
    product: [null],
    delivery: { date: '', customDate: '' },
    payment: { type: 'card', valid: true },
    location: { country: '', city: '', address: '' },
  };
  @Input() set items(data: any) {
    this._order.delivery = this.getDilivery(data.delivery);
    this._order.location = this.getLocation(data.location);
    this._order.payment = this.getPayment(data.payment);
    this._order.product = this.getProdcuts(data.cart);
    this.total = this.cart.getTotal();
  }
  constructor(public cart: CartService) {}

  getDilivery(delivery): Delivery {
    if (delivery.date === 'today') {
      return { date: delivery.date, customDate: this.curentDay };
    }
    if (delivery.date === 'tomorrow') {
      let target = new Date(
        this.curentDay.setDate(this.curentDay.getDate() + 1)
      );
      return { date: delivery.date, customDate: target };
    }
    if (delivery.date === 'custom') {
      return { date: delivery.date, customDate: delivery.customDate };
    }
  }

  getLocation(location): Location {
    return {
      country: location.country,
      city: location.city,
      address: location.address,
    };
  }

  getPayment(payment): Payment {
    if (payment.type === 'paypal') {
      return {
        type: payment.type,
        valid: true,
      };
    }
    if (payment.type === 'cash') {
      return {
        type: payment.type,
        currency: payment.currency,
        remains: payment.remains,
        valid: true,
      };
    }
    if (payment.type === 'card') {
      return {
        type: payment.type,
        name: payment.name,
        number: payment.number,
        date: payment.date,
        code: payment.code,
        valid: true,
      };
    }
  }

  getProdcuts(prodcuts): CartItem[] {
    let cart: CartItem[] = [];
    for (let product of prodcuts) {
      let discount = product.discount ? 1 - product.discount / 100 : 1;
      cart.push({
        storeID: product.storeID,
        name: product.name,
        color: product.color,
        size: product.size,
        count: product.count,
        price: product.price * discount * product.count,
      });
    }
    return cart;
  }
}
