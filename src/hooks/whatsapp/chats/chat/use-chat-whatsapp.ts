import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useChatWhatsappStore } from '@/store/whatsapp/chats/chat-store'
import { useMessageQueue } from '@/store/whatsapp/chats/message-queue'
import { useMemo } from 'react'

export function useChatWhatsapp() {
  const { FilterMessages, inputTextFilter } = useChatWhatsappStore()
  const { userIdtemp } = useChatStore()
  const { queue } = useMessageQueue()
  const { chats } = useChatStore()

  const findChatUser = chats.find((u) => u.user.id === userIdtemp)

  const messagesToRender = useMemo(
    () => [
      ...queue.filter((q) => q.user.id === userIdtemp).map((q) => q.messages),
      ...(findChatUser?.messages.map((m) => ({ ...m, date: new Date(m.date) })) || []),
    ],
    [findChatUser, queue, userIdtemp, chats],
  )

  const filteredMessages = useMemo(() => {
    if (!messagesToRender) return []

    const userFilter = FilterMessages.find((u) => u.userId === userIdtemp)

    return messagesToRender.filter((m) => {
      const matchData = userFilter?.date ? m.date.toString() === userFilter.date.toString() : true
      const matchText = inputTextFilter
        ? m.content.toLowerCase().includes(inputTextFilter.toLowerCase())
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
