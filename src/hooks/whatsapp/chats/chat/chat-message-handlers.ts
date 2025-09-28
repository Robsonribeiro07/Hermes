import { saveMediaToDevice } from '@/database/whatsapp/Media/use-save-image-to-device'
import { getSocketServices } from '@/services/socket'
import { typeDataReceived, useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { Reaction, useReactionStore } from '@/store/whatsapp/chats/reactions/use-reaction-store'
import { useEffect } from 'react'

export function useChatMessageHandler() {
  const socket = getSocketServices()
  const { addMessage, updateUriMediaLocal, updateMessage } = useChatStore()
  const { addReaction } = useReactionStore()

  useEffect(() => {
    socket.on('new-message-user-received', async ({ user, message, reaction }: typeDataReceived) => {
      if (reaction) {
        const { messageId, targetUser, emoji, fromMe, reactionUser } = reaction

        if (reaction.reactionUser === '557582233723@s.whatsapp.net') return
        console.log({ reactionUser, targetUser, messageId, emoji, fromMe })

        if (reactionUser === '557582223723@s.whatsapp.net') return
        const newReaction: Reaction = {
          emoji,
          fromMe,
          id: new Date().getTime().toString() + Math.random().toString(36).substring(2),
          name: reactionUser,
          userId: reactionUser || targetUser,
          timestamp: new Date(),
        }
        addReaction(targetUser, messageId, newReaction)
      }

      if (!message.content) return
      if (message.type !== 'text') {
        addMessage(user, {
          ...message,
          content: message.content,
          mimyType: message.mimyType,
          gifPlayback: message.gifPlayback,
          fromMe: message.fromMe,
        })

        await saveMediaToDevice(message.content, message.type).then((uri) => {
          updateUriMediaLocal(user.id, uri!, message.id)
          updateMessage(user.id, message.id, { thumbnail: uri })
        })

        return
      }

      console.log(user)
      addMessage(user, message)
    })
  }, [])
}
