import { mmkvStorage } from '@/database/MMKV/conctact'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IContentMessage, IUserMessage } from './chat-message-store'

interface IMessageQueue {
  queue: { user: IUserMessage; messages: IContentMessage }[]
  addToQueue: (item: { user: IUserMessage; messages: IContentMessage }) => void
  removeFromQueue: (messageId: string) => void
  clearQueue: () => void
}

export const useMessageQueue = create<IMessageQueue>()(
  persist(
    (set) => ({
      queue: [],
      addToQueue: (item) =>
        set((state) => {
          const exist = state.queue.some((m) => m.messages.id === item.messages.id)

          if (exist) return state

          return { queue: [item, ...state.queue] }
        }),
      removeFromQueue: (messageId) =>
        set((state) => ({
          queue: state.queue.filter((m) => m.messages.id !== messageId),
        })),
      clearQueue: () => set({ queue: [] }),
    }),
    { name: 'message-queues', storage: mmkvStorage },
  ),
)
