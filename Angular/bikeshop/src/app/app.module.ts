import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './main/components/home-page/home-page.component';
import { ContactPageComponent } from './main/components/contact-page/contact-page.component';
import { CarouselComponent } from './main/components/carousel/carousel.component';
import { AssideLayoutComponent } from './main/components/asside-layout/asside-layout.component';
import { ProductListComponent } from './main/components/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutPageComponent } from './main/components/about-page/about-page.component';
import { HeaderLayoutComponent } from './main/components/header-layout/header-layout.component';
import { FooterLayoutComponent } from './main/components/footer-layout/footer-layout.component';
import { NavLayoutComponent } from './main/components/nav-layout/nav-layout.component';
import { MainLayoutComponent } from './main/components/main-layout/main-layout.component';
import { ProductCardComponent } from './main/components/product-card/product-card.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    ContactPageComponent,
    CarouselComponent,
    AssideLayoutComponent,
    ProductListComponent,
    AboutPageComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    NavLayoutComponent,
    ProductCardComponent,
  ],
  imports: [
    MatDatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
