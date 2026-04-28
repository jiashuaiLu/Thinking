import { LayoutDashboard, Network, FlaskConical, BookOpen, Settings, HelpCircle, Zap } from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onOpenNewSpark: () => void;
}

export default function Sidebar({ currentView, onViewChange, onOpenNewSpark }: SidebarProps) {
  const navItems = [
    { id: 'hub', label: '枢纽', icon: LayoutDashboard },
    { id: 'canvas', label: '画布', icon: Network },
    { id: 'lab', label: '实验室', icon: FlaskConical },
    { id: 'archive', label: '归档', icon: BookOpen },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gray-950/60 backdrop-blur-2xl flex-col py-8 z-50 border-r border-outline-variant/10 hidden lg:flex">
      <div className="px-8 mb-12">
        <h1 className="font-serif text-teal-300 text-2xl tracking-widest">导航仪</h1>
        <p className="text-[10px] tracking-[0.2em] uppercase text-teal-100/40 mt-1">深空探索</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-8 py-4 transition-all font-sans text-sm tracking-wider uppercase ${
                isActive 
                  ? 'text-teal-300 border-l-2 border-teal-400 bg-teal-400/5 font-bold' 
                  : 'text-teal-100/40 hover:text-teal-200 hover:bg-white/5'
              }`}
            >
              <Icon className="mr-4 w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="px-8 mb-8">
        <button 
          onClick={onOpenNewSpark}
          className="bioluminescent w-full py-4 rounded-full text-on-primary font-bold tracking-widest text-xs uppercase shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          新火花
        </button>
      </div>
      
      <div className="px-8 space-y-4 pt-8 border-t border-outline-variant/10">
        <button className="flex items-center text-teal-100/40 hover:text-teal-200 transition-colors w-full">
          <Settings className="mr-4 w-4 h-4" />
          <span className="font-sans text-[10px] tracking-widest uppercase">设置</span>
        </button>
        <button className="flex items-center text-teal-100/40 hover:text-teal-200 transition-colors w-full">
          <HelpCircle className="mr-4 w-4 h-4" />
          <span className="font-sans text-[10px] tracking-widest uppercase">支持</span>
        </button>
      </div>
    </aside>
  );
}
