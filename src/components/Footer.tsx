import React from 'react';
import { ChevronDown } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071D41] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">gov.br</h1>
          
          <div className="space-y-4">
            <div className="border-t border-gray-700">
              <button className="w-full text-left py-4 text-xl">MEC</button>
            </div>
            
            <div className="border-t border-gray-700">
              <button className="w-full flex justify-between items-center py-4">
                <span className="text-xl">ASSUNTOS</span>
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div className="border-t border-gray-700">
              <button className="w-full flex justify-between items-center py-4">
                <span className="text-xl">COMPOSIÇÃO</span>
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div className="border-t border-gray-700">
              <button className="w-full flex justify-between items-center py-4">
                <span className="text-xl">ACESSO À INFORMAÇÃO</span>
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div className="border-t border-gray-700">
              <button className="w-full flex justify-between items-center py-4">
                <span className="text-xl">CENTRAIS DE CONTEÚDO</span>
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div className="border-t border-gray-700">
              <button className="w-full flex justify-between items-center py-4">
                <span className="text-xl">CANAIS DE ATENDIMENTO</span>
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div className="border-t border-gray-700">
              <button className="w-full flex justify-between items-center py-4">
                <span className="text-xl">CAMPANHAS DA EDUCAÇÃO</span>
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div className="border-t border-gray-700 py-4">
              <button className="flex items-center gap-2">
                <span className="w-6 h-6 bg-white rounded-full"></span>
                <span className="text-xl">Redefinir Cookies</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#071D41]">
            <span className="text-2xl font-bold">i</span>
          </div>
          <span className="text-xl uppercase">Acesso à Informação</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;