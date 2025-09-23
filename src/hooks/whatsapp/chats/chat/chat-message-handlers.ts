import { saveMediaToDevice } from '@/database/whatsapp/Media/use-save-image-to-device'
import { getSocketServices } from '@/services/socket'
import { typeDataReceived, useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useEffect } from 'react'

export function useChatMessageHandler() {
  const socket = getSocketServices()
  const { addMessage, updateUriMediaLocal, updateMessage } = useChatStore()

  useEffect(() => {
    socket.on('new-message-user-received', async ({ user, message }: typeDataReceived) => {
      if (message.type !== 'text') {
        addMessage(user, {
          ...message,
          content: message.content,
        })

        await saveMediaToDevice(message.content, message.type).then((uri) => {
          updateUriMediaLocal(user.id, uri!, message.id)
          console.log('thumbnail', uri)
          updateMessage(user.id, message.id, { thumbnail: uri })
        })

        return
      }

      console.log(user)
      addMessage(user, message)
    })
  }, [])
}
