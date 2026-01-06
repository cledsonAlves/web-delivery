
export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  DELIVERING = 'DELIVERING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Product {
  id: string;
  lojista_id: string;
  categoria_id: string;
  nome: string;
  descricao: string;
  preco: number;
  preco_promocional?: number;
  custo?: number;
  estoque: number;
  estoque_minimo: number;
  controla_estoque: boolean;
  sku?: string;
  codigo_barras?: string;
  ativo: boolean;
  ordem: number;
  criado_em: string;
  atualizado_em: string;
}

// UI Product interface for backward compatibility
export interface UIProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

// Interface for product form data
export interface ProductFormData {
  id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
}

// Utility functions to convert between API and UI products
export const apiProductToUIProduct = (apiProduct: Product): UIProduct => {
  return {
    id: apiProduct.id,
    name: apiProduct.nome,
    description: apiProduct.descricao,
    price: typeof apiProduct.preco === 'string' ? parseFloat(apiProduct.preco) : apiProduct.preco,
    stock: typeof apiProduct.estoque === 'string' ? parseInt(apiProduct.estoque) : apiProduct.estoque,
    category: apiProduct.categoria_id,
    image: apiProduct.image || `https://picsum.photos/seed/${apiProduct.nome}/400/300`,
  };
};

export const uiProductToAPIProduct = (uiProduct: UIProduct, lojistaId: string, categoriaId: string): Product => {
  return {
    id: uiProduct.id,
    lojista_id: lojistaId,
    categoria_id: categoriaId || uiProduct.category, // Use provided category ID or fallback to category field
    nome: uiProduct.name,
    descricao: uiProduct.description,
    preco: uiProduct.price,
    estoque: uiProduct.stock,
    estoque_minimo: 1,
    controla_estoque: true,
    ativo: true,
    ordem: 0,
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
    preco_promocional: undefined,
    custo: uiProduct.price * 0.6,
    sku: `SKU-${uiProduct.id}`,
    codigo_barras: `CODE-${uiProduct.id}`,
  };
};

export const productFormToAPIProduct = (formData: ProductFormData, lojistaId: string, categoriaId?: string): Product => {
  return {
    id: formData.id || Math.random().toString(36).substr(2, 9),
    lojista_id: lojistaId,
    categoria_id: categoriaId || formData.category, // Use provided category ID or fallback to form category
    nome: formData.name,
    descricao: formData.description,
    preco: parseFloat(formData.price.toString()),
    estoque: parseInt(formData.stock.toString()),
    estoque_minimo: 1,
    controla_estoque: true,
    ativo: true,
    ordem: 0,
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
    preco_promocional: undefined,
    custo: parseFloat((formData.price * 0.6).toString()),
    sku: `SKU-${formData.id || Math.random().toString(36).substr(2, 9)}`,
    codigo_barras: `CODE-${formData.id || Math.random().toString(36).substr(2, 9)}`,
    image: formData.image || `https://picsum.photos/seed/${formData.name}/400/300`,
    controla_estoque: true,
    estoque_minimo: 1,
  };
};

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
