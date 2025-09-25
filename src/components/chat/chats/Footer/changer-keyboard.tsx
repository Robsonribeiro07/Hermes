import { useEmojiStore } from '@/store/whatsapp/chats/emojis/use-emoji-store'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function ChangerKeyboard() {
  const { setOpenModal, typeKeyboard, settypeKeyboard } = useEmojiStore()

  return typeKeyboard === 'keyboard' ? (
    <TouchableOpacity
      onPress={() => {
        setOpenModal(true)
        settypeKeyboard('emoji')
      }}
    >
      <Ionicons name="reader-outline" size={30} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        setOpenModal(true)
        settypeKeyboard('keyboard')
      }}
    >
      <Ionicons name="keypad-outline" size={30} />
    </TouchableOpacity>
  )
}
