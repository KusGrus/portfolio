import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [EditListComponent, ConfirmationComponent, EditPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    FileUploadModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      { path: '', component: EditListComponent },
      { path: ':id', component: EditPageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class ManagementModule {}
