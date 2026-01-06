
import { OrderStatus, Product, Order, SalesData } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'João Silva',
    customerAddress: 'Rua das Flores, 123, Jarinu - SP',
    items: [{ product: { id: '1', name: 'Test Product', description: 'Test description', price: 32.50, stock: 50, category: 'Lanches', image: 'https://picsum.photos/seed/burger/400/300' }, quantity: 2 }],
    total: 65.00,
    status: OrderStatus.PENDING,
    createdAt: '2023-11-20T10:30:00Z'
  },
  {
    id: 'ORD-002',
    customerName: 'Maria Oliveira',
    customerAddress: 'Av. Brasil, 456, Jarinu - SP',
    items: [{ product: { id: '2', name: 'Test Product 2', description: 'Test description 2', price: 45.00, stock: 30, category: 'Pizzas', image: 'https://picsum.photos/seed/pizza/400/300' }, quantity: 1 }],
    total: 45.00,
    status: OrderStatus.PREPARING,
    createdAt: '2023-11-20T11:15:00Z',
    motoboyName: 'Ricardo Motos'
  },
  {
    id: 'ORD-003',
    customerName: 'Carlos Santos',
    customerAddress: 'Rua Central, 789, Jarinu - SP',
    items: [{ product: { id: '3', name: 'Test Product 3', description: 'Test description 3', price: 12.00, stock: 100, category: 'Bebidas', image: 'https://picsum.photos/seed/juice/400/300' }, quantity: 3 }],
    total: 36.00,
    status: OrderStatus.DELIVERING,
    createdAt: '2023-11-20T12:00:00Z',
    motoboyName: 'Lucas Express'
  }
];

export const MOCK_SALES_HISTORY: SalesData[] = [
  { date: 'Seg', sales: 450, orders: 12 },
  { date: 'Ter', sales: 600, orders: 15 },
  { date: 'Qua', sales: 300, orders: 8 },
  { date: 'Qui', sales: 850, orders: 22 },
  { date: 'Sex', sales: 1200, orders: 35 },
  { date: 'Sab', sales: 1500, orders: 42 },
  { date: 'Dom', sales: 1100, orders: 28 },
];
