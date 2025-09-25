import { IMessage, IMessageType } from '@/components/IA/chat/message'
import { getUserId } from '@/database/MMKV/get-user-id'
import { getSocketServices } from '@/services/socket'
import { useChatIAStore } from '@/store/IA/chat-store'
import { useCallback, useRef } from 'react'
import uuid from 'react-native-uuid'
import { onceWithCleanup } from './onceWithcleanup'
import { useThinkingMessage } from './use-thinking-message'
import { useTimeout } from './use-timeout'

export function useChatIA() {
  const socket = getSocketServices()
  const {
    messageToSend,
    handleAddNewMessage,
    handleRemoveMessage,
    handleVerifyMessageContentIsNotNull,
    handleAddChunkMessage,
  } = useChatIAStore()
  const isChucking = useRef(false)
  const { addThinkingMessage, removeThinkingMessage, thinkingIdRef } = useThinkingMessage()
  const { start: startTimeout, clear: clearTimeoutRef } = useTimeout()

  const handleAddNewMessageFn = useCallback(async () => {
    const userId = getUserId()

    if (!messageToSend) return

    const localMessage: IMessage = {
      date: new Date(),
      fromMe: true,
      id: String(uuid.v4()),
      content: messageToSend,
    }
    handleAddNewMessage(localMessage)
    addThinkingMessage()

    socket.emit('new-message', { content: localMessage.content, userId })
    isChucking.current = true

    try {
      await new Promise<void>((resolve, reject) => {
        const cleanup = onceWithCleanup(
          socket,
          'new-message-received',
          ({
            chuck,
            type,
            isComplete,
          }: {
            chuck: string
            type: IMessageType
            isComplete: boolean
          }) => {
            if (!thinkingIdRef.current) return

            handleAddChunkMessage(chuck, thinkingIdRef.current, type, isComplete)

            if (isComplete) {
              isChucking.current = false
              clearTimeoutRef()
              resolve()
            }
          },
        )

        startTimeout(() => {
          if (cleanup) cleanup()
          removeThinkingMessage()
          isChucking.current = false

          handleRemoveMessage(localMessage.id)
          reject(new Error('mensagem nao enviada'))
        }, 20000)
      })
    } catch (err) {
      console.log('Erro no envio:', err)
      isChucking.current = false

      removeThinkingMessage()
    }
  }, [
    messageToSend,
    handleAddNewMessage,
    handleRemoveMessage,
    addThinkingMessage,
    removeThinkingMessage,
    startTimeout,
    clearTimeoutRef,
    socket,
  ])

  const handleStopMessage = () => {
    isChucking.current = false
    socket.emit('stoped')
    handleVerifyMessageContentIsNotNull(thinkingIdRef.current)
  }
  return {
    isChucking,
    handleStopMessage,
    handleAddNewMessageFn,
  }
}
