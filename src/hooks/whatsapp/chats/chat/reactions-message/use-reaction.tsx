import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { Reaction, useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import { useMemo } from 'react'

export function useReaction() {
  const { userIdtemp } = useChatStore()
  const { recentMessageId, userMessages, addReaction, getMessageReactions } = useReactionStore()

  const reactionMessage = useMemo(() => {
    return userMessages.find((m) => m.userId === userIdtemp)?.messages
  }, [userIdtemp])

  const hasReaction = useMemo(() => getMessageReactions(userIdtemp || '', recentMessageId || ''), [userMessages, reactionMessage])

  const addReactionFn = (emojiId: Omit<Reaction, 'timestamp'>) => {
    if (!recentMessageId || !userIdtemp) return
    console.log(userMessages)

    const newReaction: Reaction = {
      ...emojiId,
      timestamp: new Date(),
    }
    addReaction(userIdtemp, recentMessageId, newReaction)
  }
  return {
    hasReaction,
    reactionMessage,
    addReactionFn,
  }
}
