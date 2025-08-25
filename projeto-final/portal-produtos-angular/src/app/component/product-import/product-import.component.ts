import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ProductClientService} from '../../client/product-client.service';

@Component({
  selector: 'app-product-import',
  imports: [],
  templateUrl: './product-import.component.html',
  styleUrl: './product-import.component.css'
})
export class ProductImportComponent {

  constructor(private productClient: ProductClientService) {
  }
}
