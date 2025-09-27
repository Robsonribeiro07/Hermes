import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import { useCallback, useMemo } from 'react'

export function useReaction() {
  const { userIdtemp } = useChatStore()
  const { recentMessageId, userMessages, getMessageReactions } = useReactionStore()

  const hasReaction = useMemo(() => {
    if (!userIdtemp || !recentMessageId) return []

    const result = getMessageReactions(userIdtemp, recentMessageId)
    return result
  }, [userIdtemp, recentMessageId, userMessages, getMessageReactions])

  const getReactionMessage = useCallback(
    (messageId: string) => {
      if (!userIdtemp || !messageId) return []

      const result = getMessageReactions(userIdtemp, messageId)
      console.log(result)
      return result
    },
    [userIdtemp, getMessageReactions, userMessages],
  )

  return {
    hasReaction,
    getMessageReactions,
    getReactionMessage,
  }
}
