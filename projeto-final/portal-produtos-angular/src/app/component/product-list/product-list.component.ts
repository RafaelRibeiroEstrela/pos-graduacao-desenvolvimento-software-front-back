import { Component } from '@angular/core';
import {ProductClientService} from '../../client/product-client.service';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductResponse} from '../../models/product-response.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products!: ProductResponse[];
  filtro: number | null = null;

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

  onDeleted() {
    this.reload();
  }

  buscarPorFiltro(filtro: number | null): void {
    if (filtro == null) {
      this.reload();
    } else {
      this.client.findById(filtro).subscribe({
        next: (data) => (this.products = [data]),
        error: () => (this.products = []),
      });
    }
    this.filtro = null;
  }
}
