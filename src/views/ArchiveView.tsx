import { Filter, GitMerge, Tornado, Maximize2, Brain } from 'lucide-react';
import { ViewType } from '../App';

interface ArchiveViewProps {
  onInitiate: (seed: string) => void;
  onViewChange: (view: ViewType) => void;
}

export default function ArchiveView({ onInitiate, onViewChange }: ArchiveViewProps) {
  return (
    <div className="px-8 md:px-12 pb-20">
      <section className="max-w-7xl mx-auto mb-16 relative pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase block">个人图书馆</span>
            <h1 className="text-5xl md:text-7xl font-headline text-on-surface leading-tight">灵感归档</h1>
            <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed">
              你的过往发展星图、相互连接的思想节点以及定义它们的空灵火花的天体集合。
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-surface-container-low p-1 rounded-full ghost-border">
              <button className="px-5 py-2 text-xs uppercase tracking-widest text-primary bg-surface-container-high rounded-full">所有星图</button>
              <button className="px-5 py-2 text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">最近</button>
              <button className="px-5 py-2 text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">复杂</button>
            </div>
            <button className="flex items-center gap-2 bg-surface-container-low px-5 py-3 rounded-full ghost-border text-xs uppercase tracking-widest text-on-surface hover:bg-surface-container-high transition-colors">
              <Filter className="w-4 h-4" />
              筛选
            </button>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Map Card 1 */}
        <div 
          onClick={() => onInitiate('沉默的建筑')}
          className="md:col-span-8 group relative overflow-hidden rounded-xl glass-card ghost-border h-[400px] cursor-pointer"
        >
          <div className="absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-700">
            <img src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1200&auto=format&fit=crop" alt="Abstract" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container-high/80 rounded-full text-[10px] uppercase tracking-widest text-primary border border-primary/20">概念性</span>
                <span className="px-3 py-1 bg-surface-container-high/80 rounded-full text-[10px] uppercase tracking-widest text-tertiary-fixed border border-outline-variant/30">v.4.2</span>
              </div>
              <span className="text-on-surface-variant text-xs font-label">2024年3月12日</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-headline text-on-surface">沉默的建筑</h3>
              <p className="text-on-surface-variant text-sm max-w-md group-hover:text-on-surface transition-colors">
                探索粗野派设计与冥想虚空状态的交集。
              </p>
              <div className="pt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/20 border border-primary/40">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-tighter text-primary-container">初始种子</p>
                  <p className="text-sm font-medium italic">"空间如何在没有光的情况下呼吸？"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Card 2 */}
        <div 
          onClick={() => onInitiate('分形韧性')}
          className="md:col-span-4 group relative overflow-hidden rounded-xl glass-card ghost-border h-[400px] cursor-pointer"
        >
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Crystal" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-90"></div>
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
            <div className="text-right">
              <span className="text-on-surface-variant text-xs font-label">2024年2月28日</span>
            </div>
            <div className="space-y-3">
              <span className="px-3 py-1 bg-secondary-container/20 rounded-full text-[10px] uppercase tracking-widest text-secondary border border-secondary/30 w-fit block">有机增长</span>
              <h3 className="text-2xl font-headline text-on-surface">分形韧性</h3>
              <div className="h-0 group-hover:h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                <div className="pt-4 flex items-center gap-3">
                  <span className="text-xs italic text-on-surface-variant leading-relaxed">种子: 观察高山地衣图案。</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Card 3 */}
        <div 
          onClick={() => onInitiate('数字孤独')}
          className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-low ghost-border h-[300px] cursor-pointer"
        >
          <div className="p-8 h-full flex flex-col justify-between border-l-2 border-primary">
            <div className="flex justify-between">
              <GitMerge className="w-8 h-8 text-primary/40" />
              <span className="text-on-surface-variant text-[10px] font-label">12 节点</span>
            </div>
            <div>
              <h3 className="text-xl font-headline mb-2 text-on-surface">数字孤独</h3>
              <div className="h-px w-12 bg-outline-variant mb-4 group-hover:w-full transition-all duration-700"></div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[9px] uppercase tracking-tighter px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant">社交</span>
                <span className="text-[9px] uppercase tracking-tighter px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant">伦理</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-surface-container-high transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs italic text-primary">种子: 空房间里手机震动的声音。</p>
            </div>
          </div>
        </div>

        {/* Map Card 4 */}
        <div 
          onClick={() => onInitiate('动态排版')}
          className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-low ghost-border h-[300px] cursor-pointer"
        >
          <div className="p-8 h-full flex flex-col justify-between border-l-2 border-secondary">
            <div className="flex justify-between">
              <Tornado className="w-8 h-8 text-secondary/40" />
              <span className="text-on-surface-variant text-[10px] font-label">28 节点</span>
            </div>
            <div>
              <h3 className="text-xl font-headline mb-2 text-on-surface">动态排版</h3>
              <div className="h-px w-12 bg-outline-variant mb-4 group-hover:w-full transition-all duration-700"></div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[9px] uppercase tracking-tighter px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant">设计</span>
                <span className="text-[9px] uppercase tracking-tighter px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant">运动</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-surface-container-high transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs italic text-secondary">种子: Saul Bass 的片头序列。</p>
            </div>
          </div>
        </div>

        {/* Map Card 5 */}
        <div 
          onClick={() => onInitiate('全球同步性')}
          className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-low ghost-border h-[300px] cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop" alt="Earth" className="w-full h-full object-cover opacity-40 rounded-bl-3xl grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="p-8 h-full flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">归档条目 #290</p>
              <h3 className="text-xl font-headline text-on-surface">全球同步性</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary-container/20 border border-surface-container-low"></div>
                <div className="w-6 h-6 rounded-full bg-secondary-container/20 border border-surface-container-low"></div>
                <div className="w-6 h-6 rounded-full bg-tertiary-container/20 border border-surface-container-low"></div>
              </div>
              <Maximize2 className="w-5 h-5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-surface-container-high transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs italic text-primary">种子: 鸟类如何在没有首领的情况下成群结队。</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto mt-20 text-center">
        <button className="px-8 py-4 bg-surface-container-low text-on-surface-variant rounded-full ghost-border hover:bg-surface-container-high transition-all text-xs uppercase tracking-[0.2em]">
          揭开古老火花
        </button>
        <div className="mt-12 flex justify-center items-center gap-12 text-[10px] uppercase tracking-widest text-on-surface-variant/40">
          <span>© 2024 Celestial Collective</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
          <span>为成长而策展</span>
        </div>
      </footer>
    </div>
  );
}
