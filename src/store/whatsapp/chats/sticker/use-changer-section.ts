import { create } from 'zustand'

export type Section = 'happy-outline' | 'gift-outline' | 'person-outline' | 'images-outline'

interface StickerState {
  currentSection: Section
  isModalOpen: boolean
  changeSection: (section: Section) => void
  openModal: () => void
  closeModal: () => void
}

export const useStickerStore = create<StickerState>((set) => ({
  currentSection: 'happy-outline',
  isModalOpen: false,

  changeSection: (section) => {
    set({ currentSection: section })
  },

  openModal: () => {
    set({ isModalOpen: true })
  },

  closeModal: () => {
    set({ isModalOpen: false })
  },
}))
