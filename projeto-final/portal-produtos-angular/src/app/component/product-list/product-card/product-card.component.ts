import {Component, Input} from '@angular/core';
import {ProductResponse} from '../../../models/product-response.model'
import {ModalUpdateProductComponent} from './modal-update-product/modal-update-product.component';

@Component({
  selector: 'app-product-card',
  imports: [
    ModalUpdateProductComponent
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  hideModal: boolean = false;
  @Input() productProp!: ProductResponse;
}
