import { useDesignStore } from '../store/useDesignStore';
import { Download, Wand2, Settings2, Trash2 } from 'lucide-react';
import { exportDesignSystem } from '../utils/export';

export function Header() {
  const reset = useDesignStore((state) => state.reset);
  const state = useDesignStore();

  const handleExport = async () => {
    await exportDesignSystem(state);
  };

  const handleGeminiPrompts = () => {
    // Generate Prompt for Gemini
    const colors = state.colors;
    const prompt = `Act as an expert UI/UX designer. I am building a web app with the following color palette:
Primary: ${colors.primary}
Secondary: ${colors.secondary}
Accent: ${colors.accent}
Background: ${colors.background}
Text: ${colors.text}

Please generate:
1. 3 detailed prompts for image generation AI (like Gemini/Midjourney) to create abstract background textures that perfectly match this color scheme.
2. A list of 3 complementary UI features (e.g. glassmorphism, flat design, brutalism) that fit this aesthetic.
3. 2 concepts for how the hero section of a landing page could look with these colors.`;

    alert("Prompt copied to clipboard:\n\n" + prompt.substring(0, 100) + "...");
    navigator.clipboard.writeText(prompt);
  };

  return (
    <header className="h-16 border-b border-[var(--color-border-main)] bg-[var(--color-surface)]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white">
          <Settings2 size={18} />
        </div>
        <h1 className="font-bold text-lg tracking-tight">Design System Builder</h1>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={reset}
          className="p-2 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 transition-colors rounded-[var(--radius-md)] flex items-center gap-2 text-sm font-medium"
          title="Reset to defaults"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Reset</span>
        </button>
        <button 
          onClick={handleGeminiPrompts}
          className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border-main)] hover:border-[var(--color-accent)] text-[var(--color-text-main)] transition-colors rounded-[var(--radius-md)] flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Wand2 size={16} className="text-[var(--color-accent)]" />
          <span className="hidden sm:inline">Gemini Prompts</span>
        </button>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-[var(--color-primary)] hover:opacity-90 text-white transition-opacity rounded-[var(--radius-md)] flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md shadow-[var(--color-primary)]/20"
        >
          <Download size={16} />
          <span>Export .ZIP</span>
        </button>
      </div>
    </header>
  );
}
