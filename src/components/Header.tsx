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
    const prompt = `Виступай в ролі експерта з UI/UX дизайну. Я створюю веб-додаток з такою палітрою кольорів:
Primary: ${colors.primary}
Secondary: ${colors.secondary}
Accent: ${colors.accent}
Background: ${colors.background}
Text: ${colors.text}

Будь ласка, згенеруй:
1. 3 детальні промпти для ШІ-генераторів зображень (наприклад, Gemini/Midjourney), щоб створити абстрактні фонові текстури, які ідеально підходять до цієї колірної схеми.
2. Список з 3 додаткових стилів UI (наприклад, glassmorphism, flat design, brutalism), які відповідають цій естетиці.
3. 2 концепти того, як може виглядати hero-секція лендінгу з цими кольорами.`;

    alert("Промпт скопійовано в буфер обміну:\n\n" + prompt.substring(0, 100) + "...");
    navigator.clipboard.writeText(prompt);
  };

  return (
    <header className="h-16 border-b border-[var(--color-border-main)] glass-panel flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white">
          <Settings2 size={18} />
        </div>
        <h1 className="font-bold text-lg tracking-tight">Конструктор дизайн-системи</h1>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={reset}
          className="p-2 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 transition-colors rounded-[var(--radius-md)] flex items-center gap-2 text-sm font-medium"
          title="Скинути до стандартних"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Скинути</span>
        </button>
        <button 
          onClick={handleGeminiPrompts}
          className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border-main)] hover:border-[var(--color-accent)] text-[var(--color-text-main)] transition-colors rounded-[var(--radius-md)] flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Wand2 size={16} className="text-[var(--color-accent)]" />
          <span className="hidden sm:inline">Промпти Gemini</span>
        </button>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-[var(--color-primary)] hover:opacity-90 text-white transition-opacity rounded-[var(--radius-md)] flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md shadow-[var(--color-primary)]/20"
        >
          <Download size={16} />
          <span>Експорт .ZIP</span>
        </button>
      </div>
    </header>
  );
}
