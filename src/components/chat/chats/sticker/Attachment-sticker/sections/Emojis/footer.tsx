import { Center } from '@/components/ui/center'
import { EmojiSection } from '@/hooks/whatsapp/chats/chat/emojis/maped-emojis'
import { useEmojiStore } from '@/store/whatsapp/chats/emojis/use-emoji-store'
import { Text, TouchableOpacity } from 'react-native'

const buttonsSectionsEmojiChanger: Record<EmojiSection, string> = {
  smileys: '😀',
  nature: '🐶',
  food: '🍔',
  activities: '⚽',
  flags: '❤️',
  objects: '💡',
  people: '🧑',
  travel: '✈️',
  symbols: '🔣',
}
export function ButtonChangerCategoryEmoji() {
  const { setSection } = useEmojiStore()

  return (
    <Center className="justify-between flex-row  p-2">
      {Object.entries(buttonsSectionsEmojiChanger).map(([category, emoji]) => (
        <TouchableOpacity key={category} onPress={() => setSection(category as EmojiSection)}>
          <Text className="text-2xl">{emoji}</Text>
        </TouchableOpacity>
      ))}
    </Center>
  )
}
