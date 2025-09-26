import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import { useMemo } from 'react'

export function useReaction() {
  const { userIdtemp } = useChatStore()
  const { recentMessageId, userMessages, getMessageReactions } = useReactionStore()

  console.log(getMessageReactions(userIdtemp!, recentMessageId!))
  const hasReaction = useMemo(() => {
    if (!userIdtemp || !recentMessageId) return []

    const result = getMessageReactions(userIdtemp, recentMessageId)
    return result
  }, [userIdtemp, recentMessageId, userMessages])

  return {
    hasReaction,
  }
}
