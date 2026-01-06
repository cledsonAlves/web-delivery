import { Product } from '../types';

// Base API URL from environment variable
// Using the development API URL as specified in the documentation
const API_URL = 'https://api.jarifast.com.br';

/**
 * API request helper function
 */
async function apiRequest<T>(method: string, endpoint: string, data: any = null): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    // Attempt to parse response as JSON, but handle cases where it's not JSON
    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      // If response is not JSON, create a simple response object
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      responseData = { message: 'Success' };
    }

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });

      switch (response.status) {
        case 404:
          throw new Error(`Resource not found: ${endpoint}`);
        case 400:
          throw new Error(`Invalid data: ${responseData.detail || 'Check the fields'}`);
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(`Error: ${response.statusText}`);
      }
    }

    return responseData;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

/**
 * PRODUCT API ENDPOINTS
 */

// CREATE - Criar produto
export async function createProduct(produto: {
  lojista_id: string;
  categoria_id: string;
  nome: string;
  descricao: string;
  preco: number | string;
  preco_promocional?: number | string;
  custo?: number | string;
  estoque?: number;
  estoque_minimo?: number;
  controla_estoque?: boolean;
  sku?: string;
  codigo_barras?: string;
  ativo?: boolean;
  ordem?: number;
}): Promise<Product> {
  const result = await apiRequest<Product>('POST', '/produtos/', {
    lojista_id: produto.lojista_id,
    categoria_id: produto.categoria_id,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    preco_promocional: produto.preco_promocional,
    custo: produto.custo,
    estoque: produto.estoque,
    estoque_minimo: produto.estoque_minimo,
    controla_estoque: produto.controla_estoque,
    sku: produto.sku,
    codigo_barras: produto.codigo_barras,
    ativo: produto.ativo || true,
    ordem: produto.ordem || 0,
  });
  return result;
}

// READ - Listar produtos com filtros
export async function getProducts(filtros: {
  lojista_id?: string;
  categoria_id?: string;
  ativo?: boolean;
  skip?: number;
  limit?: number;
} = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filtros.lojista_id) params.append('lojista_id', filtros.lojista_id);
  if (filtros.categoria_id) params.append('categoria_id', filtros.categoria_id);
  if (filtros.ativo !== undefined) params.append('ativo', filtros.ativo.toString());
  params.append('skip', (filtros.skip || 0).toString());
  params.append('limit', (filtros.limit || 50).toString());

  const result = await apiRequest<Product[]>('GET', `/produtos/?${params.toString()}`);
  return result;
}

// READ - Obter produto específico
export async function getProductById(productId: string): Promise<Product> {
  const result = await apiRequest<Product>('GET', `/produtos/${productId}`);
  return result;
}

// UPDATE - Atualizar produto
export async function updateProduct(
  produtoId: string, 
  produto: {
    lojista_id: string;
    categoria_id: string;
    nome: string;
    descricao: string;
    preco: number | string;
    preco_promocional?: number | string;
    custo?: number | string;
    estoque?: number;
    estoque_minimo?: number;
    controla_estoque?: boolean;
    sku?: string;
    codigo_barras?: string;
    ativo?: boolean;
    ordem?: number;
  }
): Promise<Product> {
  const result = await apiRequest<Product>('PUT', `/produtos/${produtoId}`, {
    lojista_id: produto.lojista_id,
    categoria_id: produto.categoria_id,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    preco_promocional: produto.preco_promocional,
    custo: produto.custo,
    estoque: produto.estoque,
    estoque_minimo: produto.estoque_minimo,
    controla_estoque: produto.controla_estoque,
    sku: produto.sku,
    codigo_barras: produto.codigo_barras,
    ativo: produto.ativo,
    ordem: produto.ordem || 0,
  });
  return result;
}

// DELETE - Deletar produto
export async function deleteProduct(produtoId: string): Promise<void> {
  await apiRequest('DELETE', `/produtos/${produtoId}`);
}

/**
 * LOJISTAS API ENDPOINTS
 */

// CREATE - Criar lojista
export async function createLojista(nome: string, email: string): Promise<any> {
  const result = await apiRequest('POST', '/lojistas/', {
    nome,
    email,
  });
  return result;
}

// READ - Listar lojistas
export async function getLojistas(skip: number = 0, limit: number = 10): Promise<any[]> {
  const result = await apiRequest<any[]>('GET', `/lojistas/?skip=${skip}&limit=${limit}`);
  return result;
}

/**
 * CATEGORIAS API ENDPOINTS
 */

// CREATE - Criar categoria
export async function createCategoria(
  lojistaId: string, 
  nome: string, 
  descricao: string
): Promise<any> {
  const result = await apiRequest('POST', '/categorias/', {
    lojista_id: lojistaId,
    nome,
    descricao,
    ordem: 0,
  });
  return result;
}

// READ - Listar categorias
export async function getCategorias(lojistaId: string, skip: number = 0, limit: number = 20): Promise<any[]> {
  const result = await apiRequest<any[]>('GET', `/categorias/?lojista_id=${lojistaId}&skip=${skip}&limit=${limit}`);
  return result;
}