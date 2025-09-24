import { Keyboard } from 'react-native'
import { create } from 'zustand'

type EmojiSection =
  | 'smileys'
  | 'people'
  | 'nature'
  | 'food'
  | 'activities'
  | 'travel'
  | 'objects'
  | 'symbols'
  | 'flags'

interface EmojiStore {
  currentSection: EmojiSection
  typeKeyboard: 'emoji' | 'keyboard'
  settypeKeyboard: (type: 'emoji' | 'keyboard') => void
  openModal: boolean
  setOpenModal: (open: boolean) => void
  setSection: (section: EmojiSection) => void
}

export const useEmojiStore = create<EmojiStore>((set) => ({
  currentSection: 'smileys',
  typeKeyboard: 'keyboard',
  settypeKeyboard: (type) => set({ typeKeyboard: type }),
  setSection: (section) => set({ currentSection: section }),
  openModal: false,
  setOpenModal: (open) => {
    Keyboard.dismiss()
    setTimeout(() => {
      set({ openModal: open })
    }, 500)
  },
}))
