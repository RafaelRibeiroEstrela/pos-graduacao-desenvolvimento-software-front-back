// src/utils/filter.ts
import type { ProductResponse } from "../dtos/ProductResponse";

export function filterProductsById(list: ProductResponse[], term: string): ProductResponse[] {
  const digits = (term ?? "").replace(/\D+/g, "").trim();
  if (!digits) return list;               // sem termo => não filtra
  const id = Number(digits);
  if (!Number.isFinite(id)) return list;
  return list.filter((p) => Number((p as any).id) === id);
}

// (Opcional) para “enquanto digita” por prefixo:
// return list.filter((p) => String((p as any).id).startsWith(digits));
