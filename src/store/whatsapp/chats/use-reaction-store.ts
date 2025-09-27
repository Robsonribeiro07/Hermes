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
  showAllReactions?: boolean
  setShollAllReactions: (show: boolean) => void
  setRecentMessageId: (id: string) => void
  setOpen: (open: boolean) => void
  elementPosition: { x: number; y: number }
  addElementPosition: (position: { x: number; y: number }) => void
  addReaction: (userId: string, messageId: string, reaction: Reaction) => void
  removeReaction: (userId: string, messageId: string, reactionUserId: string) => void
  clearMessageReactions: (userId: string, messageId: string) => void
  getMessageReactions: (userId: string, messageId: string) => Reaction[]
}

const { width, height } = Dimensions.get('window')
export const useReactionStore = create<ReactionStore>()(
  persist(
    (set, get) => ({
      userMessages: [],
      recentMessageId: undefined,
      showAllReactions: false,
      setShollAllReactions: (show) => set(() => ({ showAllReactions: show })),
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

          const messageIndex = state.userMessages[userIndex].messages.findIndex((m) => m.id === messageId)

          if (messageIndex < 0) {
            return {
              userMessages: state.userMessages.map((um, index) =>
                index === userIndex
                  ? {
                      ...um,
                      messages: [...um.messages, { id: messageId, reactions: [reaction] }],
                    }
                  : um,
              ),
            }
          } else {
            const currentMessage = state.userMessages[userIndex].messages[messageIndex]
            const existingUserReactionIndex = currentMessage.reactions.findIndex((r) => r.userId === reaction.userId)

            let newReactions: Reaction[]

            if (existingUserReactionIndex >= 0) {
              const existingReaction = currentMessage.reactions[existingUserReactionIndex]

              if (existingReaction.emoji === reaction.emoji) {
                newReactions = currentMessage.reactions.filter((_, index) => index !== existingUserReactionIndex)
              } else {
                newReactions = currentMessage.reactions.map((r, index) => (index === existingUserReactionIndex ? reaction : r))
              }
            } else {
              newReactions = [...currentMessage.reactions, reaction]
            }

            return {
              userMessages: state.userMessages.map((um, umIndex) =>
                umIndex === userIndex
                  ? {
                      ...um,
                      messages: um.messages.map((m, mIndex) => (mIndex === messageIndex ? { ...m, reactions: newReactions } : m)),
                    }
                  : um,
              ),
            }
          }
        }),

      removeReaction: (userId, messageId, reactionUserId) =>
        set((state) => ({
          userMessages: state.userMessages.map((um) =>
            um.userId === userId
              ? {
                  ...um,
                  messages: um.messages.map((m) =>
                    m.id === messageId
                      ? {
                          ...m,
                          reactions: m.reactions.filter((r) => r.userId !== reactionUserId),
                        }
                      : m,
                  ),
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
      name: 'reaction-storageebss',
      storage: mmkvStorage,
    },
  ),
)
