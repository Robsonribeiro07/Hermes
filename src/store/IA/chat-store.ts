import { IMessage, IMessageType } from '@/components/IA/chat/message'
import { mmkvStorage } from '@/database/MMKV/conctact'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IChatIA {
  chats: IMessage[]
  messageToSend: string | null
  handleAddNewMessage: (message: IMessage) => void
  handleChangerMessageToSend: (message: string) => void
  handleClearMessage: () => void
  handleRemoveMessage: (id: string) => void
  handleVerifyMessageContentIsNotNull: (messageId: string | null) => void
  handleAddChunkMessage: (
    chunk: string,
    id: string,
    type?: IMessageType,
    isComplete?: boolean,
  ) => void
}

export const useChatIAStore = create<IChatIA>()(
  persist(
    (set, get) => ({
      chats: [],
      messageToSend: null,

      handleChangerMessageToSend: (message: string) => set({ messageToSend: message }),
      handleAddNewMessage: (message: IMessage) =>
        set((state) => ({ chats: [message, ...state.chats], messageToSend: null })),

      handleClearMessage: () => set({ chats: [] }),

      handleRemoveMessage: (id: string) =>
        set((state) => ({ chats: state.chats.filter((m) => m.id !== id) })),
      handleVerifyMessageContentIsNotNull: (messageId: string | null) =>
        set((state) => {
          const findMessage = state.chats.find((c) => c.id === messageId)

          if (findMessage && !findMessage.content) {
            const updateChats = state.chats.filter((c) => c.id !== findMessage.id)

            return {
              chats: updateChats,
            }
          }
          return {}
        }),

      handleAddChunkMessage: (
        chunk: string,
        id: string,
        type?: IMessageType,
        isComplete?: boolean,
      ) =>
        set((state) => {
          return {
            chats: state.chats.map((c) =>
              c.id === id
                ? {
                    ...c,
                    content: c.content + chunk,
                    thinkingMessage: false,
                    type: type ? type : c.type,
                    isComplete: isComplete ? isComplete : c.isComplete,
                  }
                : c,
            ),
          }
        }),
    }),
    {
      name: 'chat-ia-messages',
      storage: mmkvStorage,
    },
  ),
)
