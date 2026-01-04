
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Bike, 
  Package,
  Printer,
  ShoppingCart
} from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus } from '../types';

const ITEMS_PER_PAGE = 5;

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'text-orange-600 bg-orange-50 border-orange-100';
      case OrderStatus.PREPARING: return 'text-blue-600 bg-blue-50 border-blue-100';
      case OrderStatus.DELIVERING: return 'text-purple-600 bg-purple-50 border-purple-100';
      case OrderStatus.COMPLETED: return 'text-green-600 bg-green-50 border-green-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'Aguardando';
      case OrderStatus.PREPARING: return 'Em Preparo';
      case OrderStatus.DELIVERING: return 'Em Rota';
      case OrderStatus.COMPLETED: return 'Finalizado';
      default: return status;
    }
  };

  const filteredOrders = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Navigation with enhanced horizontal scroll indication */}
        <div className="relative group">
          <div className="flex border-b border-gray-50 overflow-x-auto no-scrollbar scroll-smooth">
            {['ALL', ...Object.values(OrderStatus)].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`
                  flex-1 min-w-[120px] px-6 py-4 text-xs lg:text-sm font-bold transition-all border-b-2 active:bg-gray-50
                  ${filter === s 
                    ? 'border-[#ee4d2d] text-[#ee4d2d]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'}
                `}
              >
                {s === 'ALL' ? 'Todos Pedidos' : getStatusLabel(s as OrderStatus)}
              </button>
            ))}
          </div>
          {/* Visual gradient to indicate more content on small screens */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white pointer-events-none lg:hidden opacity-50"></div>
        </div>
        
        <div className="p-4 bg-gray-50/50">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar pelo ID ou cliente..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#ee4d2d] focus:ring-2 focus:ring-orange-50 outline-none text-xs transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedOrders.length > 0 ? (
          <>
            {paginatedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow active:bg-gray-50/50">
                <div className="p-4 lg:p-6">
                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 border-b border-gray-50 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#fff5f1] p-2 rounded-lg">
                          <Package size={22} className="text-[#ee4d2d]" />
                        </div>
                        <div>
                          <h4 className="text-sm lg:text-base font-bold text-gray-800">#{order.id}</h4>
                          <p className="text-[10px] text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()} às {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between lg:justify-end gap-2">
                        <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                        <button className="p-2.5 text-gray-400 hover:text-[#ee4d2d] hover:bg-orange-50 rounded-lg transition-all active:scale-90" title="Imprimir Recibo">
                          <Printer size={20} />
                        </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      <div className="space-y-1.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Itens</p>
                        <div className="text-xs text-gray-700 font-medium space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                               <span>{item.quantity}x {item.product.name}</span>
                               <span className="text-gray-400">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Entrega em</p>
                        <div className="flex items-start gap-1.5 text-xs text-gray-600 font-medium">
                           <MapPin size={14} className="mt-0.5 shrink-0 text-red-500" />
                           <span className="leading-tight">{order.customerName}<br/>{order.customerAddress}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Logística</p>
                        <div className="flex items-center gap-2 text-xs text-gray-700 font-bold">
                           <Bike size={18} className="text-blue-500" />
                           {order.motoboyName ? <span>{order.motoboyName}</span> : <span className="text-orange-500">Aguardando...</span>}
                        </div>
                      </div>

                      <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l lg:border-gray-50 pt-4 lg:pt-0 lg:pl-6">
                        <p className="text-[10px] text-gray-400 font-bold uppercase lg:mb-1">Total</p>
                        <p className="text-xl font-black text-[#ee4d2d]">R$ {order.total.toFixed(2)}</p>
                      </div>
                   </div>
                </div>
                
                <div className="bg-gray-50/80 p-4 lg:px-6 lg:py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                   <div className="flex gap-2 w-full sm:w-auto">
                     {order.status === OrderStatus.PENDING && (
                        <button className="flex-1 sm:flex-none bg-[#ee4d2d] text-white px-6 py-3 rounded-lg text-xs font-bold hover:bg-[#d73211] shadow-md shadow-orange-100 active:scale-95 transition-all">Aceitar Pedido</button>
                     )}
                     {order.status === OrderStatus.PREPARING && (
                        <button className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-3 rounded-lg text-xs font-bold hover:bg-blue-700 active:scale-95 transition-all">Marcar como Pronto</button>
                     )}
                   </div>
                   <div className="flex justify-between w-full sm:w-auto sm:gap-6">
                      <button className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors py-2">Ver Detalhes</button>
                      <button className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors py-2">Cancelar</button>
                   </div>
                </div>
              </div>
            ))}

            {/* Pagination Controls Mobile Optimized */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 py-4 px-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl border border-gray-200 bg-white text-gray-500 active:scale-90 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`
                        w-11 h-11 rounded-xl text-sm font-bold transition-all active:scale-90
                        ${currentPage === pageNum 
                          ? 'bg-[#ee4d2d] text-white shadow-lg shadow-orange-100' 
                          : 'bg-white border border-gray-200 text-gray-600'}
                      `}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl border border-gray-200 bg-white text-gray-500 active:scale-90 disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-12 lg:p-20 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
             <div className="bg-gray-50 p-6 rounded-full">
               <ShoppingCart size={40} className="text-gray-200" />
             </div>
             <div>
               <p className="text-gray-800 font-bold">Sem pedidos aqui</p>
               <p className="text-xs text-gray-400">Não encontramos pedidos com este status no momento.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
