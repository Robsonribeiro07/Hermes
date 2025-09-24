import { sendMessage } from '@/api/user/whatasapp/send-message'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useMessageQueue } from '@/store/whatsapp/chats/message-queue'
import { useMutation } from '@tanstack/react-query'

export function useSendMessage(userId: string) {
  const { messageToSend, removeMessageToSend } = useChatStore()
  const { addToQueue, removeFromQueue } = useMessageQueue()

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onError: (error, variables, context) => {
      const msgToSend = messageToSend?.find((m) => m.user.id === userId)
      if (!msgToSend) return

      addToQueue({ user: msgToSend.user, messages: msgToSend.message })
      removeMessageToSend(msgToSend.message.id)
    },
    onSuccess: (_, variables) => {
      const msgToSend = messageToSend?.find((m) => m.user.id === userId)
      if (!msgToSend) return

      removeFromQueue(msgToSend.message.id)
      removeMessageToSend(msgToSend.message.id)
    },
    onMutate: () => {
      const msgToSend = messageToSend?.find((m) => m.user.id === userId)
      if (!msgToSend) return
      addToQueue({ user: msgToSend.user, messages: msgToSend.message })
    },
  })

  const handleSendMessage = () => {
    const msgToSend = messageToSend?.find((m) => m.user.id === userId)
    if (!msgToSend?.message.content) return

    const { user, message } = msgToSend
    mutate({
      userId: user.id,
      message: message.content,
      destination: user.id,
    })
  }

  return {
    isPending,
    handleSendMessage,
    disabled: !messageToSend?.some((m) => m.user.id === userId && m.message.content) || isPending,
  }
}
