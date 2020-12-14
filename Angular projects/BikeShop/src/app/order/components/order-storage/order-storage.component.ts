import { animate, style, transition, trigger } from '@angular/animations';
import { Component, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CartItem } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OrderStorageComponent),
  multi: true,
};

@Component({
  selector: 'app-order-storage',
  templateUrl: './order-storage.component.html',
  styleUrls: ['./order-storage.component.scss'],
  providers: [VALUE_ACCESSOR],
  animations: [
    trigger('box', [
      transition('void => *', [style({ opacity: 0 }), animate(400)]),
      transition('* => void', [
        animate(400, style({ opacity: 0, marginTop: -10 + '%' })),
      ]),
    ]),
  ],
})
export class OrderStorageComponent implements ControlValueAccessor {
  public total: number;
  public storage: CartItem[];
  private onChange = (value: any) => {};
  private onTouched = () => {};
  constructor(private alert: AlertService) {}

  writeValue(value: CartItem[]): void {
    this.storage = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  addItem(item): void {
    this.storage.push(item);
    this.alert.success('The item is added to cart!');
    this.onChange(this.storage);
  }

  deleteItem(id: number): void {
    this.storage = this.storage.filter((item) => item.id !== id);
    this.alert.warning('Item removed from shopping cart!');
    this.onChange(this.storage);
  }

  increase(index: number): void {
    this.storage[index].count += 1;
    this.onChange(this.storage);
  }

  decrease(index: number): void {
    if (this.storage[index].count < 1) {
      return;
    }
    this.storage[index].count -= 1;
    this.onChange(this.storage);
  }

  manualCount(event, index) {
    this.storage[index].count = event.target.value;
    this.onChange(this.storage);
  }

  changeColor(index: number, color: string) {
    this.storage[index].color = color;
    this.onChange(this.storage);
  }

  changeSize(index: number, size: string) {
    this.storage[index].size = size;
    this.onChange(this.storage);
  }
}
