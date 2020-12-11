import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  bike$: Observable<Product>;
  constructor(private store: StoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bike$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.store.getById(params['id']);
      })
    );
  }
}
