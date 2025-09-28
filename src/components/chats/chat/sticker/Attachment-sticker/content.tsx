import { useBackHandler } from '@/hooks/use-back-handler'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useEmojiStore } from '@/store/whatsapp/chats/emojis/use-emoji-store'
import { useEffect, useState } from 'react'
import { Animated, View } from 'react-native'
import { Header } from './header/header'
import { SectionsPages } from './sections/sections-pages'

export function ContentAttachmmentSticker() {
  const { openModal, setOpenModal } = useEmojiStore()
  const { typeKeyboard } = useEmojiStore()
  const { onInputFocus } = useChatStore()
  const [height] = useState(new Animated.Value(0))

  useBackHandler({
    customFunctions: () => {
      if (openModal) {
        setOpenModal(false)
        return true
      }
      return false
    },
  })

  useEffect(() => {
    Animated.timing(height, {
      toValue: openModal ? 300 : 0,
      duration: 50,
      useNativeDriver: false,
    }).start()
  }, [openModal])

  if (!openModal) return null
  return (
    <Animated.View style={{ height }}>
      <View style={{ flex: 1, paddingHorizontal: 10, zIndex: 999, elevation: 999 }}>
        <Header />
        <SectionsPages />
      </View>
    </Animated.View>
  )
}
