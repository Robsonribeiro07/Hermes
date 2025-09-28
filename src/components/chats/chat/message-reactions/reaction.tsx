import { useReaction } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction'
import { useReactionAnimated } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction-animated'
import { useSendMessage } from '@/hooks/whatsapp/chats/chat/reactions-message/use-send-message'
import { Reaction } from '@/store/whatsapp/chats/reactions/use-reaction-store'
import React from 'react'
import { Animated, Text, TouchableOpacity } from 'react-native'

export function ReactionComponent({ emoji, id }: Omit<Reaction, 'timestamp' | 'userId' | 'fromMe'>) {
  const { translateY, scale, rotateDeg } = useReactionAnimated()
  const { handleSendReactionMessage } = useSendMessage()
  const { hasReaction } = useReaction()

  const hasReactionFlag = hasReaction?.some((r) => r.emoji === emoji) ?? false

  return (
    <Animated.View
      style={{
        transform: [{ translateY }, { scale }, { rotate: rotateDeg }],
      }}
    >
      <TouchableOpacity onPress={() => handleSendReactionMessage(emoji)} activeOpacity={0.7}>
        <Text className={`text-3xl p-2 rounded-full ${hasReactionFlag && 'bg-secondary-600'}`}>{emoji}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
