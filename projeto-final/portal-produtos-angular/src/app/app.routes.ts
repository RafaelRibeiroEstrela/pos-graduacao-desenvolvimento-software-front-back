import {Routes} from '@angular/router';
import {ProductListComponent} from './component/product-list/product-list.component';
import {ProductFormComponent} from './component/product-form/product-form.component';
import {ProductImportComponent} from './component/product-import/product-import.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/import', component: ProductImportComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];
