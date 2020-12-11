import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CartItem } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: CartItem[] = [];
  key: string = 'cart';

  getAll(): CartItem[] {
    let cartStorage = JSON.parse(localStorage.getItem(this.key)) || [];
    if (this.cart.length) {
      return this.cart;
    } else if (cartStorage.length) {
      this.cart = cartStorage;
    } else {
      this.cart = [];
    }
    return this.cart;
  }

  getStream(): Observable<CartItem[]> {
    return of(this.getAll());
  }

  getCartCount(): number {
    return this.cart.length;
  }

  getNextIndex(): number {
    let arrayID = this.cart.map((item) => item.id);
    if (arrayID.length) {
      return Math.max.apply(null, arrayID) + 1;
    }
    return 0;
  }

  clearCart(): void {
    this.cart = [];
    localStorage.setItem(this.key, JSON.stringify(this.cart));
  }

  addToCart(item: CartItem): void {
    this.cart.push(item);
    localStorage.setItem(this.key, JSON.stringify(this.cart));
  }

  deleteFromCart(id: number): void {
    this.cart = this.cart.filter((item) => item.id !== id);
    localStorage.setItem(this.key, JSON.stringify(this.cart));
  }

  updateCart(array: CartItem[]): void {
    this.cart = array;
    localStorage.setItem(this.key, JSON.stringify(this.cart));
  }

  getTotal(): number {
    return this.cart.reduce((acc, item: CartItem) => {
      let discount = item.information.discount
        ? 1 - item.information.discount / 100
        : 1;
      return acc + item.count * item.price * discount;
    }, 0);
  }
}
