import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddPageComponent } from './components/add-page/add-page.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [AddPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([{ path: '', component: AddPageComponent }]),
  ],
  exports: [RouterModule],
})
export class AddNewModule {}
