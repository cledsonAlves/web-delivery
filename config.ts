// Configuração da Loja
// Customize aqui os dados de sua loja

export interface StoreConfig {
  name: string;
  city: string;
  primaryColor: string;
  primaryColorDark: string;
  logo?: string;
}

// Detectar qual configuração usar baseado na URL ou variável de ambiente
function getStoreConfig(): StoreConfig {
  const params = new URLSearchParams(window.location.search);
  const storeParam = params.get('store') || import.meta.env.VITE_STORE || 'jarinu';

  const stores: Record<string, StoreConfig> = {
    jarinu: {
      name: 'Jarinu Delivery',
      city: 'Jarinu',
      primaryColor: 'orange',
      primaryColorDark: 'orange-600',
      logo: '🏪'
    },
    'campo-limpo': {
      name: 'Campo Limpo Delivery',
      city: 'Campo Limpo',
      primaryColor: 'blue',
      primaryColorDark: 'blue-600',
      logo: '🚚'
    },
    jundiai: {
      name: 'Jundiai Delivery',
      city: 'Jundiai',
      primaryColor: 'green',
      primaryColorDark: 'green-600',
      logo: '🌟'
    },
    default: {
      name: 'Jarinu Delivery',
      city: 'Jarinu',
      primaryColor: 'orange',
      primaryColorDark: 'orange-600',
      logo: '🏪'
    }
  };

  return stores[storeParam] || stores.default;
}

export const STORE_CONFIG = getStoreConfig();

// Exportar cores baseado na configuração
export const getPrimaryColor = () => STORE_CONFIG.primaryColor;
export const getPrimaryColorDark = () => STORE_CONFIG.primaryColorDark;
export const getStoreName = () => STORE_CONFIG.name;
export const getStoreCity = () => STORE_CONFIG.city;
