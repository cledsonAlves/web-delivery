export interface StoreConfig {
  id: string;
  name: string;
  city?: string;
  primaryHex: string; // main brand color
  accentHex: string; // secondary/accent
  lightBackground?: string;
  logoEmoji?: string;
}

function detectStore(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('store') || (import.meta.env.VITE_STORE as string) || 'jarinu';
  } catch (e) {
    return 'jarinu';
  }
}

const stores: Record<string, StoreConfig> = {
  jarinu: {
    id: 'jarinu',
    name: 'Jarinu Delivery',
    city: 'Jarinu',
    primaryHex: '#ff6b3d',
    accentHex: '#ff8a5b',
    lightBackground: '#FFF7F3',
    logoEmoji: '🏪'
  },
  'campo-limpo': {
    id: 'campo-limpo',
    name: 'Campo Limpo Delivery',
    city: 'Campo Limpo',
    primaryHex: '#4f8cff',
    accentHex: '#80aaff',
    lightBackground: '#F6FBFF',
    logoEmoji: '🚚'
  },
  jundiai: {
    id: 'jundiai',
    name: 'Jundiai Delivery',
    city: 'Jundiai',
    primaryHex: '#22c55e',
    accentHex: '#7ee787',
    lightBackground: '#F3FFF7',
    logoEmoji: '🌟'
  }
};

export const STORE_CONFIG: StoreConfig = stores[detectStore()] || stores.jarinu;

export const getStoreName = () => STORE_CONFIG.name;
export const getPrimaryHex = () => STORE_CONFIG.primaryHex;
export const getAccentHex = () => STORE_CONFIG.accentHex;
export const getLightBackground = () => STORE_CONFIG.lightBackground || '#FFFFFF';
export default STORE_CONFIG;
