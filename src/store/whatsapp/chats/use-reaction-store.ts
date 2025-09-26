import { mmkvStorage } from '@/database/MMKV/conctact'
import { Dimensions } from 'react-native'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Reaction {
  id: string
  emoji: string
  userId: string
  timestamp: Date
}

export interface Message {
  id: string
  reactions: Reaction[]
}

interface UserMessages {
  userId: string
  messages: Message[]
}

interface ReactionStore {
  userMessages: UserMessages[]
  open: boolean
  recentMessageId?: string
  setRecentMessageId: (id: string) => void
  setOpen: (open: boolean) => void
  elementPosition: { x: number; y: number }
  addElementPosition: (position: { x: number; y: number }) => void
  addReaction: (userId: string, messageId: string, reaction: Reaction) => void
  removeReaction: (userId: string, messageId: string, reactionId: string) => void
  clearMessageReactions: (userId: string, messageId: string) => void
  getMessageReactions: (userId: string, messageId: string) => Reaction[]
}

const { width, height } = Dimensions.get('window')
export const useReactionStore = create<ReactionStore>()(
  persist(
    (set, get) => ({
      userMessages: [],
      recentMessageId: undefined,
      setRecentMessageId: (id) => set(() => ({ recentMessageId: id })),
      open: false,
      elementPosition: {
        x: 0,
        y: 0,
      },

      setOpen: (open) => set(() => ({ open })),

      addReaction: (userId, messageId, reaction) =>
        set((state) => {
          const userIndex = state.userMessages.findIndex((um) => um.userId === userId)
          const updatedUserMessages = [...state.userMessages]
          if (userIndex < 0) {
            return {
              userMessages: [
                ...state.userMessages,
                {
                  userId,
                  messages: [{ id: messageId, reactions: [reaction] }],
                },
              ],
            }
          }
          const messageIndex = updatedUserMessages[userIndex].messages.findIndex((m) => m.id === messageId)
          if (messageIndex < 0) {
            updatedUserMessages[userIndex].messages.push({ id: messageId, reactions: [reaction] })
          } else {
            const message = updatedUserMessages[userIndex].messages[messageIndex]

            const existingReactionIndex = message.reactions.findIndex((r) => r.id === reaction.id)

            if (existingReactionIndex >= 0) {
              message.reactions.splice(existingReactionIndex, 1)
            } else {
              message.reactions.push(reaction)
            }
            updatedUserMessages[userIndex].messages[messageIndex] = { ...message }
          }

          return { userMessages: updatedUserMessages }
        }),

      removeReaction: (userId, messageId, reactionId) =>
        set((state) => ({
          userMessages: state.userMessages.map((um) =>
            um.userId === userId
              ? {
                  ...um,
                  messages: um.messages.map((m) => (m.id === messageId ? { ...m, reactions: m.reactions.filter((r) => r.id !== reactionId) } : m)),
                }
              : um,
          ),
        })),

      clearMessageReactions: (userId, messageId) =>
        set((state) => ({
          userMessages: state.userMessages.map((um) =>
            um.userId === userId
              ? {
                  ...um,
                  messages: um.messages.map((m) => (m.id === messageId ? { ...m, reactions: [] } : m)),
                }
              : um,
          ),
        })),

      getMessageReactions: (userId, messageId) => {
        const userMessages = get().userMessages.find((um) => um.userId === userId)
        const message = userMessages?.messages.find((m) => m.id === messageId)
        return message?.reactions || []
      },

      addElementPosition: (position) =>
        set(() => {
          const maxX = width - width * 0.8
          const maxY = height - 40

          return {
            elementPosition: {
              x: Math.max(0, Math.min(position.x, maxX)),
              y: Math.max(0, Math.min(position.y, maxY)),
            },
          }
        }),
    }),
    {
      name: 'reaction-storageeb',
      storage: mmkvStorage,
    },
  ),
)
