import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent  {
  @Input() card: Product;
}
