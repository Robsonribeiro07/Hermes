import { mmkvStorage } from '@/database/MMKV/conctact'
import { MediaType } from '@/database/whatsapp/Media/typed-media'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type IContentMessage = {
  content: string
  type: MediaType
  date: string
  fromMe: boolean
  id: string
  thumbnail?: string
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
  addMessage: (user: IUserMessage, mesage: IContentMessage) => void
  updateUriMediaLocal: (userId: string, newMessage: string, messageId: string) => void
}

export const useChatStore = create<IChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
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
    }),
    { name: 'chats-msvbsbss', storage: mmkvStorage },
  ),
)
