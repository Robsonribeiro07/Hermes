import { useReaction } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction'
import { useShowReactionMessage } from '@/store/whatsapp/chats/reactions/use-show-reaction-store'
import { Text, TouchableOpacity } from 'react-native'

interface IShowReactionInMessageProps {
  fromMe: boolean
  messageId: string
}
export function ShowReactionInMessage({ fromMe, messageId }: IShowReactionInMessageProps) {
  const { getReactionMessage } = useReaction()
  const { setOpen, setMessageId } = useShowReactionMessage()

  const messageReaction = getReactionMessage(messageId)

  if (!messageReaction || messageReaction.length === 0) return null

  return (
    <TouchableOpacity
      className={`flex-row items-center m-1 p- rounded-full  w-full px-2 bg-secondary-500 `}
      onPress={() => {
        setMessageId(messageId)
        setOpen(true)
      }}
    >
      <Text className="text-xl">
        {messageReaction[0].emoji} {messageReaction.length > 1 && messageReaction.length}
      </Text>
    </TouchableOpacity>
  )
}
