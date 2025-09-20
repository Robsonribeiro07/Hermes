import { create } from 'zustand'

interface ISelectedContactsStore {
  SelectedJid: string[]
  handleAddContact: (newJid: string) => void
  handleclearSelectedContacts: () => void
}

export const useSelectedContactStore = create<ISelectedContactsStore>((set) => ({
  SelectedJid: [],
  handleAddContact: (newJid: string) => {
    set((state) => {
      if (state.SelectedJid.includes(newJid)) {
        return { SelectedJid: state.SelectedJid.filter((id) => id !== newJid) }
      }

      return { SelectedJid: [...state.SelectedJid, newJid] }
    })
  },
  handleclearSelectedContacts: () => set({ SelectedJid: [] }),
}))
