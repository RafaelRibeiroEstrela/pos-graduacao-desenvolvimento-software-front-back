import type { ProductResponse } from "../dtos/ProductResponse.ts";
import type { ProductRequest } from "../dtos/ProductRequest.ts";
import axios from "axios";

export async function fetchProducts(): Promise<ProductResponse[]> {
    return axios.get("http://localhost:8080/products");
}

export async function saveProduct(request: ProductRequest): Promise<ProductResponse> {
  return axios.post("http://localhost:8080/products", request);
}
