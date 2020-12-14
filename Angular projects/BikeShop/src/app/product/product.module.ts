import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './components/modal/modal.component';
import { ProductPageDescriptionComponent } from './components/product-page-description/product-page-description.component';
import { ProductPagePreviewComponent } from './components/product-page-preview/product-page-preview.component';
import { ProductPageComponent } from './components/product-page/product-page.component';


@NgModule({
  declarations: [
    ProductPageComponent,
    ProductPagePreviewComponent,
    ProductPageDescriptionComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: ':id', component: ProductPageComponent }]),
  ],
  exports: [RouterModule],
})
export class ProductModule {}
