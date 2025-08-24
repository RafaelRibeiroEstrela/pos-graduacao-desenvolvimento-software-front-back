import {Component, Input} from '@angular/core';
import {ProductResponse} from '../../../../models/product-response.model';
import {ProductClientService} from '../../../../client/product-client.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-modal-update-product',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-update-product.component.html',
  styleUrl: './modal-update-product.component.css'
})
export class ModalUpdateProductComponent {
  @Input() productProp!: ProductResponse;

  submit(product: ProductResponse): void {
    this.productClient.update(product, product.id);
    //JOGAR PARA A ROTA DE LISTAR PRODUTOS
  }

  handleCancel(): void {
    //JOGAR PARA A ROTA DE LISTAR PRODUTOS
  }

  constructor(private productClient: ProductClientService) {
  }
}
