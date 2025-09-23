import { mmkvStorage } from '@/database/MMKV/conctact'
import { MediaType } from '@/database/whatsapp/Media/typed-media'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type IContentMessage = {
  content: string
  type: MediaType
  date: Date
  fromMe: boolean
  id: string
  thumbnail?: string
  link?: string
  sending: boolean
  imgUrl?: string
}

type IUserMessage = {
  name: string
  imgUrl: string
  id: string
}

export type typeDataReceived = {
  user: IUserMessage
  message: IContentMessage
}

export interface IUserChat {
  messages: IContentMessage[]
  user: IUserMessage
}

interface IChatStore {
  chats: IUserChat[]
  messageToSend: typeDataReceived[] | null
  handleAddMessagetoSend: (data: typeDataReceived | null) => void
  addMessage: (user: IUserMessage, mesage: IContentMessage) => void
  removeMessage: (user: IUserMessage, messagedId: string) => void
  updateMessage: (userId: string, messageId: string, updates: Partial<IContentMessage>) => void
  updateUriMediaLocal: (userId: string, newMessage: string, messageId: string) => void
}

export const useChatStore = create<IChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      messageToSend: null,
      addMessage: (user, message) => {
        const chats = get().chats

        const userChat = chats.find((c) => c.user.id === user.id)

        if (userChat) {
          if (!userChat.messages.includes(message)) {
            if (userChat.messages.some((m) => m.id === message.id)) {
              console.error('mensagem ja existe no chat')
              return
            }
            userChat.messages.unshift(message)
          }
          set({ chats: [...chats] })
        } else {
          set({
            chats: [...chats, { user, messages: [message] }],
          })
        }
      },
      updateUriMediaLocal: (userId: string, newMessage: string, messageId: string) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.user.id === userId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, content: newMessage } : m,
                  ),
                }
              : c,
          ),
        })),
      updateMessage: (userId: string, messageId: string, updates: Partial<IContentMessage>) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.user.id === userId
              ? {
                  ...c,
                  messages: c.messages.map((m) => (m.id === messageId ? { ...m, ...updates } : m)),
                }
              : c,
          ),
        })),
      handleAddMessagetoSend: (data) =>
        set((state) => {
          if (!data) return { messageToSend: state.messageToSend }

          const current = state.messageToSend || []
          const userIndex = current.findIndex((m) => m.user.id === data.user.id)

          if (userIndex >= 0) {
            const existing = current[userIndex]
            if (existing.message.content === data.message.content) {
              return { messageToSend: state.messageToSend }
            }

            const updated = [...current]
            updated[userIndex] = { user: data.user, message: data.message }
            return { messageToSend: updated }
          }

          return { messageToSend: [...current, { user: data.user, message: data.message }] }
        }),
      removeMessage: (user, messagId) =>
        set((state) => ({
          chats: state.chats.map((u) =>
            u.user.id === user.id
              ? {
                  ...u,
                  messages: u.messages.filter((m) => m.id !== messagId),
                }
              : u,
          ),
        })),
    }),
    { name: 'chats-msvbsbsssss', storage: mmkvStorage },
  ),
)
