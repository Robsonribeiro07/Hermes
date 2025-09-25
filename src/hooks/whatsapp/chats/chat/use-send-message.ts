import { sendMessage } from '@/api/user/whatasapp/send-message'
import { typeDataReceived, useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useMessageQueue } from '@/store/whatsapp/chats/message-queue'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export function useSendMessage() {
  const { messageToSend, removeMessageToSend, userIdtemp } = useChatStore()
  const { addToQueue, removeFromQueue } = useMessageQueue()
  const [sentGifMessages, setSentGifMessages] = useState<typeDataReceived[]>([])

  console.log(userIdtemp)
  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onError: (error, variables, context) => {
      const msgToSend = messageToSend?.find((m) => m.user.id === userIdtemp)
      if (!msgToSend) return

      addToQueue({ user: msgToSend.user, messages: msgToSend.message })
      removeMessageToSend(msgToSend.message.id)
    },
    onSuccess: (_, variables) => {
      const msgToSend = messageToSend?.find((m) => m.user.id === userIdtemp)
      if (msgToSend) {
        removeFromQueue(msgToSend.message.id)
        removeMessageToSend(msgToSend.message.id)
      }
      if (variables.type === 'gif') {
        removeFromQueue(variables.messageId!)
        setSentGifMessages((prev) => prev.filter((m) => m.message.id !== variables.messageId))
      }
    },
    onMutate: (variables, context) => {
      const msgToSend = messageToSend?.find((m) => m.user.id === userIdtemp)
      if (msgToSend) {
        addToQueue({ user: msgToSend.user, messages: msgToSend.message })
      }
      if (variables.type === 'gif') {
        const giftMsg: typeDataReceived = {
          user: {
            id: userIdtemp!,
            name: '',
            imgUrl: '',
          },
          message: {
            id: variables.messageId || Math.random().toString(36).substring(7),
            content: variables.message,
            type: 'gif',
            date: new Date(),
            sending: true,
            fromMe: true,
          },
        }
        setSentGifMessages((prev) => [...prev, giftMsg])
        addToQueue({ user: giftMsg.user, messages: giftMsg.message })
      }
    },
  })

  const handleSendGiftMessage = (gifUrl: string) => {
    const messageId = Math.random().toString(36).substring(7)
    mutate({
      message: gifUrl,
      destination: userIdtemp!,
      type: 'gif',
      messageId,
    })
  }
  const handleSendMessage = () => {
    const msgToSend = messageToSend?.find((m) => m.user.id === userIdtemp)
    if (!msgToSend?.message.content) return

    const { user, message } = msgToSend
    mutate({
      message: message.content,
      destination: user.id,
      type: 'text',
    })
  }

  return {
    isPending,
    handleSendMessage,
    handleSendGiftMessage,
    disabled:
      !messageToSend?.some((m) => m.user.id === userIdtemp && m.message.content) || isPending,
    sentGifMessages,
  }
}
