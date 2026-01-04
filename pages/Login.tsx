
import React, { useState } from 'react';
import { getPrimaryHex, getAccentHex, getStoreName } from '../config';
import { 
  ShoppingBag, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Facebook, 
  Chrome, 
  CheckCircle, 
  BarChart, 
  Truck 
} from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side: Branding & Features (Visible on large screens) */}
      <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-between text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${getPrimaryHex()}22 0%, ${getAccentHex()}22 100%)` }}>
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/30">
            <ShoppingBag size={36} />
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Bem-vindo à<br />Plataforma {getStoreName()}
          </h1>
          <p className="text-indigo-100 text-lg max-w-md mb-12 leading-relaxed">
            Gerencie sua loja, produtos e pedidos em um só lugar. Conecte-se com seus clientes e aumente suas vendas.
          </p>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="font-bold text-white">Gestão Completa</p>
                <p className="text-indigo-100 text-sm">Controle total do seu inventário</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart size={20} />
              </div>
              <div>
                <p className="font-bold text-white">Relatórios Detalhados</p>
                <p className="text-indigo-100 text-sm">Analise seu desempenho real</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Truck size={20} />
              </div>
              <div>
                <p className="font-bold text-white">Entrega Rápida</p>
                <p className="text-indigo-100 text-sm">Logística otimizada para Jarinu</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-indigo-200 text-sm">
          © 2026 {getStoreName()}. Todos os direitos reservados.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-gray-50 lg:bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {isRegister ? 'Criar sua conta' : 'Fazer Login'}
            </h2>
            <p className="text-gray-500 font-medium">
              Entre na sua conta para continuar
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {isRegister && (
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Nome da Loja</label>
                <input 
                  type="text" 
                  placeholder="Nome do seu negócio" 
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Lembrar-me</span>
                </label>
                <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button 
              onClick={onLogin}
              className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:translate-y-[-1px] active:translate-y-[0px] transition-all"
              style={{ backgroundColor: getPrimaryHex(), boxShadow: `0 8px 24px ${getPrimaryHex()}22` }}
            >
              {isRegister ? 'Registrar Agora' : 'Entrar'}
            </button>
          </form>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Ou continue com</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <Chrome size={18} className="text-red-500" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <Facebook size={18} className="text-blue-600" />
              Facebook
            </button>
          </div>

          <p className="text-center text-sm font-medium text-gray-600 pt-4">
            {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="font-extrabold text-indigo-600 hover:underline decoration-2 underline-offset-4"
            >
              {isRegister ? 'Faça Login' : 'Registrar-se'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
