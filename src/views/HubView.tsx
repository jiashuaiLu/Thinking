import { Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ViewType } from '../App';

interface HubViewProps {
  onViewChange: (view: ViewType) => void;
  onInitiate: (seed: string) => void;
}

export default function HubView({ onViewChange, onInitiate }: HubViewProps) {
  const [quickSpark, setQuickSpark] = useState('');

  const handleManifestQuickSpark = () => {
    if (quickSpark.trim()) {
      onInitiate(quickSpark);
    }
  };
  return (
    <div className="px-8 md:px-12 pb-20">
      {/* Hero Section */}
      <section className="mb-24 flex flex-col md:flex-row items-start justify-between pt-12">
        <div className="max-w-2xl">
          <h2 className="font-serif text-5xl md:text-6xl text-on-surface tracking-tight leading-[1.1] mb-6">
            策展 <span className="text-primary italic">无限</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
            你的数字意识，按宇宙权重排列。从虚空中收获火花，将其编织成智慧的星图。
          </p>
        </div>
        <div className="mt-12 md:mt-0 flex flex-col items-end">
          <div className="text-right mb-4">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-primary mb-1">增长指标</span>
            <span className="font-serif text-4xl text-on-surface">1,204 颗种子</span>
          </div>
          <div className="h-[2px] w-32 bg-primary/20 relative">
            <div className="absolute inset-0 bg-primary w-2/3 shadow-[0_0_8px_rgba(111,238,225,0.6)]"></div>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Entry */}
        <div className="lg:col-span-4 h-full">
          <div className="bg-surface-variant/40 backdrop-blur-3xl rounded-xl p-8 h-full border border-outline-variant/10 flex flex-col">
            <div className="mb-8">
              <Zap className="text-primary w-10 h-10 mb-4" />
              <h3 className="font-serif text-2xl text-on-surface">新灵感种子</h3>
              <p className="text-on-surface-variant text-sm mt-2">在转瞬即逝的思绪消散于数字以太之前捕捉它。</p>
            </div>
            <div className="flex-1 space-y-6">
              <div className="relative">
                <input 
                  type="text" 
                  value={quickSpark}
                  onChange={(e) => setQuickSpark(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManifestQuickSpark()}
                  placeholder="识别火花..." 
                  className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-all text-on-surface text-lg"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/15">概念</span>
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/15">短暂</span>
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/15">+ 标签</span>
              </div>
            </div>
            <button 
              onClick={handleManifestQuickSpark}
              className="mt-8 group flex items-center text-primary tracking-[0.2em] uppercase text-xs font-bold w-fit"
            >
              具象化火花 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Trending Sparks */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-10 overflow-hidden relative border border-outline-variant/5 min-h-[300px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32"></div>
          <h3 className="font-serif text-2xl mb-8">热门火花</h3>
          <div className="relative h-64 flex items-center justify-center">
            <motion.div 
              onClick={() => onInitiate('量子意识')}
              animate={{ y: [0, -15, 5, 0], x: [0, 10, -5, 0], rotate: [0, 2, -1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-1/4 px-6 py-3 rounded-full bg-surface-container-high/40 backdrop-blur-md border border-primary/20 text-primary text-glow text-lg font-serif italic cursor-pointer hover:scale-105 spark-tag"
            >
              量子意识
            </motion.div>
            <motion.div 
              onClick={() => onInitiate('太阳朋克')}
              animate={{ y: [0, 20, -10, 0], x: [0, -15, 10, 0], rotate: [0, -3, 2, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 left-1/3 px-5 py-2 rounded-full bg-surface-container-high/40 backdrop-blur-md border border-secondary/20 text-secondary text-sm tracking-widest uppercase cursor-pointer hover:scale-105 spark-tag"
            >
              太阳朋克
            </motion.div>
            <motion.div 
              onClick={() => onInitiate('极简虚空')}
              animate={{ y: [0, -25, 15, 0], x: [0, 20, -15, 0], rotate: [0, 4, -2, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-1/4 px-7 py-4 rounded-full bg-surface-container-high/60 backdrop-blur-lg border border-primary/30 text-primary text-glow text-2xl font-serif cursor-pointer hover:scale-105 spark-tag"
            >
              极简虚空
            </motion.div>
            <motion.div 
              onClick={() => onInitiate('数字静谧')}
              animate={{ y: [0, 12, -8, 0], x: [0, -10, 5, 0], rotate: [0, -1, 1, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-4 right-1/3 px-4 py-2 rounded-full bg-surface-container-high/40 backdrop-blur-md border border-outline-variant/20 text-on-surface-variant text-xs uppercase tracking-widest cursor-pointer hover:scale-105 spark-tag"
            >
              数字静谧
            </motion.div>
            <motion.div 
              onClick={() => onInitiate('超级专注')}
              animate={{ y: [0, -10, 10, 0], x: [0, 15, -10, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-4 right-1/2 px-4 py-2 rounded-full bg-surface-container-high/40 backdrop-blur-md border border-outline-variant/20 text-on-surface-variant text-[10px] uppercase tracking-widest cursor-pointer hover:scale-105 spark-tag"
            >
              超级专注
            </motion.div>
          </div>
        </div>

        {/* Growth Maps */}
        <div className="col-span-1 lg:col-span-12 space-y-8 mt-8">
          <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
            <div>
              <h3 className="font-serif text-3xl">发展星图</h3>
              <p className="text-on-surface-variant text-sm">可视化你创意神经网络的进化。</p>
            </div>
            <button onClick={() => onViewChange('archive')} className="text-secondary text-xs uppercase tracking-widest border-b border-secondary/40 pb-1 hover:border-secondary transition-all">查看所有归档</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '神经共生', mapped: '72%', time: '2小时前', color: 'primary', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
              { title: '星系共振', mapped: '34%', time: '昨天', color: 'secondary', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' },
              { title: '粗野派禅宗', mapped: '已归档', time: '4天前', color: 'on-surface-variant', img: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop' }
            ].map((map, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => onInitiate(map.title)}>
                <div className="aspect-[16/10] bg-surface-container-high rounded-xl mb-4 overflow-hidden relative border border-outline-variant/10">
                  <div className={`absolute inset-0 bg-gradient-to-br from-${map.color}/10 to-transparent z-10`}></div>
                  <img src={map.img} alt={map.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-${map.color}/20 z-20`}>
                    <span className={`text-[10px] text-${map.color} tracking-widest uppercase`}>{map.mapped} 已映射</span>
                  </div>
                </div>
                <h4 className={`font-serif text-xl group-hover:text-${map.color} transition-colors`}>{map.title}</h4>
                <p className="text-on-surface-variant text-xs mt-1 uppercase tracking-widest">最后修改: {map.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspiration Chips */}
      <section className="mt-24 pt-12 border-t border-outline-variant/10">
        <h3 className="text-[10px] tracking-[0.4em] uppercase text-on-surface-variant mb-6">最近策展</h3>
        <div className="flex flex-wrap gap-4">
          {['天体几何', '控制论绿洲', '沉默建筑', '流体动力学', '大气散射'].map((chip, i) => (
            <div key={i} onClick={() => onInitiate(chip)} className="bg-surface-container-high rounded-full px-5 py-2 border border-outline-variant/15 flex items-center group cursor-pointer hover:bg-surface-container-highest transition-colors">
              <span className={`w-1.5 h-1.5 rounded-full mr-3 ${i % 2 === 0 ? 'bg-primary group-hover:shadow-[0_0_8px_#6FEEE1]' : 'bg-secondary group-hover:shadow-[0_0_8px_#D2BBFF]'}`}></span>
              <span className="text-sm font-medium">{chip}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
