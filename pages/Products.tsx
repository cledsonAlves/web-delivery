
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Sparkles, X } from 'lucide-react';
import { Product, UIProduct, apiProductToUIProduct, productFormToAPIProduct } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { createProduct, getProducts as fetchProducts, deleteProduct as deleteApiProduct, updateProduct, getCategorias } from '../services/apiService';

const Products: React.FC = () => {
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]); // Store categories
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Load products and categorias from API on component mount
  useEffect(() => {
    loadProducts();
    loadCategorias();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Use the hardcoded lojista_id as requested
      const apiProducts = await fetchProducts({ lojista_id: '3a56d5bd-ce8b-4e43-a212-418abd2f667e' });
      const uiProducts = apiProducts.map(apiProductToUIProduct);
      setProducts(uiProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      // Initialize with empty array if there's an error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategorias = async () => {
    try {
      // Use the hardcoded lojista_id as requested
      const categoriasData = await getCategorias('3a56d5bd-ce8b-4e43-a212-418abd2f667e');
      // Only use fetched categories if they exist, otherwise use defaults
      if (categoriasData && categoriasData.length > 0) {
        setCategorias(categoriasData);
      } else {
        setCategorias([
          { id: 'Lanches', nome: 'Lanches' },
          { id: 'Pizzas', nome: 'Pizzas' },
          { id: 'Bebidas', nome: 'Bebidas' },
          { id: 'Sobremesas', nome: 'Sobremesas' }
        ]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // Default categories for development
      setCategorias([
        { id: 'Lanches', nome: 'Lanches' },
        { id: 'Pizzas', nome: 'Pizzas' },
        { id: 'Bebidas', nome: 'Bebidas' },
        { id: 'Sobremesas', nome: 'Sobremesas' }
      ]);
    }
  };

  const handleOpenModal = (product?: UIProduct) => {
    setEditingProduct(product || { name: '', description: '', price: 0, stock: 0, categoria_id: 'Lanches', category: 'Lanches' });
    setIsModalOpen(true);
  };

  const handleGenerateAI = async () => {
    if (!editingProduct?.name) return;
    setIsGenerating(true);
    const description = await generateProductDescription(editingProduct.name, editingProduct.category || 'Lanches');
    setEditingProduct(prev => ({ ...prev, description }));
    setIsGenerating(false);
  };

  const handleSave = async () => {
    try {
      // Convert UI product to API product
      const lojistaId = '3a56d5bd-ce8b-4e43-a212-418abd2f667e'; // Use the hardcoded lojista_id as requested
      
      const apiProduct = productFormToAPIProduct(
        {
          id: editingProduct?.id,
          name: editingProduct?.name || '',
          category: editingProduct?.category || '',
          price: editingProduct?.price || 0,
          stock: editingProduct?.stock || 0,
          description: editingProduct?.description || '',
        },
        lojistaId, // Use the hardcoded lojista ID
        editingProduct?.categoria_id // Pass categoria_id if available
      );

      let updatedProduct;
      if (editingProduct?.id) {
        // Update existing product
        updatedProduct = await updateProduct(editingProduct.id, {
          ...apiProduct,
          lojista_id: apiProduct.lojista_id,
          categoria_id: apiProduct.categoria_id,
          nome: apiProduct.nome,
          descricao: apiProduct.descricao,
          preco: apiProduct.preco,
          estoque: apiProduct.estoque,
          estoque_minimo: apiProduct.estoque_minimo,
          controla_estoque: apiProduct.controla_estoque,
          ativo: apiProduct.ativo,
          ordem: apiProduct.ordem,
        });
        
        // Update the product in the UI list
        setProducts(products.map(p => 
          p.id === updatedProduct.id ? apiProductToUIProduct(updatedProduct) : p
        ));
      } else {
        // Create new product
        const newProduct = await createProduct(apiProduct);
        // Update UI with new product
        const newUIProduct = apiProductToUIProduct(newProduct);
        setProducts([...products, newUIProduct]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Delete product function
  const handleDelete = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteApiProduct(productId);
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou categoria..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-100 focus:border-[#ee4d2d] outline-none shadow-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:bg-orange-50 hover:text-[#ee4d2d] transition-all shadow-sm active:scale-95">
            <Filter size={20} />
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#ee4d2d] text-white px-6 py-3.5 rounded-2xl hover:bg-[#d73211] transition-all shadow-lg shadow-orange-100 font-bold active:scale-95"
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
                  className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-[#ee4d2d] hover:bg-white shadow-lg transition-colors active:scale-90"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-red-600 hover:bg-white shadow-lg transition-colors active:scale-90"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ee4d2d] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#ee4d2d] transition-colors">{product.name}</h4>
                <p className="text-xl font-black text-[#ee4d2d] whitespace-nowrap">R$ {product.price.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className={`text-xs font-bold ${product.stock < 10 ? 'text-red-600' : 'text-gray-400'}`}>
                    {product.stock} em estoque
                  </span>
                </div>
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="text-xs font-black text-[#ee4d2d] hover:text-[#d73211] transition-colors uppercase tracking-widest"
                >
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
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-black text-gray-900">
                {editingProduct?.id ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#ee4d2d] bg-gray-50 p-2 rounded-2xl transition-colors active:scale-90">
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
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#ee4d2d] focus:ring-4 focus:ring-orange-50 outline-none transition-all font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Categoria</label>
                  <select 
                    value={editingProduct?.categoria_id || editingProduct?.category || 'Lanches'}
                    onChange={(e) => setEditingProduct({...editingProduct, categoria_id: e.target.value, category: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#ee4d2d] outline-none transition-all font-bold cursor-pointer"
                  >
                    {categorias.length > 0 ? (
                      categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Lanches">Lanches</option>
                        <option value="Pizzas">Pizzas</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Sobremesas">Sobremesas</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Preço (R$)</label>
                  <input 
                    type="number" 
                    value={editingProduct?.price || 0}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#ee4d2d] outline-none transition-all font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Estoque</label>
                  <input 
                    type="number" 
                    value={editingProduct?.stock || 0}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#ee4d2d] outline-none transition-all font-bold" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Descrição</label>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={!editingProduct?.name || isGenerating}
                    className="text-xs font-black text-[#ee4d2d] flex items-center gap-2 hover:text-[#d73211] disabled:opacity-50 transition-colors bg-orange-50 px-3 py-1.5 rounded-xl active:scale-95"
                  >
                    <Sparkles size={14} />
                    {isGenerating ? 'IA Criando...' : 'Gerar com IA'}
                  </button>
                </div>
                <textarea 
                  rows={4} 
                  value={editingProduct?.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#ee4d2d] outline-none transition-all font-bold resize-none"
                  placeholder="Conte um pouco sobre este produto..."
                ></textarea>
              </div>

              <div className="pt-10 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-900 transition-colors active:scale-95"
                >
                  Descartar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] py-4 bg-[#ee4d2d] text-white font-black rounded-[1.5rem] hover:bg-[#d73211] shadow-xl shadow-orange-100 transition-all active:scale-95"
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
