
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Bike, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus } from '../types';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case OrderStatus.PREPARING: return 'bg-blue-100 text-blue-700 border-blue-200';
      case OrderStatus.DELIVERING: return 'bg-purple-100 text-purple-700 border-purple-200';
      case OrderStatus.COMPLETED: return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'Pendente';
      case OrderStatus.PREPARING: return 'Em Preparo';
      case OrderStatus.DELIVERING: return 'Em Entrega';
      case OrderStatus.COMPLETED: return 'Concluído';
      default: return status;
    }
  };

  const filteredOrders = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto w-full sm:w-auto">
          {['ALL', ...Object.values(OrderStatus)].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all
                ${filter === s ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}
              `}
            >
              {s === 'ALL' ? 'Todos' : getStatusLabel(s as OrderStatus)}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Nº do pedido..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-orange-200 transition-colors">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Header Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-gray-900">#{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      {order.customerAddress.split(',')[0]}
                    </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="lg:w-1/3 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {order.items.map(item => `${item.quantity}x ${item.product.name}`).join(', ')}
                  </p>
                </div>

                {/* Delivery Info */}
                <div className="lg:w-1/4">
                  {order.motoboyName ? (
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Bike size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Motoboy</p>
                        <p className="text-sm font-bold text-gray-800">{order.motoboyName}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-100">
                      <AlertCircle size={18} />
                      <span className="text-xs font-bold">Aguardando Entrega</span>
                    </div>
                  )}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                  <p className="text-xl font-bold text-gray-900">R$ {order.total.toFixed(2)}</p>
                  <button className="flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 group">
                    Detalhes
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Actions Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
               <div className="flex gap-4">
                 {order.status === OrderStatus.PENDING && (
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Iniciar Preparo</button>
                 )}
                 {order.status === OrderStatus.PREPARING && (
                    <button className="text-sm font-bold text-purple-600 hover:text-purple-700">Chamar Motoboy</button>
                 )}
               </div>
               <button className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-red-600">
                 Cancelar Pedido
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
