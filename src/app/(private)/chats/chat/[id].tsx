import { ContentMessage } from '@/components/chat/chats/content-message'
import { Footer } from '@/components/chat/chats/footer'
import { HeaderChat } from '@/components/chat/chats/header'
import { AudioPlayer } from '@/components/chat/chats/Media/Audio'
import { SearchMessages } from '@/components/chat/chats/search-messages'
import ThemedView from '@/components/theme/themed-view'
import { useBackHandler } from '@/hooks/use-back-handler'
import { useChatWhatsappStore } from '@/store/whatsapp/chats/chat-store'
import { useEffect } from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'

export default function Chat() {
  const { FilterMessages, removeFilter, setFilterMessages } = useChatWhatsappStore()
  const showSearch = FilterMessages.some((u) => u.userId === '12')

  useEffect(() => {
    setFilterMessages('12')
  }, [])

  useBackHandler({
    customFunctions: () => {
      const FilterMessagesState = useChatWhatsappStore.getState().FilterMessages
      if (FilterMessagesState.some((u) => u.userId === '12')) {
        removeFilter('12')
        return true
      }

      return false
    },
  })

  return (
    <ImageBackground
      className="flex-1"
      source={require('../../../../assets/images/background-chat.jpeg')}
    >
      <ThemedView className="flex-1 ">
        {showSearch && <SearchMessages />}

        <KeyboardAvoidingView
          className="w-full"
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <HeaderChat />

          <ContentMessage />
          <AudioPlayer uri="" />

          <Footer />
        </KeyboardAvoidingView>
      </ThemedView>
    </ImageBackground>
  )
}
