import { useStickerStateStore } from '@/store/whatsapp/chats/sticker/use-sticker-store'
import FastImage from 'react-native-fast-image'
interface IStickerAnimated {
  uri: string
}
export function StickerAnimado({ uri }: IStickerAnimated) {
  const { setContent } = useStickerStateStore()
  return (
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
  )
}
