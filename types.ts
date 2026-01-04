
export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  DELIVERING = 'DELIVERING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  items: { product: Product; quantity: number }[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  motoboyName?: string;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export type View = 'dashboard' | 'products' | 'orders' | 'reports' | 'login';
