import { useChatWhatsappStore } from '@/store/chats/chat-store'

export function useChatWhatsapp() {
  const messages = [
    {
      id: '1',
      content: 'Olá, tudo bem?',
      date: '2025-09-19',
      fromMe: true,
      thinkingMessage: false,
      type: 'text',
      isComplete: true,
    },
    {
      id: '2',
      content: 'Tudo ótimo! E você?',
      date: '2025-09-19',
      fromMe: false,
      thinkingMessage: false,
      type: 'text',
      isComplete: true,
    },
    {
      id: '3',
      content: 'Mensagem de outro dia',
      date: '2025-09-19',
      fromMe: true,
      thinkingMessage: false,
      type: 'text',
      isComplete: true,
    },
    {
      id: '4',
      content: 'Teste com outra data',
      date: '2025-09-19',
      fromMe: false,
      thinkingMessage: false,
      type: 'text',
      isComplete: true,
    },
  ]

  const { FilterMessages, inputTextFilter } = useChatWhatsappStore()

  const userFilter = FilterMessages.find((u) => u.userId === '12')

  const filteredMessages = messages.filter((m) => {
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
    filteredMessages,
    inputTextFilter,
  }
}
