import { Component } from '@angular/core';
import {ProductClientService} from '../../client/product-client.service';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductResponse} from '../../models/product-response.model';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products!: ProductResponse[];

  constructor(private client: ProductClientService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.client.findAll().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Erro ao carregar:', err.message),
    });
  }
}
