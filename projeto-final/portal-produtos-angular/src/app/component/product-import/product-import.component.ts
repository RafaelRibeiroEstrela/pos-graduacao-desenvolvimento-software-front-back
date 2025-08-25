import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {ProductClientService} from '../../client/product-client.service';
import {ProductRequest} from '../../models/product-request.model';
import Papa from "papaparse";
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

interface ProductSelected {
  productRequest: ProductRequest;
  selected: boolean;
}

@Component({
  selector: 'app-product-import',
  imports: [
    FormsModule
  ],
  templateUrl: './product-import.component.html',
  styleUrl: './product-import.component.css'
})
export class ProductImportComponent {
  @Output() parsed = new EventEmitter<ProductRequest[]>();
  @Output() validationErrors = new EventEmitter<string[]>();
  readonly requiredHeaders = ['name','description','price','category','pictureUrl'];
  productsSelected: ProductSelected[] = [];
  showButtonSave: boolean = false

  importCsv(fileList: FileList | null): void {
    if (fileList == null) {
      return;
    }
    const file: File = fileList[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      delimiter: ";",
      complete: (results) => {
        const rows = results.data as any[];
        const headers = results.meta.fields?.map(f => f.trim().toLowerCase()) ?? [];
        const missing = this.requiredHeaders.filter(
          h => !headers.includes(h.toLowerCase())
        );
        if (missing.length) {
          this.validationErrors.emit([`Faltando colunas: ${missing.join(', ')}`]);
          return;
        }
        this.productsSelected = rows.map(r => ({
          productRequest: {
            name: r['name'],
            description: r['description'],
            price: parseFloat(r['price']),
            category: r['category'],
            pictureUrl: r['pictureUrl']
          },
          selected: false
        }));
        console.log(this.productsSelected);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  submit() {
    this.productClient.importCsv(this.productsSelected
      .filter(obj => obj.selected)
      .map(obj => obj.productRequest)).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Erro ao atualizar:', err)
    });
  }

  handleCancel(): void {
    this.productsSelected = [];
  }

  ngOnInit() {
    this.productsSelected = [];
  }

  markSelected(p: ProductSelected) {
    p.selected = !p.selected;
    this.showButtonSave = this.productsSelected.filter(obj => obj.selected).length > 0;
  }

  constructor(private productClient: ProductClientService, private router: Router) {
  }


  protected readonly length = length;
}
