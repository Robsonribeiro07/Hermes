import { sendMessage } from '@/api/user/whatasapp/send-message'
import { typeDataReceived, useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useMessageQueue } from '@/store/whatsapp/chats/message-queue'
import { useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useSound } from '../../sound/use-sound-notification'

export function useSendMessageMutation() {
  const { messageToSend, removeMessageToSend, userIdtemp } = useChatStore()
  const { addToQueue, removeFromQueue } = useMessageQueue()
  const { recentMessageId, addReaction, setOpen } = useReactionStore()
  const { playSound } = useSound()

  const currentMessage = useMemo(() => {
    return messageToSend?.find((m) => m.user.id === userIdtemp)
  }, [messageToSend, userIdtemp])

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onError: (error, variables, context) => {
      if (!currentMessage) return
      addToQueue({ user: currentMessage.user, messages: currentMessage.message })
      removeMessageToSend(currentMessage.message.id)
    },
    onSuccess: (_, variables) => {
      if (currentMessage) {
        removeMessageToSend(currentMessage.message.id)
        removeFromQueue(currentMessage.message.id)
      }

      if (variables.type === 'gif' && variables.messageId) {
        removeFromQueue(variables.messageId!)
      }
    },
    onMutate: (variables) => {
      const { messageId, destination, message, participantId, type } = variables

      switch (type) {
        case 'text':
          currentMessage &&
            addToQueue({
              user: currentMessage.user,
              messages: currentMessage.message,
            })
          break

        case 'gif':
          if (!userIdtemp) break

          const gifMessage: typeDataReceived = {
            user: { id: userIdtemp, name: '', imgUrl: '' },
            message: {
              id: messageId || crypto.randomUUID(),
              content: message,
              type: 'gif',
              date: new Date(),
              sending: true,
              fromMe: true,
            },
          }
          addToQueue({ user: gifMessage.user, messages: gifMessage.message })
          break

        case 'react':
          if (messageId && participantId) {
            setOpen(false)
            playSound('reaction')
            addReaction(destination, messageId, {
              id: messageId,
              emoji: message,
              timestamp: new Date(),
              userId: participantId,
            })
          }
          break

        default:
          console.warn('Tipo de mensagem não suportado:', type)
      }
    },
  })

  return {
    recentMessageId,
    userIdtemp,
    currentMessage,
    mutate,
    isPending,
    disabled: !messageToSend?.some((m) => m.user.id === userIdtemp && m.message.content) || isPending,
  }
}
