import { mmkvStorage } from '@/database/MMKV/conctact'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type IContentMessage = {
  content: string
  type: 'text' | 'img'
  date: string
  fromMe: boolean
  id: string
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
            userChat.messages.unshift(message)
          }
          set({ chats: [...chats] })
        } else {
          set({
            chats: [...chats, { user, messages: [message] }],
          })
        }
      },
    }),
    { name: 'chats-messagessss', storage: mmkvStorage },
  ),
)
