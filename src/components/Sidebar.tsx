import { useDesignStore } from '../store/useDesignStore';
import bg1 from '../assets/Abstract_minimalist_architectural_background,_premium_202606202338.jpeg';
import bg2 from '../assets/Abstract_minimalist_architectural_background,_premium_202606202339.jpeg';
import bg3 from '../assets/Abstract_minimalist_architectural_background,_premium_202606202339 (1).jpeg';

export function Sidebar() {
  const { colors, typography, borders, effects, backgroundImage, updateColor, updateTypography, updateBorder, updateEffect, updateBackgroundImage } = useDesignStore();

  const colorEntries = [
    { key: 'primary', label: 'Основний' },
    { key: 'secondary', label: 'Вторинний' },
    { key: 'accent', label: 'Акцентний' },
    { key: 'background', label: 'Фон' },
    { key: 'surface', label: 'Поверхня (Картки, Модальні вікна)' },
    { key: 'text', label: 'Основний текст' },
    { key: 'textMuted', label: 'Приглушений текст' },
    { key: 'border', label: 'Межі та роздільники' },
  ] as const;

  const fontOptions = [
    { label: 'Inter (Sans)', value: '"Inter", system-ui, sans-serif' },
    { label: 'Roboto (Sans)', value: '"Roboto", system-ui, sans-serif' },
    { label: 'Outfit (Modern)', value: '"Outfit", system-ui, sans-serif' },
    { label: 'Playfair Display (Serif)', value: '"Playfair Display", serif' },
    { label: 'Fira Code (Mono)', value: '"Fira Code", monospace' },
  ];

  return (
    <aside className="w-80 h-full border-r border-[var(--color-border-main)] glass-panel flex flex-col z-30 shrink-0 shadow-lg shadow-black/5 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-text-main)]">Дизайн-токени</h2>
        
        <div className="space-y-8">
          {/* Colors Section */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Кольори</h3>
            <div className="space-y-3">
              {colorEntries.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <label htmlFor={`color-${key}`} className="text-sm font-medium text-[var(--color-text-main)] cursor-pointer">
                    {label}
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-[var(--color-text-muted)] uppercase w-16 text-right">
                      {colors[key]}
                    </div>
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--color-border-main)] shadow-sm">
                      <input
                        id={`color-${key}`}
                        type="color"
                        value={colors[key]}
                        onChange={(e) => updateColor(key, e.target.value)}
                        className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-[var(--color-border-main)]" />

          {/* Typography Section */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Типографіка</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">
                  Шрифт
                </label>
                <select
                  value={typography.fontFamily}
                  onChange={(e) => updateTypography('fontFamily', e.target.value)}
                  className="w-full p-2 text-sm bg-[var(--color-background)] border border-[var(--color-border-main)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-main)] transition-shadow"
                >
                  {fontOptions.map(font => (
                    <option key={font.value} value={font.value}>{font.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-[var(--color-text-main)]">
                    Базовий розмір шрифту
                  </label>
                  <span className="text-xs text-[var(--color-text-muted)]">{typography.baseSize}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="24"
                  step="1"
                  value={typography.baseSize}
                  onChange={(e) => updateTypography('baseSize', parseInt(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
            </div>
          </section>

          <hr className="border-[var(--color-border-main)]" />

          {/* Borders Section */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Форма та межі</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-[var(--color-text-main)]">
                    Радіус скруглення
                  </label>
                  <span className="text-xs text-[var(--color-text-muted)]">{borders.radius}rem</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={borders.radius}
                  onChange={(e) => updateBorder('radius', parseFloat(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-[var(--color-text-main)]">
                    Товщина межі
                  </label>
                  <span className="text-xs text-[var(--color-text-muted)]">{borders.width}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={borders.width}
                  onChange={(e) => updateBorder('width', parseInt(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
            </div>
          </section>

          <hr className="border-[var(--color-border-main)]" />

          {/* Effects Section */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Ефекти</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-[var(--color-text-main)]">
                    Прозорість тіні
                  </label>
                  <span className="text-xs text-[var(--color-text-muted)]">{effects.shadowOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={effects.shadowOpacity}
                  onChange={(e) => updateEffect('shadowOpacity', parseInt(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-[var(--color-text-main)]">
                    Прозорість фону (скло)
                  </label>
                  <span className="text-xs text-[var(--color-text-muted)]">{effects.glassOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={effects.glassOpacity}
                  onChange={(e) => updateEffect('glassOpacity', parseInt(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-[var(--color-text-main)]">
                    Розмиття фону (скло)
                  </label>
                  <span className="text-xs text-[var(--color-text-muted)]">{effects.glassBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={effects.glassBlur}
                  onChange={(e) => updateEffect('glassBlur', parseInt(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">
                  Розмір тіні
                </label>
                <select
                  value={effects.shadowSize}
                  onChange={(e) => updateEffect('shadowSize', e.target.value as typeof effects.shadowSize)}
                  className="w-full p-2 text-sm bg-[var(--color-background)] border border-[var(--color-border-main)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-main)] transition-shadow"
                >
                  <option value="none">Без тіні</option>
                  <option value="sm">Мала (sm)</option>
                  <option value="md">Середня (md)</option>
                  <option value="lg">Велика (lg)</option>
                  <option value="xl">Дуже велика (xl)</option>
                  <option value="2xl">Максимальна (2xl)</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="border-[var(--color-border-main)]" />

          {/* Background Image Section */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Фонове зображення</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateBackgroundImage(null)}
                className={`h-16 rounded-[var(--radius-sm)] border-2 ${backgroundImage === null ? 'border-[var(--color-primary)]' : 'border-[var(--color-border-main)] hover:border-[var(--color-text-muted)]'} bg-[var(--color-background)] flex items-center justify-center text-xs font-medium text-[var(--color-text-main)] transition-colors`}
              >
                Без фону
              </button>
              <button
                onClick={() => updateBackgroundImage(bg1)}
                className={`h-16 rounded-[var(--radius-sm)] border-2 ${backgroundImage === bg1 ? 'border-[var(--color-primary)]' : 'border-transparent hover:border-[var(--color-text-muted)]'} bg-cover bg-center transition-all`}
                style={{ backgroundImage: `url(${bg1})` }}
              />
              <button
                onClick={() => updateBackgroundImage(bg2)}
                className={`h-16 rounded-[var(--radius-sm)] border-2 ${backgroundImage === bg2 ? 'border-[var(--color-primary)]' : 'border-transparent hover:border-[var(--color-text-muted)]'} bg-cover bg-center transition-all`}
                style={{ backgroundImage: `url(${bg2})` }}
              />
              <button
                onClick={() => updateBackgroundImage(bg3)}
                className={`h-16 rounded-[var(--radius-sm)] border-2 ${backgroundImage === bg3 ? 'border-[var(--color-primary)]' : 'border-transparent hover:border-[var(--color-text-muted)]'} bg-cover bg-center transition-all`}
                style={{ backgroundImage: `url(${bg3})` }}
              />
            </div>
          </section>

        </div>
      </div>
    </aside>
  );
}
