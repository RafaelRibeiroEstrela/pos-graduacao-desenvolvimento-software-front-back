import { Component } from '@angular/core';
import {ProductRequest} from '../../models/product-request.model';
import {ProductClientService} from '../../client/product-client.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  product: ProductRequest = {
    name: "",
    description: "",
    price: 0,
    pictureUrl: "",
    category: "",
  };

  submit(productRequest: ProductRequest): void {
    this.productClient.create(productRequest).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Erro ao atualizar:', err)
    });
  }

  handleCancel(): void {
    this.router.navigate(['/products']);
  }

  constructor(private productClient: ProductClientService, private router: Router) {
  }
}
