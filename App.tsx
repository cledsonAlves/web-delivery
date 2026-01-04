
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import Login from './pages/Login';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activeView={currentView} 
      onViewChange={setCurrentView}
      onLogout={handleLogout}
    >
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'products' && <Products />}
      {currentView === 'orders' && <Orders />}
      {currentView === 'reports' && <Reports />}
    </Layout>
  );
};

export default App;
