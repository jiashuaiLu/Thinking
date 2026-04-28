import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import HubView from './views/HubView';
import LabView from './views/LabView';
import ArchiveView from './views/ArchiveView';
import CanvasView from './views/CanvasView';
import NewSparkModal from './components/NewSparkModal';

export type ViewType = 'hub' | 'canvas' | 'lab' | 'archive';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('hub');
  const [isNewSparkModalOpen, setIsNewSparkModalOpen] = useState(false);
  const [activeSeed, setActiveSeed] = useState<string | null>(null);

  const handleInitiateSynthesis = (seed: string) => {
    setActiveSeed(seed);
    setCurrentView('canvas');
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary custom-scrollbar flex">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onOpenNewSpark={() => setIsNewSparkModalOpen(true)}
      />
      
      <div className="flex-1 flex flex-col relative">
        <TopNav currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 lg:ml-72 pt-20 min-h-screen">
          {currentView === 'hub' && <HubView onViewChange={setCurrentView} onInitiate={handleInitiateSynthesis} />}
          {currentView === 'lab' && <LabView onInitiate={handleInitiateSynthesis} onViewChange={setCurrentView} />}
          {currentView === 'archive' && <ArchiveView onViewChange={setCurrentView} onInitiate={handleInitiateSynthesis} />}
          {currentView === 'canvas' && <CanvasView initialSeed={activeSeed} />}
        </main>
      </div>

      <NewSparkModal 
        isOpen={isNewSparkModalOpen} 
        onClose={() => setIsNewSparkModalOpen(false)} 
      />
    </div>
  );
}
