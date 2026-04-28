import { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Minus, Sparkles, RefreshCw, Loader2, X } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';
import { generateRelatedConcepts, ConceptNode } from '../services/ai';

interface CanvasViewProps {
  initialSeed?: string | null;
}

interface GraphData {
  nodes: any[];
  links: any[];
}

export default function CanvasView({ initialSeed }: CanvasViewProps) {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<ConceptNode[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

  // Graph physics and layout optimization
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-600).distanceMax(500);
      graphRef.current.d3Force('link').distance(100);
    }
  }, [graphData]);

  // Tooltip position tracking loop
  useEffect(() => {
    if (!selectedNode || !tooltipVisible) return;
    let rafId: number;
    const updatePos = () => {
      if (graphRef.current && tooltipRef.current && selectedNode && selectedNode.x !== undefined) {
        const coords = graphRef.current.graph2ScreenCoords(selectedNode.x, selectedNode.y);
        tooltipRef.current.style.transform = `translate(${coords.x}px, ${coords.y}px)`;
      }
      rafId = requestAnimationFrame(updatePos);
    };
    rafId = requestAnimationFrame(updatePos);
    return () => cancelAnimationFrame(rafId);
  }, [selectedNode, tooltipVisible]);

  // Compute highlights for directly connected nodes and links
  useEffect(() => {
    const hNodes = new Set();
    const hLinks = new Set();
    if (selectedNode) {
      hNodes.add(selectedNode.id);
      graphData.links.forEach((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        if (sourceId === selectedNode.id || targetId === selectedNode.id) {
          hLinks.add(link);
          hNodes.add(sourceId);
          hNodes.add(targetId);
        }
      });
    }
    setHighlightNodes(hNodes);
    setHighlightLinks(hLinks);
  }, [selectedNode, graphData.links]);

  // Initialize graph with seed
  useEffect(() => {
    const seed = initialSeed || 'Bioluminescence';
    const rootNode = { id: 'root', label: seed, type: 'core', val: 20 };
    
    setGraphData({
      nodes: [rootNode],
      links: []
    });
    setSelectedNode(rootNode);
    generateSuggestions(seed);
    
    // Center graph after a short delay to allow rendering
    setTimeout(() => {
      if (graphRef.current) {
        graphRef.current.centerAt(0, 0, 1000);
        graphRef.current.zoom(1.5, 1000);
      }
    }, 500);
  }, [initialSeed]);

  const generateSuggestions = async (concept: string, intent: string = '综合发散') => {
    setIsGenerating(true);
    const concepts = await generateRelatedConcepts(concept, intent);
    setAiSuggestions(concepts);
    setIsGenerating(false);
  };

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node);
    setActiveIntent(null);
    setAiSuggestions([]);
    setTooltipVisible(true);
    
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
    }
  }, []);

  const handleManifestIdea = (suggestion: ConceptNode) => {
    if (!selectedNode) return;

    // Generate a unique ID to allow multiple nodes with same concept if needed
    const uniqueId = `${suggestion.id}-${Date.now()}`;

    const newNode = {
      id: uniqueId,
      label: suggestion.label,
      description: suggestion.description,
      type: 'branch',
      val: 10
    };

    const newLink = {
      source: selectedNode.id,
      target: uniqueId,
      label: suggestion.direction || activeIntent || '关联'
    };

    setGraphData(prev => ({
      nodes: [...prev.nodes, newNode],
      links: [...prev.links, newLink]
    }));

    // Remove from suggestions
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestion.id));

    // Force layout update and fit to ensure no overlapping clips
    setTimeout(() => {
      if (graphRef.current) {
        graphRef.current.zoomToFit(800, 60);
      }
    }, 800);
  };

  const handleRegenerate = () => {
    if (selectedNode && activeIntent) {
      generateSuggestions(selectedNode.label, activeIntent);
    }
  };

  const handleIntentClick = (intent: string) => {
    if (!selectedNode) return;
    setActiveIntent(intent);
    generateSuggestions(selectedNode.label, intent);
  };

  // Custom node drawing
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.label;
    const isSelected = selectedNode?.id === node.id;
    const isHighlighted = highlightNodes.has(node.id);
    const hasSelection = selectedNode !== null;
    const fontSize = node.type === 'core' ? 16/globalScale : 12/globalScale;

    // Fade out unhighlighted nodes when there is a selection
    ctx.globalAlpha = hasSelection && !isHighlighted ? 0.2 : 1;

    ctx.font = `${isSelected ? 'bold ' : ''}${fontSize}px Inter`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 2); // padding

    // Background color
    ctx.fillStyle = node.type === 'core' 
      ? 'rgba(27, 27, 32, 0.9)' // surface-container-low
      : 'rgba(42, 41, 47, 0.8)'; // surface-container-high
    
    // Draw glow if selected or core
    if (isSelected || node.type === 'core') {
      ctx.shadowColor = node.type === 'core' ? 'rgba(111, 238, 225, 0.6)' : 'rgba(210, 187, 255, 0.4)';
      ctx.shadowBlur = 20 * globalScale;
    } else {
      ctx.shadowBlur = 0;
    }
    
    ctx.beginPath();
    // Use standard arc for rounded corners if roundRect is not available, but roundRect is standard now
    if (ctx.roundRect) {
      ctx.roundRect(
        node.x - bckgDimensions[0] / 2, 
        node.y - bckgDimensions[1] / 2, 
        bckgDimensions[0], 
        bckgDimensions[1], 
        8 / globalScale
      );
    } else {
      ctx.rect(
        node.x - bckgDimensions[0] / 2, 
        node.y - bckgDimensions[1] / 2, 
        bckgDimensions[0], 
        bckgDimensions[1]
      );
    }
    ctx.fill();
    
    // Border
    ctx.strokeStyle = isSelected 
      ? (node.type === 'core' ? '#6FEEE1' : '#D2BBFF')
      : (node.type === 'core' ? 'rgba(111, 238, 225, 0.4)' : 'rgba(134, 148, 145, 0.3)');
    ctx.lineWidth = (isSelected ? 2 : 1) / globalScale;
    ctx.stroke();

    // Reset shadow for text
    ctx.shadowBlur = 0;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = node.type === 'core' ? '#6FEEE1' : '#e4e1e9';
    ctx.fillText(label, node.x, node.y);

    // Reset alpha for rest of canvas elements
    ctx.globalAlpha = 1;

    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
  }, [selectedNode, highlightNodes]);

  const nodePointerAreaPaint = useCallback((node: any, color: string, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = color;
    const bckgDimensions = node.__bckgDimensions;
    bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
  }, []);

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full bg-background overflow-hidden canvas-grid flex">
      
      {/* Graph Container */}
      <div className="flex-1 relative" ref={containerRef}>
        {tooltipVisible && selectedNode && (
          <div
            ref={tooltipRef}
            className="absolute z-50 p-4 bg-surface-container-highest/95 backdrop-blur-xl border border-primary/30 rounded-xl shadow-[0_0_30px_rgba(111,238,225,0.15)] max-w-[240px] pointer-events-auto transform -translate-x-1/2 translate-y-6"
            style={{ top: 0, left: 0 }}
          >
            <div className="flex justify-between items-start mb-2 gap-4">
              <h4 className="font-bold text-sm text-primary">{selectedNode.label}</h4>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setTooltipVisible(false);
                }} 
                className="text-on-surface-variant hover:text-on-surface transition-colors mt-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[0.7rem] text-on-surface-variant/90 leading-relaxed font-body">
              {selectedNode.description || '基础起点概念，由此产生无限可能的分支体系。'}
            </p>
          </div>
        )}
        <ForceGraph2D
          ref={graphRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeCanvasObject={paintNode}
          nodePointerAreaPaint={nodePointerAreaPaint}
          onNodeClick={handleNodeClick}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          linkLabel="label"
          linkCanvasObjectMode={() => 'after'}
          linkCanvasObject={(link: any, ctx, globalScale) => {
            if (!link.label) return;
            const hasSelection = selectedNode !== null;
            const isHighlighted = highlightLinks.has(link);
            if (hasSelection && !isHighlighted) return;

            const start = link.source;
            const end = link.target;
            // ignore unbound links
            if (typeof start !== 'object' || typeof end !== 'object') return;
            // Draw text
            const textPos = {
              x: start.x + (end.x - start.x) / 2, // middle
              y: start.y + (end.y - start.y) / 2
            };
            const fontSize = 10 / globalScale;
            ctx.font = `${fontSize}px Inter`;
            ctx.fillStyle = 'rgba(210, 187, 255, 0.8)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Backing rect
            const textWidth = ctx.measureText(link.label).width;
            ctx.fillStyle = 'rgba(27, 27, 32, 0.9)';
            if (ctx.roundRect) {
              ctx.roundRect(textPos.x - textWidth/2 - 2/globalScale, textPos.y - fontSize/2 - 2/globalScale, textWidth + 4/globalScale, fontSize + 4/globalScale, 2/globalScale);
              ctx.fill();
            }
            ctx.fillStyle = 'rgba(210, 187, 255, 0.9)';
            ctx.fillText(link.label, textPos.x, textPos.y);
          }}
          linkColor={(link) => {
            if (selectedNode) {
              return highlightLinks.has(link) ? 'rgba(111, 238, 225, 0.8)' : 'rgba(111, 238, 225, 0.05)';
            }
            return 'rgba(111, 238, 225, 0.3)';
          }}
          linkWidth={(link) => highlightLinks.has(link) ? 3 : 1.5}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={1.5}
          linkDirectionalParticleColor={() => '#D2BBFF'}
          d3VelocityDecay={0.3}
          cooldownTicks={100}
        />

        {/* Floating Canvas Controls */}
        <div className="absolute bottom-8 left-8 flex gap-3 z-30">
          <div className="flex items-center gap-2 bg-surface-container-high/60 backdrop-blur-xl p-2 rounded-full border border-outline-variant/20 shadow-2xl">
            <button 
              onClick={() => graphRef.current?.zoom(graphRef.current.zoom() * 1.2, 400)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-highest transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
            <div className="w-px h-4 bg-outline-variant/30"></div>
            <button 
              onClick={() => graphRef.current?.zoom(graphRef.current.zoom() / 1.2, 400)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-highest transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="w-px h-4 bg-outline-variant/30"></div>
            <button 
              onClick={() => {
                graphRef.current?.centerAt(0, 0, 1000);
                graphRef.current?.zoom(1.5, 1000);
              }}
              className="px-4 h-10 flex items-center justify-center rounded-full text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-highest transition-colors"
            >
              重置视图
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Panel: AI Co-Pilot */}
      <aside className="w-80 bg-surface-container-low/80 backdrop-blur-3xl border-l border-outline-variant/20 z-40 flex flex-col h-full shadow-[-20px_0_40px_rgba(0,0,0,0.2)]">
        <div className="px-8 py-6 border-b border-outline-variant/10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline text-xl text-on-surface">思维导航</h2>
            <Sparkles className="text-secondary w-5 h-5" />
          </div>
          <p className="text-[0.7rem] font-label text-on-surface-variant uppercase tracking-widest">探索方向</p>
          
          {selectedNode && (
            <div className="mt-4 flex flex-col gap-2 bg-surface-container-high px-4 py-3 rounded-xl border border-primary/20">
              <div className="flex items-center gap-2">
                <span className="text-[0.6rem] font-bold text-primary uppercase tracking-tighter">当前节点:</span>
                <span className="text-sm font-medium text-on-surface truncate">{selectedNode.label}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar relative">
          {!selectedNode ? (
            <div className="text-center text-on-surface-variant/50 mt-10">
              <p className="text-sm">点击画布中的节点以揭示发散方向。</p>
            </div>
          ) : !activeIntent && !isGenerating ? (
            <div className="space-y-4">
              <p className="text-xs text-on-surface-variant mb-4">选择一个扩张意图：</p>
              {[
                { label: '解决什么问题', desc: '发现它能克服的痛点和挑战', color: 'primary' },
                { label: '用来创作什么', desc: '探索具体的艺术或产品应用', color: 'secondary' },
                { label: '底层运行逻辑', desc: '剥开表象，探究科学和哲学根基', color: 'tertiary-fixed' },
                { label: '跨界平替发散', desc: '寻找其他领域中完全不同但相似的概念', color: 'on-surface' }
              ].map((intent, i) => (
                <button 
                  key={i}
                  onClick={() => handleIntentClick(intent.label)}
                  className="w-full text-left p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container-high hover:border-primary/40 transition-all group"
                >
                  <h4 className={`text-sm font-bold text-${intent.color} mb-1 group-hover:tracking-wider transition-all`}>{intent.label}</h4>
                  <p className="text-[0.65rem] text-on-surface-variant/70">{intent.desc}</p>
                </button>
              ))}
            </div>
          ) : isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="text-xs uppercase tracking-widest animate-pulse">正在合成想法...</p>
            </div>
          ) : aiSuggestions.length > 0 ? (
            aiSuggestions.map((item, i) => (
              <div key={i} className="group relative bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/10 hover:border-secondary/30 transition-all">
                <div className="absolute -left-0 top-4 bottom-4 w-[2px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity rounded-r pointer-events-none"></div>
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-headline text-lg text-secondary">{item.label}</h5>
                  {item.direction && (
                    <span className="px-2 py-0.5 rounded text-[0.6rem] bg-surface-container-highest text-on-surface-variant border border-outline-variant/20 whitespace-nowrap ml-2">
                      {item.direction}
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant/80 leading-relaxed mb-4">{item.description}</p>
                <button 
                  onClick={() => handleManifestIdea(item)}
                  className="w-full py-2 px-4 rounded-lg bg-surface-container-highest border border-secondary/20 hover:border-secondary/50 text-secondary text-[0.7rem] font-bold uppercase tracking-widest hover:bg-secondary/10 transition-colors"
                >
                  具象化节点
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-on-surface-variant/50 mt-10">
              <button 
                onClick={() => {
                  setActiveIntent(null);
                  setAiSuggestions([]);
                }}
                className="px-4 py-2 text-xs border border-outline-variant/30 rounded-full hover:text-primary hover:border-primary/50 transition-colors"
              >
                ← 返回重选方向
              </button>
            </div>
          )}
        </div>

        {activeIntent && (
          <div className="p-6 bg-surface-container-low border-t border-outline-variant/10 mt-auto">
            <button 
              onClick={handleRegenerate}
              disabled={isGenerating || !selectedNode}
              className="flex items-center justify-center gap-2 w-full py-3 bg-surface-container-highest hover:bg-surface-container-high transition-colors rounded-xl border border-outline-variant/30 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-on-surface">重新发散</span>
            </button>
          </div>
        )}
      </aside>

      {/* Overlay Visual Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[20] overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
