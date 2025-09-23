import { useChatWhatsapp } from '@/hooks/whatsapp/chats/chat/use-chat-whatsapp'
import { FlatList } from 'react-native'
import { MessageChat } from './message'

export function ContentMessage() {
  const { filteredMessages, user } = useChatWhatsapp()

  if (!filteredMessages) return null

  return (
    <FlatList
      className="w-full mb-6 px-2"
      inverted
      data={filteredMessages}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={5}
      windowSize={5}
      maxToRenderPerBatch={10}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MessageChat
          content={item.content}
          date={new Date(item.date)}
          id={item.id}
          fromMe={item.fromMe}
          type={item.type}
          imgUrl={user?.user.imgUrl}
          sending={item.sending}
        />
      )}
    />
  )
}
