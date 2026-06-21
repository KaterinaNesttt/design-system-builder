import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Colors = {
  // Глобальні
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textMuted: string;
  border: string;

  // Бічна панель
  sidebarBg: string;
  sidebarText: string;
  sidebarActiveBg: string;
  sidebarActiveText: string;

  // Картки
  cardBg: string;
  cardText: string;
  cardBorder: string;

  // Бейджі
  badgeSuccessBg: string;
  badgeSuccessText: string;
  badgeWarningBg: string;
  badgeWarningText: string;
  badgeInfoBg: string;
  badgeInfoText: string;
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
    // Глобальні
    primary: '#469da0',
    secondary: '#162128',
    background: '#02050d',
    text: '#e3ded2',
    textMuted: '#a8a59e',
    border: '#3d3d3d',

    // Бічна панель
    sidebarBg: '#050a14',
    sidebarText: '#a8a59e',
    sidebarActiveBg: '#469da0',
    sidebarActiveText: '#ffffff',

    // Картки
    cardBg: '#121c21',
    cardText: '#e3ded2',
    cardBorder: '#3d3d3d',

    // Бейджі
    badgeSuccessBg: '#1e4d3b',
    badgeSuccessText: '#7ee2b8',
    badgeWarningBg: '#664d00',
    badgeWarningText: '#ffd666',
    badgeInfoBg: '#422c5e',
    badgeInfoText: '#d1b3ff',
  },
  typography: {
    fontFamily: '-apple-system, "SF Pro Text", "TT Norms Pro", system-ui, sans-serif',
    baseSize: 16,
  },
  borders: {
    radius: 0.85, // rem
    width: 1, // px
  },
  effects: {
    shadowOpacity: 10,
    shadowSize: 'md',
    glassOpacity: 80,
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
      name: 'design-system-storage-v3',
    }
  )
);
