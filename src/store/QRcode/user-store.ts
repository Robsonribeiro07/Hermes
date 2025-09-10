import { create } from 'zustand'

interface IuserStore {
  userId: string | undefined
  setId: (userId: string) => void
}

export const userStore = create<IuserStore>((set) => ({
  userId: undefined,
  setId: (userId: string) => set({ userId }),
}))
