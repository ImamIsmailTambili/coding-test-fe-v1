"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { SearchInput } from "@/components/SearchInput";
import { StatusView } from "@/components/StatusView";
import { inputClass } from "@/components/ui";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { fetchCategories, fetchProducts, PAGE_SIZE } from "@/services/api";
import { prettifyCategory, totalPages } from "@/utils/processors";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const query = useDebounce(search.trim());

  useEffect(() => setPage(1), [query, category]);

  const categories = useFetch(fetchCategories, []);
  const products = useFetch(
    (signal) => fetchProducts({ query, category, page }, signal),
    [query, category, page],
  );

  const items = products.data?.items ?? [];
  const pages = totalPages(products.data?.total ?? 0, PAGE_SIZE);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#8B9A6E] tracking-tight">
          Produk
        </h1>
        <div className="flex flex-wrap gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari produk…"
          />
          <select
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!!query}
            aria-label="Filter kategori"
            title={query ? "Pencarian menggantikan filter kategori" : undefined}
          >
            <option value="">Semua kategori</option>
            {(categories.data ?? []).map((c) => (
              <option key={c} value={c}>
                {prettifyCategory(c)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <StatusView
        loading={products.loading}
        error={products.error}
        isEmpty={items.length === 0}
        emptyTitle="Produk tidak ditemukan"
        emptyHint="Ubah kata kunci atau pilih kategori lain."
        onRetry={products.retry}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Pagination page={page} totalPages={pages} onChange={setPage} />
      </StatusView>
    </div>
  );
}
