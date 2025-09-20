import { useChatWhatsapp } from '@/hooks/whatsapp/chats/chat/use-chat-whatsapp'
import { Text } from 'react-native'

interface ITextWithFilterRegex {
  content: string
}
export function TextWhiteRegex({ content }: ITextWithFilterRegex) {
  const { inputTextFilter } = useChatWhatsapp()

  if (!inputTextFilter) return <Text>{content}</Text>

  const splitRegex = new RegExp(`(${inputTextFilter})`, 'i')
  const parts = content.split(splitRegex)

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === inputTextFilter.toLowerCase() ? (
          <Text key={index} className="text-red-500">
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        ),
      )}
    </>
  )
}
