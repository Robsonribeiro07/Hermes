import { useChatWhatsapp } from '@/hooks/whatsapp/chats/chat/use-chat-whatsapp'
import { FlatList, ImageBackground } from 'react-native'
import { MessageChat } from './message'

export function ContentMessage() {
  const { filteredMessages } = useChatWhatsapp()

  if (!filteredMessages) return null

  return (
    <ImageBackground
      className="flex-1"
      source={require('../../../assets/images/background-chat.jpeg')}
    >
      <FlatList
        className="w-full mb-6"
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
            thinkingMessage={item.thinkingMessage}
            type={item.type}
            isComplete={item.isComplete}
          />
        )}
      />
    </ImageBackground>
  )
}
