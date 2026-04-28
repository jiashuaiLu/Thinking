import { Network, Brain, Waves, History, Plus } from 'lucide-react';
import { useState } from 'react';
import { ViewType } from '../App';

interface LabViewProps {
  onInitiate: (seed: string) => void;
  onViewChange: (view: ViewType) => void;
}

export default function LabView({ onInitiate, onViewChange }: LabViewProps) {
  const [seedInput, setSeedInput] = useState('');

  const handleSynthesis = () => {
    if (seedInput.trim()) {
      onInitiate(seedInput.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSynthesis();
    }
  };
  return (
    <div className="flex h-[calc(100vh-5rem)] celestial-bg">
      {/* Focused Creation Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-12 pb-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-3xl w-full text-center space-y-12 z-10">
          <header className="space-y-4">
            <h1 className="font-headline text-5xl md:text-7xl text-on-surface tracking-tight leading-tight">
              今天你想 <br/>
              <span className="italic text-primary">具象化</span> 什么？
            </h1>
            <p className="text-on-surface-variant font-body text-lg max-w-xl mx-auto">
              向虚空低语一个概念，看着它结晶成结构化的智慧。
            </p>
          </header>

          <div className="relative w-full group">
            <input 
              type="text" 
              value={seedInput}
              onChange={(e) => setSeedInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入一个短语、现象或关键词..." 
              className="w-full bg-surface-container-low/40 backdrop-blur-md border-b-2 border-outline-variant/30 focus:border-primary px-8 py-10 text-2xl md:text-3xl font-light text-on-surface outline-none transition-all focus:shadow-[0_0_40px_rgba(111,238,225,0.15)] rounded-xl text-center"
            />
            
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high border border-outline-variant/15 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all group/chip">
                <Network className="w-4 h-4 group-hover/chip:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-widest font-label">图谱</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high border border-primary/40 text-primary transition-all group/chip shadow-[0_0_20px_rgba(111,238,225,0.1)]">
                <Brain className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-label font-bold">思维导图</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high border border-outline-variant/15 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all group/chip">
                <Waves className="w-4 h-4 group-hover/chip:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-widest font-label">流程</span>
              </button>
            </div>
          </div>

          <div className="pt-8">
            <button 
              onClick={handleSynthesis}
              disabled={!seedInput.trim()}
              className="px-12 py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
            >
              开始合成
            </button>
          </div>
        </div>
      </div>

      {/* Recent Seeds Side Panel */}
      <aside className="w-80 border-l border-outline-variant/10 bg-surface-container-low/20 backdrop-blur-lg p-8 hidden xl:block overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-headline text-xl text-on-surface">最近的种子</h3>
          <History className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
        </div>
        
        <div className="space-y-6">
          {[
            { title: '生物系统中的量子纠缠', type: '思维导图', time: '2小时前', color: 'secondary' },
            { title: '梦境的建筑学', type: '图谱', time: '昨天', color: 'primary' },
            { title: '城市规划中的分形几何', type: '思维导图', time: '10月12日', color: 'secondary' }
          ].map((seed, i) => (
            <div key={i} className="group cursor-pointer" onClick={() => onInitiate(seed.title)}>
              <div className="p-5 rounded-xl bg-surface-container-high border border-outline-variant/10 group-hover:border-primary/30 group-hover:bg-surface-container-highest transition-all relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${seed.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <p className="text-on-surface font-medium mb-1 group-hover:text-primary transition-colors">{seed.title}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant bg-surface-container-lowest px-2 py-0.5 rounded">{seed.type}</span>
                  <span className="text-[10px] text-on-surface-variant/60">{seed.time}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-xl overflow-hidden group cursor-pointer relative aspect-[4/3] bg-surface-container-high border border-outline-variant/10" onClick={() => onInitiate('深海生物发光分析')}>
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Visual" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-background to-transparent">
              <p className="text-on-surface font-medium text-sm">深海生物发光分析</p>
              <span className="text-[10px] uppercase tracking-tighter text-primary mt-1">流程图</span>
            </div>
          </div>

          <button 
            onClick={() => onViewChange('archive')}
            className="w-full py-3 text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2 border border-dashed border-outline-variant/30 rounded-xl hover:border-primary/30"
          >
            <Plus className="w-4 h-4" />
            查看整个金库
          </button>
        </div>
      </aside>
    </div>
  );
}
