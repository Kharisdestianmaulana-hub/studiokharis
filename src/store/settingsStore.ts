import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AccentColor = 'blue' | 'green' | 'purple' | 'custom';
export type TextSize = 'normal' | 'large';
export type ProjectsView = 'grid' | 'list';

interface SettingsState {
  accentColor: AccentColor;
  customColor: string; // The hex code for the custom color
  reducedMotion: boolean;
  textSize: TextSize;
  projectsView: ProjectsView;
  
  setAccentColor: (color: AccentColor) => void;
  setCustomColor: (color: string) => void;
  setReducedMotion: (value: boolean) => void;
  setTextSize: (size: TextSize) => void;
  setProjectsView: (view: ProjectsView) => void;
  resetSettings: () => void;
}

const initialState = {
  accentColor: 'blue' as AccentColor,
  customColor: '#EA580C', // Default orange
  reducedMotion: false,
  textSize: 'normal' as TextSize,
  projectsView: 'grid' as ProjectsView,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setAccentColor: (color) => set({ accentColor: color }),
      setCustomColor: (color) => set({ customColor: color, accentColor: 'custom' }),
      setReducedMotion: (value) => set({ reducedMotion: value }),
      setTextSize: (size) => set({ textSize: size }),
      setProjectsView: (view) => set({ projectsView: view }),
      resetSettings: () => set(initialState),
    }),
    {
      name: 'studiokharis-settings', // key in local storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
