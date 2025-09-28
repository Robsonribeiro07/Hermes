import { getSocketServices } from '@/services/socket'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useRef } from 'react'

export function useTypingStatus() {
  const { userIdtemp, messageToSend } = useChatStore()
  const socket = getSocketServices()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  if (!messageToSend) return { startTyping: () => {}, stopTyping: () => {} }

  const startTyping = () => {
    socket.emit('start-typing', {
      userIdtemp,
    })

    timeoutRef.current = setTimeout(() => {}, 3000)
  }

  const stopTyping = () => {
    socket.emit('stop-typing', { userIdtemp })

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  return {
    startTyping,
    stopTyping,
  }
}
