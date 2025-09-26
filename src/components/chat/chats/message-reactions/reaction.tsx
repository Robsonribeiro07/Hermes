import { useReaction } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction'
import { useReactionAnimated } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction-animated'
import { Reaction } from '@/store/whatsapp/chats/use-reaction-store'
import React from 'react'
import { Animated, Text, TouchableOpacity } from 'react-native'

export function ReactionComponent({ emoji, id }: Omit<Reaction, 'timestamp' | 'userId'>) {
  const { translateY, scale, rotateDeg } = useReactionAnimated()

  const { hasReaction, addReactionFn } = useReaction()

  let hasReactionFlag = hasReaction?.some((r) => r.id === id)

  return (
    <Animated.View
      style={{
        transform: [{ translateY }, { scale }, { rotate: rotateDeg }],
      }}
    >
      <TouchableOpacity onPress={() => addReactionFn({ id, emoji, userId: id })}>
        <Text className={`text-3xl p-2 rounded-full ${hasReactionFlag && 'bg-secondary-600'}`}>{emoji}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
