import type { Product, User } from "../types";

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;
const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : fallback;
const num = (v: unknown, fallback = 0) =>
  typeof v === "number" && Number.isFinite(v) ? v : fallback;

/** Validasi & normalisasi satu produk. Mengembalikan null jika data tidak valid. */
export function normalizeProduct(raw: unknown): Product | null {
  if (!isObject(raw)) return null;
  const id = num(raw.id, NaN);
  const title = str(raw.title).trim();
  const price = num(raw.price, NaN);
  if (Number.isNaN(id) || !title || Number.isNaN(price)) return null;
  return {
    id,
    title,
    price,
    description: str(raw.description, "Tidak ada deskripsi."),
    category: str(raw.category, "lainnya"),
    discountPercentage: num(raw.discountPercentage),
    rating: num(raw.rating),
    stock: num(raw.stock),
    thumbnail: str(raw.thumbnail),
  };
}

export function normalizeProducts(raw: unknown): Product[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeProduct).filter((p): p is Product => p !== null);
}

export function normalizeUser(raw: unknown): User | null {
  if (!isObject(raw)) return null;
  const id = num(raw.id, NaN);
  const email = str(raw.email).trim();
  if (Number.isNaN(id) || !email) return null;
  const company = isObject(raw.company)
    ? { name: str(raw.company.name), title: str(raw.company.title) }
    : undefined;
  return {
    id,
    email,
    firstName: str(raw.firstName),
    lastName: str(raw.lastName),
    phone: str(raw.phone, "-"),
    age: num(raw.age),
    gender: str(raw.gender, "-"),
    image: str(raw.image),
    company,
  };
}

export function normalizeUsers(raw: unknown): User[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeUser).filter((u): u is User => u !== null);
}

// ---------- helper tampilan data ----------
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );

export const discountedPrice = (
  p: Pick<Product, "price" | "discountPercentage">,
) => p.price * (1 - p.discountPercentage / 100);

export const fullName = (u: Pick<User, "firstName" | "lastName" | "email">) =>
  `${u.firstName} ${u.lastName}`.trim() || u.email;

export const initials = (u: Pick<User, "firstName" | "lastName" | "email">) =>
  (
    `${u.firstName[0] ?? ""}${u.lastName[0] ?? ""}` ||
    u.email[0] ||
    "?"
  ).toUpperCase();

export const totalPages = (total: number, pageSize: number) =>
  Math.max(1, Math.ceil(total / pageSize));

export const prettifyCategory = (slug: string) =>
  slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

// ---------- validasi login ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface LoginErrors {
  email?: string;
  password?: string;
}

export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!email.trim()) errors.email = "Email wajib diisi.";
  else if (!EMAIL_RE.test(email.trim()))
    errors.email = "Format email belum benar.";
  if (!password) errors.password = "Password wajib diisi.";
  else if (password.length < 6)
    errors.password = "Password minimal 6 karakter.";
  return errors;
}
