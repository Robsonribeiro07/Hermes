import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useChatWhatsappStore } from '@/store/whatsapp/chats/chat-store'
import { useMessageQueue } from '@/store/whatsapp/chats/message-queue'
import { useMemo } from 'react'

export function useChatWhatsapp() {
  const { FilterMessages, inputTextFilter } = useChatWhatsappStore()
  const { userIdtemp, chats } = useChatStore()
  const { queue } = useMessageQueue()

  const findChatUser = useMemo(
    () => chats.find((u) => u.user.id === userIdtemp),
    [chats, userIdtemp],
  )

  const messagesToRender = useMemo(() => {
    const queueMessages = queue.filter((q) => q.user.id === userIdtemp).flatMap((q) => q.messages)

    const chatMessages =
      findChatUser?.messages?.map((m) => ({
        ...m,
        date: typeof m.date === 'string' ? new Date(m.date) : m.date,
      })) || []

    console.log('🔄 Mensagens recalculadas:', {
      queue: queueMessages.length,
      chat: chatMessages.length,
      total: queueMessages.length + chatMessages.length,
    })

    return [...queueMessages, ...chatMessages]
  }, [chats, queue, userIdtemp])

  const filteredMessages = useMemo(() => {
    if (!messagesToRender?.length) return []

    const userFilter = FilterMessages.find((u) => u.userId === userIdtemp)

    return messagesToRender.filter((m) => {
      const matchData = userFilter?.date
        ? m.date.toDateString() === new Date(userFilter.date).toDateString()
        : true

      const matchText = inputTextFilter
        ? m.content?.toLowerCase().includes(inputTextFilter.toLowerCase())
        : true

      return matchData && matchText
    })
  }, [messagesToRender, FilterMessages, inputTextFilter, userIdtemp])

  return {
    user: findChatUser,
    filteredMessages,
    inputTextFilter,
  }
}
