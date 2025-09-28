import { useSendMessage } from '@/hooks/whatsapp/chats/chat/reactions-message/use-send-message'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import React, { useCallback } from 'react'
import { Text, TouchableOpacity } from 'react-native'

type IItemEmojiProps = {
  emoji: string
  comportment?: 'text' | 'reaction'
}
export const EmojiItem = React.memo(({ emoji, comportment }: IItemEmojiProps) => {
  const { addEmojiToTempMessage } = useChatStore()
  const { handleSendReactionMessage } = useSendMessage()

  const handleToogleComporteMentEmojis = useCallback(() => {
    return comportment === 'reaction' ? handleSendReactionMessage(emoji) : addEmojiToTempMessage(emoji)
  }, [comportment, emoji, handleSendReactionMessage, addEmojiToTempMessage])
  return (
    <TouchableOpacity onPress={handleToogleComporteMentEmojis}>
      <Text className="text-3xl m-1">{emoji}</Text>
    </TouchableOpacity>
  )
})
