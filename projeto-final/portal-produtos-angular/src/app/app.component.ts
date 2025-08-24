import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductListComponent} from './component/product-list/product-list.component';
import {ProductFormComponent} from './component/product-form/product-form.component';
import {
  ModalUpdateProductComponent
} from './component/product-list/product-card/modal-update-product/modal-update-product.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, ProductFormComponent, ModalUpdateProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portal-produtos-angular';
}
