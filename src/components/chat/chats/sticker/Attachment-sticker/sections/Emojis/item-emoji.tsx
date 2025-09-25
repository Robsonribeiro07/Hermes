import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

type IItemEmojiProps = {
  emoji: string
}
export const EmojiItem = React.memo(({ emoji }: IItemEmojiProps) => {
  const { addEmojiToTempMessage } = useChatStore()
  return (
    <TouchableOpacity onPress={() => addEmojiToTempMessage(emoji)}>
      <Text className="text-3xl m-1">{emoji}</Text>
    </TouchableOpacity>
  )
})
