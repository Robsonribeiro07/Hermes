import { getSocketServices } from '@/services/socket'
import { typeDataReceived } from '@/store/chats/chat-message-store'
import { useEffect } from 'react'

export function useChatMessageHandler() {
  const socket = getSocketServices()

  useEffect(() => {
    socket.on('new-message-user-received', ({ user, message, history }: typeDataReceived) => {
      console.log(user, message, history)
    })
  }, [])
}
