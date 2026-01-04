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
  Sparkles,
  ArrowUpRight
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
    { label: 'Vendas Hoje', value: 'R$ 1.250,00', icon: TrendingUp, color: 'text-[#ee4d2d]', bg: 'bg-orange-50' },
    { label: 'Pedidos Ativos', value: '12', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Novos Clientes', value: '8', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Tempo Médio', value: '24 min', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-lg font-black text-[#ee4d2d]">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-[#ee4d2d]">Desempenho Semanal</h3>
              <p className="text-[10px] text-gray-400 font-medium">Jarinu - Vendas em Tempo Real</p>
            </div>
            <select className="bg-gray-50 border border-gray-100 text-[10px] font-bold rounded-lg px-3 py-1.5 outline-none text-gray-500 uppercase">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SALES_HISTORY}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ee4d2d" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ee4d2d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} 
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#ee4d2d" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights & Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-orange-50 text-[#ee4d2d] rounded-lg">
                <Sparkles size={16} />
              </div>
              <h3 className="text-xs font-bold text-[#ee4d2d] uppercase tracking-wider">Shopee IA Insight</h3>
            </div>
            <div className="bg-[#fff5f1] rounded-xl p-4 border border-orange-100">
              <p className="text-[#ee4d2d] text-xs leading-relaxed font-medium italic">
                "{insight}"
              </p>
            </div>
            <button className="w-full mt-4 py-2 text-[10px] font-bold text-[#ee4d2d] border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors uppercase tracking-widest">
              Análise Profunda
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-xs font-bold text-gray-800 mb-6 uppercase tracking-wider">Top Produtos</h4>
            <div className="space-y-5">
              {[
                { name: 'Hambúrguer Artesanal', count: 42, growth: '+12%' },
                { name: 'Pizza Calabresa', count: 35, growth: '+8%' },
                { name: 'Suco Natural', count: 28, growth: '+22%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-700">{item.name}</p>
                    <p className="text-[10px] text-gray-400">{item.count} pedidos realizados</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                    <ArrowUpRight size={10} />
                    {item.growth}
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