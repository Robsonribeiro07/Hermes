import { useReaction } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction'
import { useMemo } from 'react'
import { Text, TouchableOpacity } from 'react-native'

interface IShowReactionInMessageProps {
  fromMe: boolean
  messageId: string
}
export function ShowReactionInMessage({ fromMe, messageId }: IShowReactionInMessageProps) {
  const { getReactionMessage } = useReaction()

  const messageReaction = useMemo(() => getReactionMessage(messageId), [getReactionMessage, messageId])

  return (
    <TouchableOpacity className={`flex-row items-center ml-3 p-1 rounded-full  w-full px-2 bg-secondary-500 `}>
      <Text className="text-xl">{messageReaction[0]?.emoji}</Text>
    </TouchableOpacity>
  )
}
