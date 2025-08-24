import {Routes} from '@angular/router';
import {ProductListComponent} from './component/product-list/product-list.component';
import {ProductFormComponent} from './component/product-form/product-form.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];
