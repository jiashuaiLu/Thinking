import { Search, Star, Bell } from 'lucide-react';
import { ViewType } from '../App';

interface TopNavProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function TopNav({ currentView, onViewChange }: TopNavProps) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 h-20 flex justify-between items-center px-8 md:px-12 bg-gray-900/40 backdrop-blur-xl z-40 shadow-[0_0_60px_rgba(0,0,0,0.06)]">
      <div className="flex items-center space-x-8">
        <span className="text-2xl font-serif tracking-widest text-teal-300 lg:hidden">空灵视界</span>
        
        {currentView === 'canvas' && (
          <div className="hidden md:flex gap-6 text-sm font-label uppercase tracking-widest items-center">
            <button onClick={() => onViewChange('hub')} className="text-[#BBC9C7] hover:text-[#6FEEE1] transition-colors duration-300">枢纽</button>
            <button onClick={() => onViewChange('canvas')} className="text-[#6FEEE1] font-semibold transition-colors duration-300">画布</button>
            <button onClick={() => onViewChange('lab')} className="text-[#BBC9C7] hover:text-[#6FEEE1] transition-colors duration-300">实验室</button>
          </div>
        )}

        {currentView !== 'canvas' && (
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input 
              type="text" 
              placeholder="探索视界..." 
              className="bg-surface-container-low border-none rounded-full pl-12 pr-6 py-2 w-64 focus:ring-1 focus:ring-primary/40 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4 md:space-x-6">
        {currentView === 'canvas' && (
          <div className="relative group md:hidden">
            <Search className="text-[#BBC9C7] cursor-pointer hover:text-[#6FEEE1] transition-colors w-5 h-5" />
          </div>
        )}
        
        <button className="text-teal-100/60 hover:bg-teal-400/10 p-2 rounded-full transition-colors hidden sm:block">
          <Star className="w-5 h-5" />
        </button>
        <button className="text-teal-100/60 hover:bg-teal-400/10 p-2 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="h-10 w-10 rounded-full border border-primary/20 p-0.5 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="Profile" 
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
