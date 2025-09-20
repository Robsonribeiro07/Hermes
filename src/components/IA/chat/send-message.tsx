import { useChatIA } from '@/hooks/IA/chat/use-chat-ia'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function SendMessage() {
  const { handleAddNewMessageFn, isChucking, handleStopMessage } = useChatIA()

  return (
    <TouchableOpacity
      className="h-14 w-14 items-center justify-center bg-blue-500 rounded-full"
      activeOpacity={0.5}
      onPress={() => {
        if (isChucking.current) {
          handleStopMessage()
        } else {
          handleAddNewMessageFn()
        }
      }}
    >
      {isChucking.current ? (
        <Ionicons name="stop-outline" size={20} color="white" />
      ) : (
        <Ionicons name="send-outline" size={20} color="#fff" />
      )}
    </TouchableOpacity>
  )
}
