import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useChatWhatsappStore } from '@/store/whatsapp/chats/chat-store'

export function useChatWhatsapp() {
  const { FilterMessages, inputTextFilter } = useChatWhatsappStore()
  const { chats } = useChatStore()

  const userFilter = FilterMessages.find((u) => u.userId === '12')

  const findChatUser = chats.find((u) => u.user.id === '557582598725@s.whatsapp.net')

  if (!findChatUser) {
    return {
      regex: inputTextFilter ? new RegExp(`(${inputTextFilter})`, 'i') : null,
      filteredMessages: [],
      inputTextFilter,
    }
  }
  const filteredMessages = findChatUser.messages.filter((m) => {
    const matchData = userFilter?.date.toString()
      ? m.date.toString() === userFilter.date.toString()
      : true

    const matchText = inputTextFilter
      ? m.content.toLowerCase().includes(inputTextFilter.toLowerCase())
      : true

    return matchData && matchText
  })

  const regex = new RegExp(`(${inputTextFilter})`, 'i')

  return {
    regex,
    user: findChatUser,
    filteredMessages,
    inputTextFilter,
  }
}
