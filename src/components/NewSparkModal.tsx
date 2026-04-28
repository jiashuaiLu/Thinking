import { X, Zap, ArrowRight, Tag as TagIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NewSparkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSparkModal({ isOpen, onClose }: NewSparkModalProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setNotes('');
      setTags([]);
      setTagInput('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleManifest = () => {
    // In a real app, this would save the spark to a database/state
    console.log('Manifesting Spark:', { title, notes, tags });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-surface-container-low/90 backdrop-blur-3xl border border-outline-variant/20 rounded-3xl p-8 shadow-[0_0_80px_rgba(111,238,225,0.1)] animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-on-surface">点燃火花</h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60">捕捉短暂的思绪</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <input 
              type="text" 
              placeholder="核心概念是什么？" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-all text-on-surface text-xl font-light placeholder:text-on-surface-variant/40"
              autoFocus
            />
          </div>

          <div>
            <textarea 
              placeholder="展开这个想法..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-xl p-4 focus:outline-none focus:border-primary/50 transition-all text-on-surface text-sm min-h-[120px] resize-none placeholder:text-on-surface-variant/40 custom-scrollbar"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <TagIcon className="w-4 h-4 text-on-surface-variant" />
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">标签</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] uppercase tracking-widest text-on-surface border border-outline-variant/20 flex items-center gap-2 group">
                  {tag}
                  <button 
                    onClick={() => handleRemoveTag(tag)} 
                    className="text-on-surface-variant group-hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <input 
              type="text" 
              placeholder="添加标签并按回车键..." 
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full bg-transparent border-b border-outline-variant/30 py-2 focus:outline-none focus:border-secondary/50 transition-all text-on-surface text-sm placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button 
            onClick={handleManifest}
            disabled={!title.trim()}
            className="group flex items-center px-8 py-4 bg-primary text-on-primary rounded-full font-bold tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(111,238,225,0.3)] hover:shadow-[0_0_30px_rgba(111,238,225,0.5)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-[0_0_20px_rgba(111,238,225,0.3)] disabled:cursor-not-allowed"
          >
            具象化
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
