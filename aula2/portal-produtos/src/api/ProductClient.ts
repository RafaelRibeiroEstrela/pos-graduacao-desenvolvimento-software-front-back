import {Product} from "../models/Product";
import rawData from './data.json';

export async function fetchProducts(): Promise<Product[]> {
    // Como já é um módulo JS, basta resolver na Promise:
    return Promise.resolve(rawData as Product[]);
}
