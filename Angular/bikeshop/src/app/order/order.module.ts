import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrderLayoutComponent } from './components/order-layout/order-layout.component';
import { OrderStorageComponent } from './components/order-storage/order-storage.component';
import { OrderSelectComponent } from './components/order-select/order-select.component';
import { OrderPaymentComponent } from './components/order-payment/order-payment.component';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { OrderResultComponent } from './components/order-result/order-result.component';

@NgModule({
  declarations: [
    OrderLayoutComponent,
    OrderStorageComponent,
    OrderSelectComponent,
    OrderPaymentComponent,
    PaymentCardComponent,
    OrderResultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([{ path: '', component: OrderLayoutComponent }]),
  ],
  exports: [RouterModule],
})
export class OrderModule {}
