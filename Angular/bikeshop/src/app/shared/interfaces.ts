export interface Contact {
  frequency: string;
  subscribe: boolean;
  comment: string;
}

export interface Slide {
  id?: number;
  title: string;
  image: string;
  marginLeft?: number;
}

export interface Review {
  author: string;
  text: string;
  rating: number;
}


export interface Product {
  id?: number | string;
  images: Array<string | ArrayBuffer | File>;
  price: number;
  discount: number;
  main: boolean;
  shop: string;
  name: string;
  description: string;
  shipping: string | null;
  discountUntil: string | Date;
  new: boolean;
  color: Array<string>;
  size: Array<string>;
  review: Array<Review>;
}

export type AlertType = 'success' | 'warning' | 'danger';

export type PaymentType = 'card' | 'cash' | 'paypal';

export interface Alert {
  type: AlertType;
  text: string;
}

export interface CartItem {
  id?: number;
  storeID: number | string;
  count: number;
  color: string;
  size: string;
  name: string;
  price: number;
  discount?: number;
  information?: Product;
}

export interface Card {
  name: string;
  number: string;
  date: string;
  code: string;
  flip: boolean;
}

export interface Payment {
  type: PaymentType;
  name?: string;
  number?: string;
  date?: string;
  code?: string;
  currency?: string;
  remains?: string;
  valid: boolean;
}

export interface Delivery {
  date: string;
  customDate: string | Date;
}

export interface Location {
  country: string;
  city: string;
  address: string;
}

export interface Order {
  product: CartItem[];
  delivery: Delivery;
  payment: Payment;
  location: Location;
}

export interface SelectOption {
  key: number | string;
  value: number | string;
}
