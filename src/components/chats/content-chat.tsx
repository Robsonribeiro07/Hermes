import { useChatStore } from '@/store/whatsapp/chats/chat-message-store'
import { FlatList } from 'react-native'
import { Chat } from './chat'
import { FilterChat } from './chat/filter-chat'
import { SearchChat } from './header/search-chat'

export function ContentChat() {
  const { chats } = useChatStore()
  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.user.id}
      ListHeaderComponent={
        <>
          <SearchChat />
          <FilterChat />
        </>
      }
      renderItem={({ item }) => <Chat user={item.user.name || item.user.id} avatarUrl={item.user.imgUrl} />}
    />
  )
}
