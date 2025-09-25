import { useLazyLoading } from '@/hooks/whatsapp/chats/chat/use-lazzy-loading'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import { useCallback } from 'react'
import { FlatList } from 'react-native'
import { MessageChat } from './message'

export function ContentMessage() {
  const { filteredMessages, viewedItems, onViewableItemsChanged, viewabilityConfig } =
    useLazyLoading()
  const renderItem = useCallback(
    ({ item }: { item: IContentMessage }) => {
      const isVisible = viewedItems.includes(item.id.toString())
      return <MessageChat {...item} isVisible={isVisible} />
    },
    [viewedItems],
  )

  if (!filteredMessages) return null

  return (
    <FlatList
      className="w-full mb-6 px-2"
      inverted
      data={filteredMessages}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      showsVerticalScrollIndicator={false}
    />
  )
}
