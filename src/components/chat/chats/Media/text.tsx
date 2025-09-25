import { ActivityIndicator, Text, View } from 'react-native'

interface ITextMedia {
  fromMe?: boolean
  content: string
  sending: boolean
}

export function TextMedia({ fromMe, content, sending }: ITextMedia) {
  if (sending) {
    return (
      <View className="bg-secondary-800 min-h-[60px]">
        <Text
          className={`font-poppins p-3 font-light ${fromMe ? 'text-white' : 'text-black'}`}
          numberOfLines={0}
        >
          {content}
        </Text>

        <View className="px-3 pb-2 items-end">
          <ActivityIndicator size="small" color={fromMe ? '#ffffff' : '#666666'} />
        </View>
      </View>
    )
  }

  return (
    <Text
      className={`font-poppins p-3 font-light ${fromMe ? 'text-white' : 'text-black'}`}
      numberOfLines={0}
    >
      {content}
    </Text>
  )
}
