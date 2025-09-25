import { ActivityIndicator, Text, View } from 'react-native'

interface ITextMedia {
  fromMe?: boolean
  content: string
  sending: boolean
}
export function TextMedia({ fromMe, content, sending }: ITextMedia) {
  console.log(sending)

  const bgSendingMessage = sending ? 'bg-secondary-800' : 'bg-background-green'

  if (sending)
    return (
      <View className={bgSendingMessage}>
        <Text
          className={`font-poppins p-3 flex-1 font-light   ${fromMe ? 'text-white' : 'text-black'}`}
        >
          {content}
        </Text>

        <ActivityIndicator className="items-end" />
      </View>
    )
  return (
    <Text
      className={`font-poppins p-3 flex-1 font-light   ${fromMe ? 'text-white' : 'text-black'}`}
    >
      {content}
    </Text>
  )
}
