import { Input, InputField } from '@/components/ui/input'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

interface IInputMessage {
  userId?: string
}
export function InputMessage({ userId }: IInputMessage) {
  const { handleAddMessagetoSend, messageToSend } = useChatStore()

  const getValue = messageToSend?.find((m) => m.user.id === userId)

  const handleAddNewMessageFn = (content: string) => {
    handleAddMessagetoSend({
      user: {
        id: userId || 'user-id',
        imgUrl: '',
        name: 'User Name',
      },
      message: {
        content,
        type: 'text',
        date: new Date(),
        fromMe: true,
        id: new Date().getMilliseconds().toString() + 'm-id-xp',
        sending: true,
      },
    })
  }
  return (
    <Input className="h-16 rounded-3xl bg-secondary-300 flex-1 px-2 " style={{}}>
      <InputField
        placeholder="Type a message"
        value={getValue?.message.content || ''}
        className="placeholder:font-poppins "
        onChangeText={(text) => handleAddNewMessageFn(text)}
      />

      <TouchableOpacity activeOpacity={0.5}>
        <Ionicons name="happy-outline" size={30} />
      </TouchableOpacity>
    </Input>
  )
}
