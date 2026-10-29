import type { Product } from "../types";
import {
  discountedPrice,
  formatPrice,
  prettifyCategory,
} from "../utils/processors";

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discountPercentage >= 1;
  const inStock = product.stock > 0;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#8B9A6E] bg-surface">
      <div className="grid aspect-4/3 place-items-center bg-canvas text-muted">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <span>Tanpa gambar</span>
        )}
      </div>
      <div className="grid flex-1 content-start gap-1.5 p-4">
        <p className="text-xs text-muted">
          {prettifyCategory(product.category)}
        </p>
        <h3 className="font-semibold text-[#8B9A6E]">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <div>
            <strong>{formatPrice(discountedPrice(product))}</strong>
            {hasDiscount && (
              <s className="ml-1.5 text-sm text-muted">
                {formatPrice(product.price)}
              </s>
            )}
          </div>
          <span
            className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
              inStock
                ? "bg-[#8B9A6E] text-[#F7F2EB]"
                : "border-transparent bg-warn text-danger"
            }`}
          >
            {inStock ? `Stok ${product.stock}` : "Habis"}
          </span>
        </div>
        <p className="text-xs text-muted">
          Rating {product.rating.toFixed(1)} / 5
        </p>
      </div>
    </article>
  );
}
