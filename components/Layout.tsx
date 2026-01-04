
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  LogOut, 
  Store,
  Menu,
  X
} from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders' as View, label: 'Pedidos', icon: ShoppingCart },
    { id: 'products' as View, label: 'Produtos', icon: Package },
    { id: 'reports' as View, label: 'Relatórios', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-100"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Store size={22} />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">Jarinu Delivery</span>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 mt-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all
                  ${activeView === item.id 
                    ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm shadow-indigo-50/50' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}
                `}
              >
                <item.icon size={20} className={activeView === item.id ? 'text-indigo-600' : 'text-gray-400'} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-50">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-medium"
            >
              <LogOut size={20} />
              Sair da Conta
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 capitalize tracking-tight">
              {activeView === 'dashboard' ? 'Visão Geral' : activeView}
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Cantina Jarinu</p>
              <p className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md inline-block">Online</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-indigo-100 p-0.5">
              <img 
                src="https://picsum.photos/seed/store/80/80" 
                alt="Store profile" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#FAFAFB]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
