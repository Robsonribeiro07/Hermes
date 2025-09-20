import { ContentMessage } from '@/components/chat/chats/content-message'
import { Footer } from '@/components/chat/chats/footer'
import { HeaderChat } from '@/components/chat/chats/header'
import { SearchMessages } from '@/components/chat/chats/search-messages'
import ThemedView from '@/components/theme/themed-view'
import { useBackHandler } from '@/hooks/use-back-handler'
import { useChatWhatsappStore } from '@/store/chats/chat-store'
import { useEffect } from 'react'

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
    <ThemedView className="flex-1 px-4">
      <HeaderChat />
      {showSearch && <SearchMessages />}

      <ContentMessage />

      <Footer />
    </ThemedView>
  )
}
