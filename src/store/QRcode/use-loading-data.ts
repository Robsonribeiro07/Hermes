import { create } from 'zustand'

interface IloadingData {
  text: string
  open: boolean
  setText: (newText: string) => void
  setOpen: () => void
  setClose: () => void
  resetText: () => void
}

export const useLoadingStore = create<IloadingData>((set) => ({
  text: 'aguarde...',
  open: false,
  setText: (newText: string) => set({ text: newText }),
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
  resetText: () => set({ text: 'aguarde...' }),
}))
