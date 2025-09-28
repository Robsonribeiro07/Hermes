import { useChatIAStore } from '@/store/IA/chat-store'
import { FlatList } from 'react-native'
import { Message } from './message'

export function MessageContent() {
  const { chats } = useChatIAStore()

  if (!chats) return null
  return (
    <FlatList
      className="w-full mb-6"
      inverted
      data={chats}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={5}
      windowSize={5}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      renderItem={({ item }) => (
        <Message
          content={item.content}
          date={item.date}
          id={item.id}
          fromMe={item.fromMe}
          thinkingMessage={item.thinkingMessage}
          type={item.type}
          isComplete={item.isComplete}
        />
      )}
    />
  )
}
