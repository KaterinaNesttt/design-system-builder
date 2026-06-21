import { useEffect } from 'react';
import { useDesignStore } from '../store/useDesignStore';

export function StyleInjector() {
  const { colors, typography, borders, effects } = useDesignStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-text-main', colors.text);
    root.style.setProperty('--color-text-muted', colors.textMuted);
    root.style.setProperty('--color-border-main', colors.border);
    
    // Бічна панель
    root.style.setProperty('--color-sidebar-bg', colors.sidebarBg);
    root.style.setProperty('--color-sidebar-text', colors.sidebarText);
    root.style.setProperty('--color-sidebar-active-bg', colors.sidebarActiveBg);
    root.style.setProperty('--color-sidebar-active-text', colors.sidebarActiveText);

    // Картки
    root.style.setProperty('--color-card-bg', colors.cardBg);
    root.style.setProperty('--color-card-text', colors.cardText);
    root.style.setProperty('--color-card-border', colors.cardBorder);

    // Бейджі
    root.style.setProperty('--color-badge-success-bg', colors.badgeSuccessBg);
    root.style.setProperty('--color-badge-success-text', colors.badgeSuccessText);
    root.style.setProperty('--color-badge-warning-bg', colors.badgeWarningBg);
    root.style.setProperty('--color-badge-warning-text', colors.badgeWarningText);
    root.style.setProperty('--color-badge-info-bg', colors.badgeInfoBg);
    root.style.setProperty('--color-badge-info-text', colors.badgeInfoText);
    
    root.style.setProperty('--border-width-main', `${borders.width}px`);
    root.style.setProperty('--radius', `${borders.radius}rem`);
    
    root.style.setProperty('--font-family', typography.fontFamily);
    root.style.setProperty('--font-base-size', `${typography.baseSize}px`);
    
    root.style.setProperty('--glass-opacity', `${effects.glassOpacity}%`);
  }, [colors, typography, borders, effects]);

  return null;
}
