import { Dimensions } from 'react-native'
import { create } from 'zustand'

interface Reaction {
  id: string
  emoji: string
  userId: string
  timestamp: Date
}

interface Message {
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
  setOpen: (open: boolean) => void
  elementPosition: { x: number; y: number }
  addElementPosition: (position: { x: number; y: number }) => void
  addReaction: (userId: string, messageId: string, reaction: Omit<Reaction, 'id' | 'timestamp'>) => void
  removeReaction: (userId: string, messageId: string, reactionId: string) => void
  clearMessageReactions: (userId: string, messageId: string) => void
  getMessageReactions: (userId: string, messageId: string) => Reaction[]
  addMessage: (userId: string, messageId: string) => void
}

const { width, height } = Dimensions.get('window')
export const useReactionStore = create<ReactionStore>((set, get) => ({
  userMessages: [],
  open: false,
  elementPosition: {
    x: 0,
    y: 0,
  },

  setOpen: (open) => set(() => ({ open })),
  addMessage: (userId, messageId) =>
    set((state) => {
      const userIndex = state.userMessages.findIndex((um) => um.userId === userId)

      if (userIndex >= 0) {
        const messageExists = state.userMessages[userIndex].messages.some((m) => m.id === messageId)
        if (!messageExists) {
          const updatedUserMessages = [...state.userMessages]
          updatedUserMessages[userIndex] = {
            ...updatedUserMessages[userIndex],
            messages: [...updatedUserMessages[userIndex].messages, { id: messageId, reactions: [] }],
          }
          return { userMessages: updatedUserMessages }
        }
        return state
      } else {
        return {
          userMessages: [
            ...state.userMessages,
            {
              userId,
              messages: [{ id: messageId, reactions: [] }],
            },
          ],
        }
      }
    }),

  addReaction: (userId, messageId, reaction) =>
    set((state) => {
      const userIndex = state.userMessages.findIndex((um) => um.userId === userId)
      if (userIndex < 0) return state

      const messageIndex = state.userMessages[userIndex].messages.findIndex((m) => m.id === messageId)
      if (messageIndex < 0) return state

      const newReaction = {
        ...reaction,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      }

      const updatedUserMessages = [...state.userMessages]
      updatedUserMessages[userIndex] = {
        ...updatedUserMessages[userIndex],
        messages: updatedUserMessages[userIndex].messages.map((m, idx) => (idx === messageIndex ? { ...m, reactions: [...m.reactions, newReaction] } : m)),
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
}))
