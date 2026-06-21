import { useEffect } from 'react';
import { useDesignStore } from '../store/useDesignStore';

export function StyleInjector() {
  const { colors, typography, borders, effects } = useDesignStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text-main', colors.text);
    root.style.setProperty('--color-text-muted', colors.textMuted);
    root.style.setProperty('--color-border-main', colors.border);
    
    root.style.setProperty('--radius', `${borders.radius}rem`);
    root.style.setProperty('--font-family', typography.fontFamily);
    
    root.style.setProperty('--glass-opacity', `${effects.glassOpacity}%`);
    root.style.setProperty('--glass-blur', `${effects.glassBlur}px`);
  }, [colors, typography, borders, effects]);

  return null;
}
