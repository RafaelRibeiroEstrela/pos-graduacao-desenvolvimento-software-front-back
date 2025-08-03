import rawData from './data.json';
import type { ProductResponse } from "../dtos/ProductResponse.ts";
import type { ProductRequest }  from "../dtos/ProductRequest.ts";

const products: ProductResponse[] = (rawData as ProductResponse[]).map(p => ({ ...p }));

export async function fetchProducts(): Promise<ProductResponse[]> {
    const stored = localStorage.getItem('products');
    let data: ProductResponse[];
    if (stored) {
        data = JSON.parse(stored) as ProductResponse[];
    } else {
        data = [...products];
        localStorage.setItem('products', JSON.stringify(data));
    }
    return data;
}

export async function saveProduct(request: ProductRequest): Promise<ProductResponse> {
    const nextId = products.length > 0
        ? Math.max(...products.map(p => p.id)) + 1
        : 1;

    const newProduct: ProductResponse = {
        id: nextId,
        name: request.name,
        description: request.description,
        price: request.price,
        category: request.category,
        pictureUrl: request.pictureUrl,
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return Promise.resolve(newProduct);
}
