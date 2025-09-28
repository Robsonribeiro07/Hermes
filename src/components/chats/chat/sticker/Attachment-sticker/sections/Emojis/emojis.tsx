import { Box } from '@/components/ui/box'
import { useEmojis } from '@/hooks/whatsapp/chats/chat/emojis/use-emojis'
import { FlatList, Text } from 'react-native'
import { ButtonChangerCategoryEmoji } from './footer'
import { EmojiItem } from './item-emoji'

interface IsEmojisProps {
  comportment?: 'text' | 'reaction'
}
export function Emojis({ comportment = 'text' }: IsEmojisProps) {
  const { currentEmojis } = useEmojis()

  return (
    <Box className="flex-1">
      <Text className="text-base text-text-100 mb-2 font-poppins">Emojis Recents</Text>
      <FlatList
        style={{
          maxHeight: 50,
        }}
        keyExtractor={(item, index) => item + index}
        data={currentEmojis}
        horizontal
        numColumns={1}
        windowSize={5}
        renderItem={({ item }) => <EmojiItem emoji={item} key={item} comportment={comportment} />}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
      />

      <Text className="text-base text-text-100 my-2 font-poppins">All Emojis</Text>
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(item, index) => item + index}
        data={currentEmojis}
        showsVerticalScrollIndicator={false}
        numColumns={10}
        renderItem={({ item }) => <EmojiItem emoji={item} key={item} comportment={comportment} />}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
      />

      <ButtonChangerCategoryEmoji />
    </Box>
  )
}
