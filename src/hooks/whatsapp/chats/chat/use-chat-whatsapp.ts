import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useChatWhatsappStore } from '@/store/whatsapp/chats/chat-store'
import { useMessageQueue } from '@/store/whatsapp/chats/message-queue'
import { useMemo } from 'react'

export function useChatWhatsapp(userId: string) {
  const { FilterMessages, inputTextFilter } = useChatWhatsappStore()
  const { queue } = useMessageQueue()
  const { chats } = useChatStore()

  const findChatUser = chats.find((u) => u.user.id === userId)

  const messagesToRender = useMemo(
    () => [
      ...queue.filter((q) => q.user.id === userId).map((q) => q.messages),
      ...(findChatUser?.messages || []),
    ],
    [findChatUser, queue, userId],
  )

  const filteredMessages = useMemo(() => {
    if (!messagesToRender) return []

    const userFilter = FilterMessages.find((u) => u.userId === userId)

    return messagesToRender.filter((m) => {
      const matchData = userFilter?.date ? m.date.toString() === userFilter.date.toString() : true
      const matchText = inputTextFilter
        ? m.content.toLowerCase().includes(inputTextFilter.toLowerCase())
        : true
      return matchData && matchText
    })
  }, [messagesToRender, FilterMessages, inputTextFilter, userId])

  return {
    user: findChatUser,
    filteredMessages,
    inputTextFilter,
  }
}
