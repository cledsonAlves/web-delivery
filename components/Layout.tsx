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
import STORE_CONFIG, { getPrimaryHex, getAccentHex, getStoreName } from '../config';

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

  const handleViewSelect = (view: View) => {
    onViewChange(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-out shadow-2xl lg:shadow-none lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow" style={{ backgroundColor: getPrimaryHex() }}>
                <Store size={22} />
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">{getStoreName()}</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-gray-700 transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleViewSelect(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${
                  activeView === item.id ? 'font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                style={activeView === item.id ? { color: getPrimaryHex(), backgroundColor: `${getPrimaryHex()}22` } : undefined}
              >
                <item.icon size={20} style={activeView === item.id ? { color: getPrimaryHex() } : { color: '#9CA3AF' }} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-50">
            <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-medium">
              <LogOut size={20} />
              <span className="text-sm">Sair da Conta</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-lg active:scale-90 transition-all">
              <Menu size={24} />
            </button>
            <h1 className="text-lg lg:text-xl font-extrabold text-gray-900 capitalize tracking-tight">
              {activeView === 'dashboard' ? 'Início' : activeView === 'orders' ? 'Gerenciar Pedidos' : activeView === 'products' ? 'Meus Produtos' : 'Relatórios'}
            </h1>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-xs lg:text-sm font-bold text-gray-900">{getStoreName()}</p>
              <p className="text-[10px] font-bold px-2 py-0.5 rounded-md inline-block" style={{ color: getPrimaryHex(), backgroundColor: `${getPrimaryHex()}22` }}>
                Online
              </p>
            </div>
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 p-0.5 shadow-sm" style={{ borderColor: `${getPrimaryHex()}33` }}>
              <img src="https://picsum.photos/seed/store/80/80" alt="Store profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: STORE_CONFIG.lightBackground || '#FAFAFB' }}>
          <div className="max-w-7xl mx-auto p-4 lg:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
};
