import { create } from 'zustand';

interface TransitionPhaseState {
  seqPhase: number;
  setSeqPhase: (phase: number) => void;
}

export const useTransitionPhaseStore = create<TransitionPhaseState>((set) => ({
  seqPhase: 5,
  setSeqPhase: (phase) => set({ seqPhase: phase }),
}));
