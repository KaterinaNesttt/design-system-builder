import { useDesignStore } from '../store/useDesignStore';

export function Sidebar() {
  const { colors, typography, borders, updateColor, updateTypography, updateBorder } = useDesignStore();

  const colorEntries = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent', label: 'Accent' },
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface (Cards, Modals)' },
    { key: 'text', label: 'Main Text' },
    { key: 'textMuted', label: 'Muted Text' },
    { key: 'border', label: 'Borders & Dividers' },
  ] as const;

  const fontOptions = [
    { label: 'Inter (Sans)', value: '"Inter", system-ui, sans-serif' },
    { label: 'Roboto (Sans)', value: '"Roboto", system-ui, sans-serif' },
    { label: 'Outfit (Modern)', value: '"Outfit", system-ui, sans-serif' },
    { label: 'Playfair Display (Serif)', value: '"Playfair Display", serif' },
    { label: 'Fira Code (Mono)', value: '"Fira Code", monospace' },
  ];

  return (
    <aside className="w-80 h-full border-r border-[var(--color-border-main)] bg-[var(--color-surface)] flex flex-col z-30 shrink-0 shadow-lg shadow-black/5 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-text-main)]">Design Tokens</h2>
        
        <div className="space-y-8">
          {/* Colors Section */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Colors</h3>
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">
                  Font Family
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
            </div>
          </section>

          <hr className="border-[var(--color-border-main)]" />

          {/* Borders Section */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Shape & Borders</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-[var(--color-text-main)]">
                    Border Radius
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
            </div>
          </section>

        </div>
      </div>
    </aside>
  );
}
