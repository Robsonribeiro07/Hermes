import { create } from 'zustand'

interface IChatStore {
  FilterMessages: { userId: string; date: string }[]
  inputTextFilter: string
  showCalendar: boolean
  setFilterMessages: (userId: string) => void
  setDate: (userId: string, date: string) => void
  getDate: (userId: string) => string
  handlShowCalendar: () => void
  handleHideCalendar: () => void
  handleTextFilter: (text: string) => void
}

const getTodayString = () => new Date().toISOString().split('T')[0]

export const useChatWhatsappStore = create<
  IChatStore & { removeFilter: (userId?: string) => void }
>((set, get) => ({
  FilterMessages: [],
  showCalendar: false,
  inputTextFilter: '',
  setFilterMessages: (userId) =>
    set((state) => {
      const exist = state.FilterMessages.find((u) => u.userId === userId)
      return {
        FilterMessages: exist
          ? state.FilterMessages.filter((u) => u.userId !== userId)
          : [...state.FilterMessages, { userId, date: getTodayString() }],
      }
    }),
  setDate: (userId, date) =>
    set((state) => ({
      FilterMessages: state.FilterMessages.map((u) => (u.userId === userId ? { ...u, date } : u)),
    })),
  getDate: (userId) => {
    const user = get().FilterMessages.find((u) => u.userId === userId)
    return user ? user.date : getTodayString()
  },
  handlShowCalendar: () => set({ showCalendar: true }),
  handleHideCalendar: () => set({ showCalendar: false }),
  handleTextFilter: (text) => set({ inputTextFilter: text }),

  removeFilter: (userId) =>
    set((state) => ({
      FilterMessages: userId ? state.FilterMessages.filter((u) => u.userId !== userId) : [],
    })),
}))
