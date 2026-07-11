import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoryState {
  hasChosen: boolean;
  isStoryMode: boolean;
  currentChapter: string;
  currentStep: number;
  previousPath: string;
  transitionTitle: string;
  pendingRoute: string | null;
  setHasChosen: (val: boolean) => void;
  setIsStoryMode: (val: boolean) => void;
  setCurrentChapter: (chapterId: string) => void;
  setPreviousPath: (path: string) => void;
  setTransitionTitle: (title: string) => void;
  setPendingRoute: (route: string | null) => void;
  nextStep: () => void;
  setStep: (step: number) => void;
  resetStory: () => void;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      hasChosen: false,
      isStoryMode: false,
      currentChapter: "/",
      currentStep: 0,
      previousPath: "/",
      transitionTitle: "",
      pendingRoute: null,
      setHasChosen: (val) => set({ hasChosen: val }),
      setIsStoryMode: (val) => set({ isStoryMode: val }),
      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId, currentStep: 0 }),
      setPreviousPath: (path) => set({ previousPath: path }),
      setTransitionTitle: (title) => set({ transitionTitle: title }),
      setPendingRoute: (route) => set({ pendingRoute: route }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      setStep: (step) => set({ currentStep: step }),
      resetStory: () => set({ isStoryMode: false, currentStep: 0 }),
    }),
    {
      name: 'story-mode-storage',
    }
  )
);
