import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Colors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
};

export type Typography = {
  fontFamily: string;
  baseSize: number;
};

export type Borders = {
  radius: number;
  width: number;
};

export type Effects = {
  shadowOpacity: number;
  shadowSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
};

export type DesignState = {
  colors: Colors;
  typography: Typography;
  borders: Borders;
  effects: Effects;
};

export type DesignStore = DesignState & {
  updateColor: (key: keyof Colors, value: string) => void;
  updateTypography: (key: keyof Typography, value: any) => void;
  updateBorder: (key: keyof Borders, value: number) => void;
  updateEffect: (key: keyof Effects, value: any) => void;
  reset: () => void;
};

const defaultState: DesignState = {
  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#10b981', // emerald-500
    accent: '#8b5cf6', // violet-500
    background: '#f8fafc', // slate-50
    surface: '#ffffff', // white
    text: '#0f172a', // slate-900
    textMuted: '#64748b', // slate-500
    border: '#e2e8f0', // slate-200
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    baseSize: 16,
  },
  borders: {
    radius: 0.5, // rem
    width: 1, // px
  },
  effects: {
    shadowOpacity: 10,
    shadowSize: 'md',
  },
};

export const useDesignStore = create<DesignStore>()(
  persist(
    (set) => ({
      ...defaultState,
      updateColor: (key, value) =>
        set((state) => ({ colors: { ...state.colors, [key]: value } })),
      updateTypography: (key, value) =>
        set((state) => ({ typography: { ...state.typography, [key]: value } })),
      updateBorder: (key, value) =>
        set((state) => ({ borders: { ...state.borders, [key]: value } })),
      updateEffect: (key, value) =>
        set((state) => ({ effects: { ...state.effects, [key]: value } })),
      reset: () => set(defaultState),
    }),
    {
      name: 'design-system-storage',
    }
  )
);
