import { Component } from '@angular/core';
import {ProductRequest} from '../../models/product-request.model';
import {ProductClientService} from '../../client/product-client.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  name!: string;
  description!: string;
  price!: number;
  pictureUrl!: string;
  category!: string;

  submit(product: ProductRequest): void {
    this.productClient.create(product);
    //JOGAR PARA A ROTA DE LISTAR PRODUTOS
  }

  handleCancel(): void {
    //JOGAR PARA A ROTA DE LISTAR PRODUTOS
  }

  constructor(private productClient: ProductClientService) {
  }
}
