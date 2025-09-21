import { SaveImageToDevice } from '@/database/whatsapp/Media/use-save-image-to-device'
import { getSocketServices } from '@/services/socket'
import { typeDataReceived, useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useEffect } from 'react'

export function useChatMessageHandler() {
  const socket = getSocketServices()
  const { addMessage } = useChatStore()

  useEffect(() => {
    socket.on('new-message-user-received', async ({ user, message }: typeDataReceived) => {
      if (message.type === 'image') {
        const localUri = await SaveImageToDevice(message.content, message.type)
        addMessage(user, {
          ...message,
          content: localUri,
        })

        return
      }

      console.log(message)

      addMessage(user, message)
    })
  }, [])
}
