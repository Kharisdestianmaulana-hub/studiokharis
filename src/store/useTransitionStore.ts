import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TransitionState {
  previousPath: string;
  transitionTitle: string;
  pendingRoute: string | null;
  setPreviousPath: (path: string) => void;
  setTransitionTitle: (title: string) => void;
  setPendingRoute: (route: string | null) => void;
}

export const useTransitionStore = create<TransitionState>()(
  persist(
    (set) => ({
      previousPath: "/",
      transitionTitle: "",
      pendingRoute: null,
      setPreviousPath: (path) => set({ previousPath: path }),
      setTransitionTitle: (title) => set({ transitionTitle: title }),
      setPendingRoute: (route) => set({ pendingRoute: route }),
    }),
    {
      name: 'transition-storage',
    }
  )
);
