
import React, { useEffect, useState } from 'react';
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Clock,
  Sparkles
} from 'lucide-react';
import { MOCK_SALES_HISTORY } from '../constants';
import { getSalesInsights } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>('Analisando dados com inteligência artificial...');

  useEffect(() => {
    const fetchInsight = async () => {
      const result = await getSalesInsights(MOCK_SALES_HISTORY);
      setInsight(result);
    };
    fetchInsight();
  }, []);

  const stats = [
    { label: 'Vendas Hoje', value: 'R$ 1.250,00', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Pedidos Ativos', value: '12', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Novos Clientes', value: '8', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tempo Médio', value: '24 min', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col gap-4">
              <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-gray-900">Desempenho de Vendas</h3>
              <p className="text-sm text-gray-500">Acompanhamento dos últimos 7 dias</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-sm font-bold rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SALES_HISTORY}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  dy={15} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#4f46e5" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights & Featured */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles size={120} className="text-indigo-600" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Sparkles size={20} />
              </div>
              <h3 className="text-lg font-black text-gray-900">Insight IA</h3>
            </div>
            <div className="flex-1 bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
              <p className="text-indigo-900 text-sm leading-relaxed font-medium italic">
                "{insight}"
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-black text-gray-900 mb-6">Mais Vendidos</h4>
            <div className="space-y-6">
              {[
                { name: 'Hambúrguer Artesanal', count: 42, color: 'bg-indigo-600', total: 50 },
                { name: 'Pizza Calabresa', count: 35, color: 'bg-purple-600', total: 50 },
                { name: 'Suco Natural', count: 28, color: 'bg-blue-600', total: 50 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-gray-700">{item.name}</span>
                    <span className="font-black text-indigo-600">{item.count} <span className="text-gray-400 font-medium text-xs">vendas</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`${item.color} h-full transition-all duration-1000 ease-out`} 
                      style={{width: `${(item.count/item.total)*100}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
