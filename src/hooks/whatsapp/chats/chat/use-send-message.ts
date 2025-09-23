import { sendMessage } from '@/api/user/whatasapp/send-message'
import { getSocketServices } from '@/services/socket'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useMutation } from '@tanstack/react-query'

export function useSendMessage(userId: string) {
  const { messageToSend, addMessage, removeMessage } = useChatStore()
  const getMessagetoSend = messageToSend?.find((m) => m.user.id === userId)
  const socket = getSocketServices()

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onError: (error) => {
      console.error('Error sending message:', error)

      if (!getMessagetoSend) return

      setTimeout(() => {
        const { user, message } = getMessagetoSend
        removeMessage(user, message.id)
      }, 500)
    },
    onSuccess: (_, variables) => {
      if (!getMessagetoSend) return

      const { user, message } = getMessagetoSend

      socket.once('new-message-user-received', (data) => {
        console.log(data)
        removeMessage(user, message.id)
      })
    },
    onMutate: (variables) => {
      if (!getMessagetoSend) return
      console.log('enviado')

      console.log(getMessagetoSend)
      const { user, message } = getMessagetoSend

      addMessage(user, message)
    },
  })

  const handleSendMessage = () => {
    if (!getMessagetoSend?.message.content) return

    const { user, message } = getMessagetoSend
    mutate({
      userId: user.id,
      message: message.content,
      destination: user.id,
    })
  }

  return {
    isPending,
    handleSendMessage,
    disabled: !getMessagetoSend?.message.content || isPending,
  }
}
