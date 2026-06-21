import { StyleInjector } from './components/StyleInjector';
import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';
import { Header } from './components/Header';
import { useDesignStore } from './store/useDesignStore';

function App() {
  const backgroundImage = useDesignStore((state) => state.backgroundImage);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text-main)] transition-colors duration-300 font-sans">
      <StyleInjector />
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
          <PreviewArea />
        </main>
        
        {/* Background Decorative Pattern / Gradient Placeholder */}
        {!backgroundImage && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_50%)]" />
        )}
        {backgroundImage && (
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-cover bg-center bg-no-repeat transition-all duration-500" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
