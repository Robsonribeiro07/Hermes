import { useEmojiStore } from '@/store/whatsapp/chats/emojis/use-emoji-store'
import { useMemo } from 'react'
import { mappedEmojis } from './maped-emojis'

export function useEmojis() {
  const { currentSection } = useEmojiStore()

  const currentEmojis = useMemo(() => {
    return mappedEmojis[currentSection]
  }, [currentSection])

  return {
    currentEmojis,
  }
}
