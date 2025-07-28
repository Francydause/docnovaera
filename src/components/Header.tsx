import React from 'react';
import { MoreVertical, Sun, Grid, User, Mic, Search } from 'lucide-react';
import GovLogo from './GovLogo';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const { userName } = useUser();
  const firstName = userName ? userName.split(' ')[0] : '';

  return (
    <header className="w-full font-sans">
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <GovLogo />
            
            <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
            
            <button className="text-[#1351B4] hidden md:block">
              <div className="flex flex-col items-center justify-center w-5 h-5">
                <div className="w-[3px] h-[3px] rounded-full bg-current mb-[3px]"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-current mb-[3px]"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-current"></div>
              </div>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#1351B4]" aria-label="More options">
              <MoreVertical size={20} className="fill-current" />
            </button>
            
            <button className="p-2 text-[#1351B4]" aria-label="Display settings">
              <Sun size={20} className="stroke-current" />
            </button>
            
            <button className="p-2 text-[#1351B4]" aria-label="Menu grid">
              <Grid size={20} />
            </button>
            
            <button className="bg-[#1351B4] text-white py-2 px-6 rounded-full flex items-center gap-2 ml-2">
              <User size={20} />
              <span className="font-semibold">{firstName || 'Entrar'}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button className="flex items-center gap-3">
            <div className="text-[#1351B4]">
              <div className="w-6 h-0.5 bg-[#1351B4] mb-1"></div>
              <div className="w-6 h-0.5 bg-[#1351B4] mb-1"></div>
              <div className="w-6 h-0.5 bg-[#1351B4]"></div>
            </div>
            <span className="text-lg text-[#1351B4] font-medium">Ministério da Educação</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#1351B4]" aria-label="Voice search">
              <Mic size={20} />
            </button>
            
            <button className="p-2 text-[#1351B4]" aria-label="Search">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;