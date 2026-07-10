import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AccentColor = 'blue' | 'green' | 'purple' | 'orange';
export type TextSize = 'normal' | 'large';
export type ProjectsView = 'grid' | 'list';

interface SettingsState {
  accentColor: AccentColor;
  reducedMotion: boolean;
  textSize: TextSize;
  projectsView: ProjectsView;
  
  setAccentColor: (color: AccentColor) => void;
  setReducedMotion: (value: boolean) => void;
  setTextSize: (size: TextSize) => void;
  setProjectsView: (view: ProjectsView) => void;
  resetSettings: () => void;
}

const initialState = {
  accentColor: 'blue' as AccentColor,
  reducedMotion: false,
  textSize: 'normal' as TextSize,
  projectsView: 'grid' as ProjectsView,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setAccentColor: (color) => set({ accentColor: color }),
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
