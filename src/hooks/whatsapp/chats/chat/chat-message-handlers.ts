import { SaveImageToDevice } from '@/database/whatsapp/Media/use-save-image-to-device'
import { getSocketServices } from '@/services/socket'
import { typeDataReceived, useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useEffect } from 'react'

export function useChatMessageHandler() {
  const socket = getSocketServices()
  const { addMessage, updateUriMediaLocal } = useChatStore()

  useEffect(() => {
    socket.on('new-message-user-received', async ({ user, message }: typeDataReceived) => {
      if (message.type === 'image' || message.type === 'video') {
        addMessage(user, {
          ...message,
          content: message.content,
        })

        await SaveImageToDevice(message.content, message.type).then((uri) => {
          console.log(uri)
          console.log('media baixado uri sendo trocada')
          updateUriMediaLocal(user.id, uri, message.id)
        })

        return
      }
    })
  }, [])
}
