import { ContentMessage } from '@/components/chats/chat/content-message'
import { Footer } from '@/components/chats/chat/Footer/footer'
import { HeaderChat } from '@/components/chats/chat/header'
import { ReactionOverlay } from '@/components/chats/chat/message-reactions/reaction-overlay'
import { ShowReactionsMessage } from '@/components/chats/chat/message-reactions/show-reactions-message'
import { SearchMessages } from '@/components/chats/chat/search-messages'
import { ContentAttachmmentSticker } from '@/components/chats/chat/sticker/Attachment-sticker/content'
import ThemedView from '@/components/theme/themed-view'
import { useBackHandler } from '@/hooks/use-back-handler'
import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { useChatWhatsappStore } from '@/store/whatsapp/chats/chat-store'
import { useEffect } from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native'

export default function Chat() {
  const { FilterMessages, removeFilter } = useChatWhatsappStore()
  const { setUserIdTemp } = useChatStore()
  const { height } = useWindowDimensions()

  const showSearch = FilterMessages.some((u) => u.userId === '12')

  useEffect(() => {
    setUserIdTemp('557582598725@s.whatsapp.net')
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
    <ImageBackground className="flex-1" source={require('../../../../../assets/images/background-chat.jpeg')}>
      <ThemedView className="flex-1 ">
        {showSearch && <SearchMessages />}

        <KeyboardAvoidingView
          className="w-full "
          style={{ flex: 1, height: height }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <HeaderChat />

          <ContentMessage />

          <Footer userId="557582598725@s.whatsapp.net" />
          <ContentAttachmmentSticker />
          <ShowReactionsMessage />
          <ReactionOverlay />
        </KeyboardAvoidingView>
      </ThemedView>
    </ImageBackground>
  )
}
