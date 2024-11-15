import { create } from 'zustand'

interface HideAmountState {
    isAmountVisible: boolean;
    toggleVisibility: () => void;
}

export const useHideAmountStore = create<HideAmountState>((set) => ({
    isAmountVisible: false,
    toggleVisibility: () => set((state) => ({ isAmountVisible: !state.isAmountVisible }))
}))