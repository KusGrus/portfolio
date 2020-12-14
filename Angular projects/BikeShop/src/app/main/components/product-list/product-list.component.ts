import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  search: string;
  products$: Observable<Product[]>;
  constructor(public store: StoreService) {}

  ngOnInit(): void {
    this.products$ = this.store.getAll();
  }
}
