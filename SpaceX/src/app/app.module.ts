import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { FilterComponent } from './filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { PaginationComponent } from './pagination/pagination.component';
import { UnknownPipe } from './shared/pipes/unknown.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationPipe } from './shared/pipes/pagination.pipie';
import { FilterPipe } from './shared/pipes/filters.pipe';
import { MultiCheckDirective } from './shared/directives/multi-check.directive';
import { CheckboxPipe } from './shared/pipes/checkbox.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    ItemListComponent,
    ItemDetailsComponent,
    FilterComponent,
    PaginationComponent,
    UnknownPipe,
    PaginationPipe,
    FilterPipe,
    MultiCheckDirective,
    CheckboxPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
