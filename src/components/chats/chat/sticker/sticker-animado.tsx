import { useStickerStateStore } from '@/store/whatsapp/chats/sticker/use-sticker-store'
import React, { useRef } from 'react'
import { Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'
interface IStickerAnimated {
  uri: string
}
export function StickerAnimado({ uri }: IStickerAnimated) {
  const { setContent } = useStickerStateStore()

  const touchStart = useRef<{ y: number; timer: number | null }>(null)

  const handleTouchStart = (event: any) => {
    const { pageY } = event.nativeEvent
    touchStart.current = { y: pageY, timer: Date.now() }
  }

  const handlePress = (event: any) => {
    if (!touchStart.current) return

    const { pageY } = event.nativeEvent as { pageY: number }
    const deltaY = Math.abs(pageY - touchStart.current.y)
    const duration = Date.now() - touchStart.current.timer!

    if (deltaY < 15 && duration < 300) {
      setContent(uri)
    }
  }
  return (
    <Pressable onTouchStart={handleTouchStart} onPress={handlePress}>
      <FastImage
        style={{
          height: 200,
          width: 200,
        }}
        source={{
          uri,
        }}
        resizeMode="contain"
      />
    </Pressable>
  )
}
