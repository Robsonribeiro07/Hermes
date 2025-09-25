import { useChatIAStore } from '@/store/IA/chat-store'
import { useRef } from 'react'
import uuid from 'react-native-uuid'

export function useThinkingMessage() {
  const { handleRemoveMessage, handleAddNewMessage } = useChatIAStore()
  const thinkingIdRef = useRef<string | null>(null)

  const addThinkingMessage = () => {
    const id = String(uuid.v4())
    thinkingIdRef.current = id
    handleAddNewMessage({
      id,
      content: '',
      date: new Date(),
      thinkingMessage: true,
    })
    return id
  }

  const removeThinkingMessage = () => {
    if (thinkingIdRef.current) {
      handleRemoveMessage(thinkingIdRef.current)
      thinkingIdRef.current = null
    }
  }

  return { addThinkingMessage, removeThinkingMessage, thinkingIdRef }
}
