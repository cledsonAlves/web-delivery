
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Sparkles, X } from 'lucide-react';
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
      const newProduct = { ...editingProduct, id: Math.random().toString(36).substr(2, 9), image: `https://picsum.photos/seed/${editingProduct?.name}/400/300` } as Product;
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou categoria..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-all shadow-sm">
            <Filter size={20} />
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 font-bold"
          >
            <Plus size={20} />
            Novo Produto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="relative h-56 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-5 right-5 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-indigo-600 hover:bg-white shadow-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-red-600 hover:bg-white shadow-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-xl font-black text-gray-900 leading-tight">{product.name}</h4>
                <p className="text-xl font-black text-indigo-600 whitespace-nowrap">R$ {product.price.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className={`text-xs font-bold ${product.stock < 10 ? 'text-red-600' : 'text-gray-400'}`}>
                    {product.stock} unidades
                  </span>
                </div>
                <button className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest">
                  Gerenciar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-black text-gray-900">
                {editingProduct?.id ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 bg-gray-50 p-2 rounded-2xl transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nome do Produto</label>
                  <input 
                    type="text" 
                    value={editingProduct?.name} 
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    placeholder="Ex: Combo Jarinu Master" 
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Categoria</label>
                  <select 
                    value={editingProduct?.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold cursor-pointer"
                  >
                    <option>Lanches</option>
                    <option>Pizzas</option>
                    <option>Bebidas</option>
                    <option>Sobremesas</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Preço (R$)</label>
                  <input 
                    type="number" 
                    value={editingProduct?.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Estoque</label>
                  <input 
                    type="number" 
                    value={editingProduct?.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Descrição</label>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={!editingProduct?.name || isGenerating}
                    className="text-xs font-black text-indigo-600 flex items-center gap-2 hover:text-indigo-800 disabled:opacity-50 transition-colors bg-indigo-50 px-3 py-1.5 rounded-xl"
                  >
                    <Sparkles size={14} />
                    {isGenerating ? 'IA Pensando...' : 'Gerar com IA'}
                  </button>
                </div>
                <textarea 
                  rows={4} 
                  value={editingProduct?.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold resize-none"
                  placeholder="Conte um pouco sobre este produto..."
                ></textarea>
              </div>

              <div className="pt-10 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-900 transition-colors"
                >
                  Descartar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-[1.5rem] hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  Confirmar e Salvar
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
