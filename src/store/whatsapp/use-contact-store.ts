import { mmkvStorage } from '@/database/MMKV/conctact'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IUserContact {
  jid: string
  exist: boolean | null
  lid: string | null
  imgUrl: string | null
  name: string | undefined
  number: string | undefined
}

export interface IUserContactStore {
  contacts: IUserContact[]
  addContact: (contact: IUserContact) => void
  updateContact: (jid: string, updates: Partial<IUserContact>) => void
  removeContact: (jid: string) => void
  clearContacts: () => void
  updateAt: string | null
  setUpdateAt: (date: Date) => void
  canFetch: () => boolean
}

export const useUserContactPersistStore = create<IUserContactStore>()(
  persist(
    (set, get) => ({
      contacts: [],
      updateAt: null,

      addContact: (contact) =>
        set((state) => {
          const exists = state.contacts.some((c) => c.jid === contact.jid)
          if (exists) return state
          return { contacts: [...state.contacts, contact] }
        }),

      updateContact: (jid, updates) =>
        set((state) => ({
          contacts: state.contacts.map((c) => (c.jid === jid ? { ...c, ...updates } : c)),
        })),

      removeContact: (jid) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.jid !== jid),
        })),

      clearContacts: () => set({ contacts: [] }),

      setUpdateAt: (date) => set({ updateAt: date.toISOString() }),

      canFetch: () => {
        const { updateAt } = get()
        if (!updateAt) return true
        const lastUpdate = new Date(updateAt)
        const now = new Date()
        const diff = now.getTime() - lastUpdate.getTime()
        return diff >= 1000 * 60 * 60 * 24 // 1 dia
      },
    }),
    {
      name: 'user-contact-storage',
      storage: mmkvStorage,
    },
  ),
)
