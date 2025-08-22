import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {ProductResponse} from '../models/product-response.model';
import {ProductRequest} from '../models/product-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProductClientService {

  private url: string = "http://localhost:8080/products";

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.url).pipe(
      catchError(error => {
        console.error("Erro ao buscar produtos:", error);
        return of([]);
      })
    );
  }

  create(request: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.url, request).pipe(
      catchError(error => {
        console.error("Erro ao criar produtos:", error);
        return throwError(() => error);
      })
    );
  }

  update(request: ProductRequest, id: number): Observable<ProductResponse> {
    const url = `${this.url}/${id}`;
    return this.http.put<ProductResponse>(url, request).pipe(
      catchError(error => {
        console.error("Erro ao atualizar produtos:", error);
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error("Erro ao deletar produtos:", error);
        return throwError(() => error);
      })
    );
  }
}
