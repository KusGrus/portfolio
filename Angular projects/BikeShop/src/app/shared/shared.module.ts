import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { ColorDirective } from './directives/color.directive';
import { DiscountDirective } from './directives/discount.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { LineLimitPipe } from './pipes/lineLimit.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { DigitDirective } from './directives/digit.directive';
import { LetterDirective } from './directives/letter.directive';
import { CardDirective } from './directives/card.directive';
import { SelectComponent } from './components/select/select.component';
import { SelectDirective } from './directives/select.directive';
import { PercentDirective } from './directives/percent.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    LineLimitPipe,
    DiscountDirective,
    DigitDirective,
    ColorDirective,
    LoadingComponent,
    FilterPipe,
    AlertComponent,
    LetterDirective,
    CardDirective,
    SelectComponent,
    SelectDirective,
    PercentDirective,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  exports: [
    HttpClientModule,
    LineLimitPipe,
    DiscountDirective,
    DigitDirective,
    ColorDirective,
    LoadingComponent,
    FilterPipe,
    AlertComponent,
    LetterDirective,
    CardDirective,
    SelectComponent,
    SelectDirective,
    PercentDirective,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-EN' }],
})
export class SharedModule {}
