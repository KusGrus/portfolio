import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutPageComponent } from './main/components/about-page/about-page.component';
import { ContactPageComponent } from './main/components/contact-page/contact-page.component';
import { HomePageComponent } from './main/components/home-page/home-page.component';
import { MainLayoutComponent } from './main/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'about', component: AboutPageComponent },
    ],
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./add-new/add-new.module').then((m) => m.AddNewModule),
  },
  {
    path: 'management',
    loadChildren: () =>
      import('./management/management.module').then((m) => m.ManagementModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
