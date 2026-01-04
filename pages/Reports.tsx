
import React from 'react';
import { 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Users,
  ChevronRight
} from 'lucide-react';
import { MOCK_SALES_HISTORY } from '../constants';

const Reports: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Performance e Relatórios</h2>
          <p className="text-sm font-medium text-gray-500">Acompanhe métricas detalhadas de Jarinu.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-gray-600 shadow-sm">
            <Calendar size={18} className="text-[#ee4d2d]" />
            <span className="text-sm font-bold">Últimos 30 Dias</span>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-100 px-5 py-3 rounded-2xl text-gray-700 hover:text-[#ee4d2d] hover:border-orange-100 transition-all shadow-sm active:scale-95">
            <Download size={18} />
            <span className="hidden sm:inline font-bold text-sm">Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Grid Summary with Shopee Vibe */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Faturamento Bruto', value: 'R$ 8.420,00', change: '+12.4%', up: true, icon: DollarSign, bg: 'bg-orange-50', color: 'text-[#ee4d2d]' },
          { label: 'Total de Pedidos', value: '184', change: '+8.1%', up: true, icon: ShoppingBag, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Valor Médio', value: 'R$ 45,76', change: '-2.3%', up: false, icon: Package, bg: 'bg-purple-50', color: 'text-purple-600' },
          { label: 'Novos Visitantes', value: '2.405', change: '+5.7%', up: true, icon: Users, bg: 'bg-green-50', color: 'text-green-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-7 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-5">
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                <item.icon size={22} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-black px-2 py-1 rounded-full ${item.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {item.change}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">{item.label}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Product Table refined */}
      <div className="bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-black text-gray-900 tracking-tight">Produtos em Destaque</h3>
          <button className="text-[#ee4d2d] text-sm font-black hover:text-[#d73211] flex items-center gap-1 group">
            Ver Todos <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</th>
                <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Vendidos</th>
                <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Receita</th>
                <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Hambúrguer Artesanal', sales: 124, revenue: 'R$ 4.030,00', status: 'Alta', color: 'bg-green-50 text-green-600' },
                { name: 'Suco de Laranja 500ml', sales: 86, revenue: 'R$ 1.032,00', status: 'Média', color: 'bg-blue-50 text-blue-600' },
                { name: 'Pizza Calabresa Média', sales: 62, revenue: 'R$ 2.790,00', status: 'Alta', color: 'bg-green-50 text-green-600' },
                { name: 'Batata Frita Especial G', sales: 45, revenue: 'R$ 900,00', status: 'Baixa', color: 'bg-gray-50 text-gray-500' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-gray-800 group-hover:text-[#ee4d2d] transition-colors">{row.name}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-sm text-gray-600 font-medium">{row.sales} un</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-gray-900">{row.revenue}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider
                      ${row.color}
                    `}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
