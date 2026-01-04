
import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Sparkles, X } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenModal = (product?: Product) => {
    setEditingProduct(product || { name: '', description: '', price: 0, stock: 0, category: 'Lanches' });
    setIsModalOpen(true);
  };

  const handleGenerateAI = async () => {
    if (!editingProduct?.name) return;
    setIsGenerating(true);
    const description = await generateProductDescription(editingProduct.name, editingProduct.category || 'Lanches');
    setEditingProduct(prev => ({ ...prev, description }));
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (editingProduct?.id) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct as Product : p));
    } else {
      const newProduct = { ...editingProduct, id: Math.random().toString(36).substr(2, 9) } as Product;
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
            <Filter size={18} />
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition-colors"
          >
            <Plus size={18} />
            Novo Produto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="relative h-48">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:bg-white"
                >
                  <Edit2 size={16} />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 hover:bg-white">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md mb-2 inline-block">
                    {product.category}
                  </span>
                  <h4 className="text-lg font-bold text-gray-900">{product.name}</h4>
                </div>
                <p className="text-lg font-bold text-gray-900">R$ {product.price.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className={`text-sm font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                  Estoque: {product.stock} un
                </span>
                <button className="text-sm font-semibold text-orange-600 hover:underline">Ver Detalhes</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Product Creation/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {editingProduct?.id ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nome do Produto</label>
                  <input 
                    type="text" 
                    value={editingProduct?.name} 
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    placeholder="Ex: Burger King Size" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Categoria</label>
                  <select 
                    value={editingProduct?.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option>Lanches</option>
                    <option>Pizzas</option>
                    <option>Bebidas</option>
                    <option>Sobremesas</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Preço (R$)</label>
                  <input 
                    type="number" 
                    value={editingProduct?.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Estoque Inicial</label>
                  <input 
                    type="number" 
                    value={editingProduct?.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2 relative">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Descrição</label>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={!editingProduct?.name || isGenerating}
                    className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles size={14} />
                    {isGenerating ? 'Gerando...' : 'Gerar com IA'}
                  </button>
                </div>
                <textarea 
                  rows={4} 
                  value={editingProduct?.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                ></textarea>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-gray-600 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
                >
                  Salvar Produto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
