import { Component, Input } from '@angular/core';
import { Card } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent {
  @Input() card:Card;
}
