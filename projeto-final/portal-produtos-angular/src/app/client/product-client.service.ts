import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { from, map, catchError, of, throwError, Observable } from 'rxjs';
import { ProductResponse } from '../models/product-response.model';
import { ProductRequest } from '../models/product-request.model';

@Injectable({ providedIn: 'root' })
export class ProductClientService {
  private readonly api: AxiosInstance;

  private readonly baseURL = 'http://localhost:8080/products';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 15_000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.api.interceptors.response.use(
      (res) => res,
      (err: AxiosError) => {
        const status = err.response?.status;
        const data = err.response?.data;
        console.error('[Axios Error]', status, data || err.message);
        return Promise.reject(err);
      }
    );
  }

  findById(id: number): Observable<ProductResponse> {
    return from(this.api.get<ProductResponse>(`/${id}`)).pipe(
      map(res => res.data)
    );
  }

  findAll(): Observable<ProductResponse[]> {
    return from(this.api.get<ProductResponse[]>('')).pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error('Erro ao buscar produtos:', error);
        return of([]); // mantém comportamento anterior
      })
    );
  }

  create(request: ProductRequest): Observable<ProductResponse> {
    return from(this.api.post<ProductResponse>('', request)).pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error('Erro ao criar produto:', error);
        return throwError(() => error);
      })
    );
  }

  update(request: ProductRequest, id: number): Observable<ProductResponse> {
    return from(this.api.put<ProductResponse>(`/${id}`, request)).pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error('Erro ao atualizar produto:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return from(this.api.delete<void>(`/${id}`)).pipe(
      map((res) => res.data as void),
      catchError((error) => {
        console.error('Erro ao deletar produto:', error);
        return throwError(() => error);
      })
    );
  }
}
