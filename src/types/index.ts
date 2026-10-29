export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  company?: { name?: string; title?: string };
}

/** Bentuk respons list yang sudah diseragamkan (DummyJSON memakai key berbeda per resource). */
export interface ListResponse<T> {
  items: T[];
  total: number;
}
