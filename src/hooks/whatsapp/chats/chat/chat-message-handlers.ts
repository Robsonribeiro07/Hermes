import { getSocketServices } from '@/services/socket'
import { typeDataReceived, useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useEffect } from 'react'

export function useChatMessageHandler() {
  const socket = getSocketServices()
  const { addMessage } = useChatStore()

  useEffect(() => {
    socket.on('new-message-user-received', ({ user, message }: typeDataReceived) => {
      console.log(message)
      addMessage(user, message)
    })
  }, [])
}
