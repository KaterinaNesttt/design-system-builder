import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { DesignState } from '../store/useDesignStore';

export async function exportDesignSystem(state: DesignState) {
  const zip = new JSZip();

  // 1. Generate index.css
  const cssContent = `
@import "tailwindcss";

@theme {
  --color-primary: ${state.colors.primary};
  --color-secondary: ${state.colors.secondary};
  --color-accent: ${state.colors.accent};
  --color-background: ${state.colors.background};
  --color-surface: ${state.colors.surface};
  --color-text-main: ${state.colors.text};
  --color-text-muted: ${state.colors.textMuted};
  --color-border-main: ${state.colors.border};
  
  --radius-sm: calc(${state.borders.radius}rem * 0.5);
  --radius-md: ${state.borders.radius}rem;
  --radius-lg: calc(${state.borders.radius}rem * 1.5);
  --radius-xl: calc(${state.borders.radius}rem * 2);
  --radius-full: 9999px;
  
  --font-sans: ${state.typography.fontFamily};
}

@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-text-main);
    font-family: var(--font-sans);
  }
}
`;

  zip.file('styles/index.css', cssContent.trim());

  // 2. Generate sample components
  const buttonComponent = `
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:opacity-90',
    secondary: 'bg-[var(--color-secondary)] text-white hover:opacity-90',
    outline: 'bg-transparent border border-[var(--color-border-main)] text-[var(--color-text-main)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
    ghost: 'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]',
  };

  return (
    <button 
      className={cn(
        'px-4 py-2 font-medium rounded-[var(--radius-md)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
`;

  zip.file('components/ui/Button.tsx', buttonComponent.trim());

  const cardComponent = `
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border-main)] bg-[var(--color-surface)] shadow-sm overflow-hidden',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-4 border-b border-[var(--color-border-main)]', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-4', className)} {...props} />;
}
`;
  zip.file('components/ui/Card.tsx', cardComponent.trim());

  // Generate instructions
  const readmeContent = `
# Експортована дизайн-система

Цей архів містить вашу налаштовану дизайн-систему, готову до використання в будь-якому проєкті React + Vite + Tailwind CSS v4.

## Встановлення

1. Скопіюйте файл \`styles/index.css\` у ваш проєкт.
2. Скопіюйте компоненти React з папки \`components/\` у директорію компонентів вашого проєкту.
3. Переконайтеся, що ви встановили \`lucide-react\`, \`clsx\` та \`tailwind-merge\`, якщо ви використовуєте готові компоненти.

\`\`\`bash
npm install lucide-react clsx tailwind-merge
\`\`\`

## Використання

Ваша дизайн-система використовує нативні CSS змінні, визначені в \`index.css\` і зіставлені через директиву \`@theme\` в Tailwind v4.
Це означає, що ви можете просто використовувати стандартні утилітарні класи Tailwind, такі як \`bg-primary\`, \`text-accent\`, \`rounded-md\` тощо, і вони автоматично будуть відповідати вашій дизайн-системі!
`;
  zip.file('README.md', readmeContent.trim());

  // Generate the archive
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'design-system.zip');
}
