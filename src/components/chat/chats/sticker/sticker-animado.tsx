import { useStickerStateStore } from '@/store/whatsapp/chats/sticker/use-sticker-store'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
interface IStickerAnimated {
  uri: string
}
export function StickerAnimado({ uri }: IStickerAnimated) {
  const { setContent } = useStickerStateStore()
  return (
    <TouchableOpacity onPress={() => setContent(uri)}>
      <FastImage
        style={{
          height: 200,
          width: 200,
        }}
        source={{
          uri,
        }}
        resizeMode="contain"
        onTouchStart={() => setContent(uri)}
      />
    </TouchableOpacity>
  )
}
