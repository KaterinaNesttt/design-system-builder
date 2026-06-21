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
  glassOpacity: number;
  glassBlur: number;
};

export type DesignState = {
  colors: Colors;
  typography: Typography;
  borders: Borders;
  effects: Effects;
  backgroundImage: string | null;
};

export type DesignStore = DesignState & {
  updateColor: (key: keyof Colors, value: string) => void;
  updateTypography: <K extends keyof Typography>(key: K, value: Typography[K]) => void;
  updateBorder: (key: keyof Borders, value: number) => void;
  updateEffect: <K extends keyof Effects>(key: K, value: Effects[K]) => void;
  updateBackgroundImage: (url: string | null) => void;
  reset: () => void;
};

const defaultState: DesignState = {
  colors: {
    primary: '#469da0', // iOS 26 Primary
    secondary: '#162128', // iOS 26 Secondary
    accent: '#275859', // iOS 26 Accent
    background: '#02050d', // iOS 26 Background
    surface: '#121c21', // iOS 26 Card
    text: '#e3ded2', // iOS 26 Foreground
    textMuted: '#a8a59e', // iOS 26 Muted Foreground
    border: '#3d3d3d', // iOS 26 Border
  },
  typography: {
    fontFamily: '-apple-system, "SF Pro Text", "TT Norms Pro", system-ui, sans-serif',
    baseSize: 16,
  },
  borders: {
    radius: 1.125, // rem
    width: 1, // px
  },
  effects: {
    shadowOpacity: 10,
    shadowSize: 'md',
    glassOpacity: 80,
    glassBlur: 12,
  },
  backgroundImage: null,
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
      updateBackgroundImage: (value) =>
        set(() => ({ backgroundImage: value })),
      reset: () => set(defaultState),
    }),
    {
      name: 'design-system-storage-v2',
    }
  )
);
