import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShipList } from '../interfaces';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() object: ShipList = null;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}
}
