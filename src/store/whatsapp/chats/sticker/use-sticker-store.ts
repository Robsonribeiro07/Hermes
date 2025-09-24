import { create } from 'zustand'

interface StickerContent {
  image: string | null
}

interface StickerState {
  content: StickerContent
  setContent: (url: string | null) => void
  clearContent: () => void
  isOpen: () => boolean
}

export const useStickerStateStore = create<StickerState>((set, get) => ({
  content: {
    image: null,
  },
  setContent: (url: string | null) =>
    set({
      content: { image: url },
    }),
  clearContent: () =>
    set({
      content: { image: null },
    }),
  isOpen: () => {
    const state = get()
    return !!state.content.image
  },
}))
