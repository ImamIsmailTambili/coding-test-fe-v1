import type { ListResponse, Product, User } from "../types";
import { normalizeProducts, normalizeUsers } from "../utils/processors";

const BASE_URL = "https://dummyjson.com";
export const PAGE_SIZE = 12;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { signal });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiError(
      "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
    );
  }
  if (!res.ok)
    throw new ApiError(`Permintaan gagal (HTTP ${res.status}).`, res.status);
  return res.json() as Promise<T>;
}

interface ProductQuery {
  query: string;
  category: string;
  page: number;
}

export async function fetchProducts(
  { query, category, page }: ProductQuery,
  signal?: AbortSignal,
): Promise<ListResponse<Product>> {
  const paging = `limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`;
  const path = query
    ? `/products/search?q=${encodeURIComponent(query)}&${paging}`
    : category
      ? `/products/category/${encodeURIComponent(category)}?${paging}`
      : `/products?${paging}`;
  const raw = await request<{ products: unknown; total: number }>(path, signal);
  return {
    items: normalizeProducts(raw.products),
    total: Number(raw.total) || 0,
  };
}

export async function fetchCategories(signal?: AbortSignal): Promise<string[]> {
  const raw = await request<unknown>("/products/category-list", signal);
  return Array.isArray(raw)
    ? raw.filter((c): c is string => typeof c === "string")
    : [];
}

export async function fetchUsers(
  { query, page }: { query: string; page: number },
  signal?: AbortSignal,
): Promise<ListResponse<User>> {
  const paging = `limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`;
  const path = query
    ? `/users/search?q=${encodeURIComponent(query)}&${paging}`
    : `/users?${paging}`;
  const raw = await request<{ users: unknown; total: number }>(path, signal);
  return { items: normalizeUsers(raw.users), total: Number(raw.total) || 0 };
}
