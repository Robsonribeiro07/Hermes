import { useChatWhatsapp } from '@/hooks/whatsapp/chats/chat/use-chat-whatsapp'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import { useCallback } from 'react'
import { FlatList } from 'react-native'
import { MessageChat } from './message/message'

export function ContentMessage() {
  const { filteredMessages } = useChatWhatsapp()

  const renderItem = useCallback(({ item }: { item: IContentMessage }) => {
    return <MessageChat {...item} key={item.id} />
  }, [])

  return (
    <FlatList
      className="w-full mb-6 px-2"
      inverted
      data={filteredMessages}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={10}
      windowSize={10}
      maxToRenderPerBatch={10}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      scrollEnabled
      scrollEventThrottle={16}
      updateCellsBatchingPeriod={50}
      decelerationRate="normal"
      bouncesZoom={false}
      bounces
    />
  )
}
