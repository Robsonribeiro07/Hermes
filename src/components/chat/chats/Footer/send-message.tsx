import { useSendMessage } from '@/hooks/whatsapp/chats/chat/use-send-message'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

interface ISendMessage {
  userId: string
}
export function SendMessage({ userId }: ISendMessage) {
  const { handleSendMessage, isPending, disabled } = useSendMessage(userId)

  return (
    <TouchableOpacity
      disabled={isPending || disabled}
      className="h-14 w-14 items-center justify-center bg-background-green rounded-full disabled:bg-secondary-500"
      activeOpacity={0.5}
      onPress={handleSendMessage}
    >
      <Ionicons name="send-outline" size={20} color="#fff" />
    </TouchableOpacity>
  )
}
