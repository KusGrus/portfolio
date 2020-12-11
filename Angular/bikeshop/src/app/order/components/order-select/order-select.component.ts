import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';
import { CartService } from 'src/app/shared/services/cart.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-order-select',
  templateUrl: './order-select.component.html',
  styleUrls: ['./order-select.component.scss'],
  animations: [
    trigger('box', [
      transition('void => *', [
        style({ marginTop: -500 + 'px' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(500, style({ marginTop: -500 + 'px' })),
      ]),
    ]),
  ],
})
export class OrderSelectComponent implements OnInit {
  @Output() onChoose = new EventEmitter();
  public current: string = 'Аdd product';
  public visible: boolean = false;
  public storeItems$: Observable<Product[]>;

  constructor(
    private store: StoreService,
    private cart: CartService,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.storeItems$ = this.store.getAll();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.visible = false;
    }
  }

  addCurrent(id: any): void {
    this.store
      .getById(id)
      .pipe(take(1))
      .subscribe((value) => {
        this.onChoose.emit({
          id: this.cart.getNextIndex(),
          storeID: value.id,
          count: 1,
          color: value.color[0],
          size: value.size[0],
          name: value.name,
          price: value.price,
          discount: value.discount,
          information: value,
        });
      });
  }
}
