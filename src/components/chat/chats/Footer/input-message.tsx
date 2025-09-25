import { Input, InputField } from '@/components/ui/input'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useEmojiStore } from '@/store/whatsapp/chats/emojis/use-emoji-store'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native'
import { ChangerKeyboard } from './changer-keyboard'

interface IInputMessage {
  userId?: string
}
export function InputMessage({ userId }: IInputMessage) {
  const { handleAddMessagetoSend, messageToSend, setOnInputFocus, setMessageIdTemp } =
    useChatStore()
  const inputRef = useRef<TextInput>(null)
  const { typeKeyboard } = useEmojiStore()
  const getValue = messageToSend?.find((m) => m.user.id === userId)
  useEffect(() => {
    if (!inputRef.current) return

    if (typeKeyboard === 'keyboard') {
      inputRef.current.focus()
    } else {
      inputRef.current.blur()
    }
  }, [typeKeyboard])
  const handleAddNewMessageFn = (content: string) => {
    const tempId = 'm-' + Math.random().toString(36).substring(2, 10)
    setMessageIdTemp(tempId)
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
        id: tempId,
        sending: true,
      },
    })
  }
  return (
    <Input className="h-16 rounded-3xl bg-secondary-300 flex-1 px-2 " style={{}}>
      <ChangerKeyboard />

      <InputField
        ref={inputRef as React.RefObject<TextInput & TextInputProps>}
        placeholder="Type a message"
        value={getValue?.message.content || ''}
        className="placeholder:font-poppins "
        onBlur={() => setOnInputFocus(false)}
        onFocus={() => setOnInputFocus(true)}
        onChangeText={(text) => handleAddNewMessageFn(text)}
      />

      <TouchableOpacity activeOpacity={0.5}>
        <Ionicons name="happy-outline" size={30} />
      </TouchableOpacity>
    </Input>
  )
}
