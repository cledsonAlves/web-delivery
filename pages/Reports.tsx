
import React from 'react';
import { 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Users 
} from 'lucide-react';
import { MOCK_SALES_HISTORY } from '../constants';

const Reports: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Relatórios Detalhados</h2>
          <p className="text-gray-500">Acompanhe o crescimento do seu negócio em Jarinu.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600">
            <Calendar size={18} />
            <span className="text-sm font-medium">Novembro 2023</span>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            <span className="hidden sm:inline">Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Grid Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Faturamento Total', value: 'R$ 8.420,00', change: '+12%', up: true, icon: DollarSign },
          { label: 'Pedidos Realizados', value: '184', change: '+8%', up: true, icon: ShoppingBag },
          { label: 'Ticket Médio', value: 'R$ 45,76', change: '-2%', up: false, icon: Package },
          { label: 'Retenção de Clientes', value: '64%', change: '+5%', up: true, icon: Users },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                <item.icon size={20} />
              </div>
              <div className={`flex items-center gap-0.5 text-sm font-bold ${item.up ? 'text-green-600' : 'text-red-600'}`}>
                {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {item.change}
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Performance por Produto</h3>
          <button className="text-orange-600 text-sm font-bold hover:underline">Ver tudo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Produto</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Vendas</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estoque</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Receita</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Hambúrguer Artesanal', sales: 124, stock: 42, revenue: 'R$ 4.030', status: 'Alta' },
                { name: 'Suco de Laranja 500ml', sales: 86, stock: 15, revenue: 'R$ 1.032', status: 'Média' },
                { name: 'Pizza Calabresa Média', sales: 62, stock: 10, revenue: 'R$ 2.790', status: 'Alta' },
                { name: 'Batata Frita G', sales: 45, stock: 88, revenue: 'R$ 900', status: 'Baixa' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-800">{row.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{row.sales} un</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{row.stock} un</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{row.revenue}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                      ${row.status === 'Alta' ? 'bg-green-100 text-green-700' : 
                        row.status === 'Média' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}
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
