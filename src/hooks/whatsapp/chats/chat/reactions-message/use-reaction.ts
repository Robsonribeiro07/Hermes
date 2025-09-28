import { useSyncUserData } from '@/hooks/database/use-sync-user-data'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useReactionStore } from '@/store/whatsapp/chats/reactions/use-reaction-store'
import { useCallback, useMemo } from 'react'

export function useReaction() {
  const { userIdtemp } = useChatStore()
  const { recentMessageId, userMessages, getMessageReactions } = useReactionStore()
  const { data: userData } = useSyncUserData()

  const hasReaction = useMemo(() => {
    if (!userIdtemp || !recentMessageId) return []

    const result = getMessageReactions(userIdtemp, recentMessageId)
    return result.filter((r) => r.userId === userData?.jid)
  }, [userIdtemp, recentMessageId, userMessages, getMessageReactions])

  const getReactionMessage = useCallback(
    (messageId: string) => {
      if (!userIdtemp || !messageId) return []

      const result = getMessageReactions(userIdtemp, messageId)
      return result.filter((r) => r.emoji)
    },
    [userIdtemp, getMessageReactions, userMessages],
  )

  return {
    hasReaction,
    getMessageReactions,
    getReactionMessage,
  }
}
