import { Box } from '@/components/ui/box'
import { Center } from '@/components/ui/center'
import { useStickerStateStore } from '@/store/whatsapp/chats/sticker/use-sticker-store'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'react-native'
import FastImage from 'react-native-fast-image'

export function Header() {
  const { content } = useStickerStateStore()

  return (
    <Box className="relative w-full items-center">
      <Ionicons name="logo-xbox" size={30} className="absolute top-0 left-0" />

      <FastImage
        source={{
          uri:
            content.image ||
            'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png',
        }}
        style={{
          height: 150,
          width: 150,
          borderRadius: 5,
        }}
      />

      <Center className="flex-row gap-3 mt-5 ">
        <Text className="font-poppins text-md text-primary-600">Custom sticker Creator</Text>
        <Text className="font-poppins text-sm">PhotoAppWorld.com</Text>
      </Center>
    </Box>
  )
}
