
import { OrderStatus, Product, Order, SalesData } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hambúrguer Artesanal',
    description: 'Pão brioche, carne 180g, queijo cheddar e bacon crocante.',
    price: 32.50,
    stock: 50,
    category: 'Lanches',
    image: 'https://picsum.photos/seed/burger/400/300'
  },
  {
    id: '2',
    name: 'Pizza Calabresa Média',
    description: 'Molho de tomate pelado, mussarela, calabresa e orégano.',
    price: 45.00,
    stock: 30,
    category: 'Pizzas',
    image: 'https://picsum.photos/seed/pizza/400/300'
  },
  {
    id: '3',
    name: 'Suco de Laranja 500ml',
    description: 'Suco natural feito na hora, sem conservantes.',
    price: 12.00,
    stock: 100,
    category: 'Bebidas',
    image: 'https://picsum.photos/seed/juice/400/300'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'João Silva',
    customerAddress: 'Rua das Flores, 123, Jarinu - SP',
    items: [{ product: MOCK_PRODUCTS[0], quantity: 2 }],
    total: 65.00,
    status: OrderStatus.PENDING,
    createdAt: '2023-11-20T10:30:00Z'
  },
  {
    id: 'ORD-002',
    customerName: 'Maria Oliveira',
    customerAddress: 'Av. Brasil, 456, Jarinu - SP',
    items: [{ product: MOCK_PRODUCTS[1], quantity: 1 }],
    total: 45.00,
    status: OrderStatus.PREPARING,
    createdAt: '2023-11-20T11:15:00Z',
    motoboyName: 'Ricardo Motos'
  },
  {
    id: 'ORD-003',
    customerName: 'Carlos Santos',
    customerAddress: 'Rua Central, 789, Jarinu - SP',
    items: [{ product: MOCK_PRODUCTS[2], quantity: 3 }],
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
