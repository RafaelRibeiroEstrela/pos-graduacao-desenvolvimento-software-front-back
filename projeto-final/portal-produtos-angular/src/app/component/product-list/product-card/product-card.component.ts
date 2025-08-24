import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductResponse} from '../../../models/product-response.model'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductRequest} from '../../../models/product-request.model';
import {ProductClientService} from '../../../client/product-client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  modalUpdate: boolean = false;
  modalDelete: boolean = false;
  @Input() productProp!: ProductResponse;
  @Output() productIsDeleted = new EventEmitter<number>();

  constructor(private productClient: ProductClientService, private router: Router) {
  }

  closeModalUpdate():void {
    this.modalUpdate = false;
  }

  openModalUpdate(): void {
    console.log('Modal Update');
    this.modalUpdate = true;
  }

  closeModalDelete():void {
    this.modalDelete = false;
  }

  openModalDelete(): void {
    console.log('Modal Delete');
    this.modalDelete = true;
  }

  updateProduct(productParam: ProductResponse): void {
    const productRequest: ProductRequest = {name:productParam.name, description:productParam.description, category:productParam.category, price:productParam.price, pictureUrl:productParam.pictureUrl};
    this.productClient.update(productRequest, productParam.id).subscribe({
      next: () => {
        this.closeModalUpdate();
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Erro ao atualizar:', err)
    });
  }

  deleteProduct(id: number): void {
    this.productClient.delete(id).subscribe({
      next: () => {
        this.closeModalDelete();
        this.productIsDeleted.emit();
      },
      error: (err) => console.error('Erro ao deletar:', err)
    });
  }
}
