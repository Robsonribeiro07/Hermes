import { ContentChat } from '@/components/chats/content-chat'
import { HeaderChat } from '@/components/chats/header/header-chat'
import ThemedView from '@/components/theme/themed-view'

export default function Chats() {
  return (
    <ThemedView className="py-3">
      <HeaderChat />
      <ContentChat />
    </ThemedView>
  )
}
