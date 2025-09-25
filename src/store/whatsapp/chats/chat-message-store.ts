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
  mimyType?: 'video/mp4'
  gifPlayback?: boolean
  isVisible?: boolean
}

export type IUserMessage = {
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
  onInputFocus: boolean
  userIdtemp: string | null
  messageIdtemp: string | null
  setUserIdTemp: (value: string | null) => void
  addEmojiToTempMessage: (emoji: string) => void
  setMessageIdTemp: (value: string | null) => void
  setOnInputFocus: (value: boolean) => void
  handleAddMessagetoSend: (data: typeDataReceived | null) => void
  addMessage: (user: IUserMessage, message: IContentMessage) => void
  removeMessage: (user: IUserMessage, messageId: string) => void
  updateMessage: (userId: string, messageId: string, updates: Partial<IContentMessage>) => void
  updateUriMediaLocal: (userId: string, newMessage: string, messageId: string) => void
  removeMessageToSend: (messageId: string) => void
}

export const useChatStore = create<IChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      messageToSend: null,
      onInputFocus: false,
      userIdtemp: null,

      messageIdtemp: null,
      addMessage: (user, message) => {
        set((state) => {
          const chats = [...state.chats]
          const userChat = chats.find((c) => c.user.id === user.id)

          if (userChat) {
            const exists = userChat.messages.some((m) => m.id === message.id)
            if (exists) {
              console.error('mensagem já existe no chat')
              return { chats } // retorna o estado sem alterações
            }

            userChat.messages = [message, ...userChat.messages]
            return { chats }
          } else {
            return { chats: [...chats, { user, messages: [message] }] }
          }
        })
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
      setOnInputFocus: (value: boolean) => set({ onInputFocus: value }),
      setMessageIdTemp: (value: string | null) => set({ messageIdtemp: value }),
      setUserIdTemp: (value: string | null) => set({ userIdtemp: value }),

      addEmojiToTempMessage: (emoji: string) =>
        set((state) => {
          const userId = state.userIdtemp
          const messageId = state.messageIdtemp

          if (!state.messageToSend || !userId || !messageId)
            return { messageToSend: state.messageToSend }

          const updated = state.messageToSend.map((m) => {
            if (m.user.id === userId && m.message.id === messageId) {
              return {
                ...m,
                message: {
                  ...m.message,
                  content: m.message.content + emoji, // concatena o emoji
                },
              }
            }
            return m
          })

          return { messageToSend: updated }
        }),
      removeMessageToSend: (messageId: string) =>
        set((state) => ({
          messageToSend: state.messageToSend
            ? state.messageToSend.filter((m) => m.message.id !== messageId)
            : null,
        })),
    }),

    { name: 'chat-2bbb', storage: mmkvStorage },
  ),
)
