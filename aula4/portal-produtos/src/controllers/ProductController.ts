import type { ProductResponse } from "../dtos/ProductResponse.ts";
import type { ProductRequest } from "../dtos/ProductRequest.ts";
import axios from "axios";

export async function fetchProducts(
  filtro: string
): Promise<ProductResponse[]> {
  if (filtro == null || filtro == '') {
    return axios.get("http://localhost:8080/products");
  }
  return axios.get("http://localhost:8080/products/" + filtro);
}

export async function saveProduct(
  request: ProductRequest
): Promise<ProductResponse> {
  return axios.post("http://localhost:8080/products", request);
}
