import { sendMessage } from '@/api/user/whatasapp/send-message'
import { useMessageQueue } from '@/store/whatsapp/chats/message-queue'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useQueueSendMensage() {
  const { queue, removeFromQueue } = useMessageQueue()

  const { mutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (_, variables) => {
      if (!variables) return

      const { messageId } = variables

      if (!messageId) return
      removeFromQueue(messageId)
    },
  })

  useEffect(() => {
    let isMounted = true
    const retrySendMessages = async () => {
      console.log(queue.length)

      if (!isMounted) return
      for (const items of queue) {
        try {
          mutate({
            message: items.messages.content,
            destination: items.user.id,
            messageId: items.messages.id,
            type: items.messages.type,
          })

          removeFromQueue(items.messages.id)

          await new Promise((resolve) => setTimeout(resolve, 1500))
        } catch (error) {
          console.log('Error sending message from queue:', error)
        }
      }

      if (isMounted && queue.length > 0) {
        setTimeout(() => {
          retrySendMessages()
        }, 20000)
      }
    }

    const timeout = setTimeout(() => {
      retrySendMessages()
    }, 12000)
  }, [])
}
