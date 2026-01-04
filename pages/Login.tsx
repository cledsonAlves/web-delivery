
import React, { useState } from 'react';
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
  Truck,
  ArrowRight
} from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side: Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#ee4d2d] via-[#f53d2d] to-[#ff6433] p-16 flex-col justify-between text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-12 border border-white/30 shadow-2xl">
            <ShoppingBag size={36} strokeWidth={2.5} />
          </div>
          <h1 className="text-6xl font-black leading-[1.1] mb-8 tracking-tighter">
            O seu negócio<br /><span className="text-orange-200">em Jarinu</span> decola aqui.
          </h1>
          <p className="text-orange-50 text-xl max-w-md mb-16 leading-relaxed font-medium">
            A plataforma de marketplace mais amada da região. Gestão simples, rápida e lucrativa.
          </p>

          <div className="space-y-10">
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="font-black text-lg">Pedidos Instantâneos</p>
                <p className="text-orange-100/80 text-sm">Receba alertas em tempo real no seu portal.</p>
              </div>
            </div>
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all">
                <BarChart size={24} />
              </div>
              <div>
                <p className="font-black text-lg">Dashboard com IA</p>
                <p className="text-orange-100/80 text-sm">Insights inteligentes para vender mais todos os dias.</p>
              </div>
            </div>
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all">
                <Truck size={24} />
              </div>
              <div>
                <p className="font-black text-lg">Frota Própria Jarinu</p>
                <p className="text-orange-100/80 text-sm">Logística integrada sem complicação para você.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-orange-200/60 text-xs font-bold uppercase tracking-[0.2em]">
          Jarinu Delivery System © 2025
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-16 lg:p-24 bg-[#FAFAFB]">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
               <div className="w-12 h-12 bg-[#ee4d2d] rounded-xl flex items-center justify-center text-white">
                 <ShoppingBag size={24} />
               </div>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
              {isRegister ? 'Crie sua loja' : 'Entrar no Portal'}
            </h2>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-wider">
              Central do Vendedor Jarinu Delivery
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {isRegister && (
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nome do Negócio</label>
                <input 
                  type="text" 
                  placeholder="Ex: Pizzaria da Vila" 
                  className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-50 focus:border-[#ee4d2d] outline-none transition-all shadow-sm font-bold"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">E-mail Comercial</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#ee4d2d] transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="admin@sualoja.com" 
                  className="w-full pl-14 pr-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-50 focus:border-[#ee4d2d] outline-none transition-all shadow-sm font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sua Senha</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#ee4d2d] transition-colors" size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full pl-14 pr-14 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-50 focus:border-[#ee4d2d] outline-none transition-all shadow-sm font-bold"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-[#ee4d2d] focus:ring-[#ee4d2d]" />
                  <span className="text-sm text-gray-500 font-bold group-hover:text-gray-900 transition-colors">Lembrar acesso</span>
                </label>
                <button type="button" className="text-sm font-black text-[#ee4d2d] hover:text-[#d73211] transition-colors">
                  Esqueci a senha
                </button>
              </div>
            )}

            <button 
              onClick={onLogin}
              className="w-full bg-[#ee4d2d] text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-100 hover:bg-[#d73211] hover:translate-y-[-2px] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              {isRegister ? 'Criar Minha Conta' : 'Acessar Painel'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Conectar via</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 px-4 bg-white border border-gray-100 rounded-2xl font-black text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
              <Chrome size={20} className="text-red-500" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 px-4 bg-white border border-gray-100 rounded-2xl font-black text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
              <Facebook size={20} className="text-blue-600" />
              Facebook
            </button>
          </div>

          <p className="text-center text-sm font-bold text-gray-400 pt-6">
            {isRegister ? 'Já possui acesso?' : 'Não é parceiro ainda?'}{' '}
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="font-black text-[#ee4d2d] hover:underline decoration-4 underline-offset-4"
            >
              {isRegister ? 'Entrar agora' : 'Cadastre-se'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
