
import React, { useState } from 'react';
import { Store, Mail, Lock, Eye, EyeOff, Facebook, Chrome } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 space-y-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Store size={36} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isRegister ? 'Crie sua conta Lojista' : 'Bem-vindo de volta'}
              </h1>
              <p className="text-gray-500 text-sm">
                Gerencie suas vendas no Jarinu Delivery
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isRegister && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nome da Loja</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Pizzaria Jarinu" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Telefone</label>
                  <input 
                    type="tel" 
                    placeholder="(11) 99999-9999" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </>
            )}

            {!isRegister && (
              <div className="flex justify-end">
                <button className="text-sm font-bold text-orange-600 hover:underline">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button 
              onClick={onLogin}
              className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              {isRegister ? 'Cadastrar Loja' : 'Entrar na Plataforma'}
            </button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Ou entre com</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
              <Chrome size={18} />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
              <Facebook size={18} className="text-blue-600" />
              Facebook
            </button>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            {isRegister ? 'Já possui uma conta?' : 'Não tem uma conta?'}{' '}
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold text-orange-600 hover:underline"
            >
              {isRegister ? 'Entrar agora' : 'Cadastre sua loja'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
