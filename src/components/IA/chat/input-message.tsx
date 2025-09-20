import { Input, InputField } from '@/components/ui/input'
import { useChatIAStore } from '@/store/IA/chat-store'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function InputMessage() {
  const { handleChangerMessageToSend, messageToSend } = useChatIAStore()
  return (
    <Input
      className="h-16 rounded-3xl bg-secondary-300 flex-1 px-2 "
      style={{
        elevation: 5,
      }}
    >
      <InputField
        value={messageToSend ?? ''}
        placeholder="Type a message"
        className="placeholder:font-poppins "
        onChangeText={handleChangerMessageToSend}
      />

      <TouchableOpacity activeOpacity={0.5}>
        <Ionicons name="happy-outline" size={30} />
      </TouchableOpacity>
    </Input>
  )
}
