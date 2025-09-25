import { create } from 'zustand'

interface IContactStore {
  open: boolean
  setOpen: () => void
  setClose: () => void
  openLoading: boolean
  setOpenLoading: () => void
  setCloseLoading: () => void
  isUploading: 'uploading' | 'finishing' | null
  setIsUploading: () => void
  setFinishingUploading: (string: 'uploading' | 'finishing' | null) => void
}

export const useContactStore = create<IContactStore>((set) => ({
  open: false,
  isUploading: null,
  openLoading: false,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
  setIsUploading: () => set({ isUploading: 'uploading' }),
  setFinishingUploading: (string) => set({ isUploading: string }),
  setOpenLoading: () => set({ openLoading: true }),
  setCloseLoading: () => set({ openLoading: false }),
}))
