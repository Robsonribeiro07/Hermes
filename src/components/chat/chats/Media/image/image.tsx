import LottieView from 'lottie-react-native'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import FastImage from 'react-native-fast-image'

interface IMessageImg {
  content: string
  id?: string
  isVisible?: boolean
}

export const ImageMedia = React.memo(({ content }: IMessageImg) => {
  const { width } = useWindowDimensions()

  const imageSize = Math.min(width * 0.65, 250)
  const lottieSize = Math.min(width * 0.5, 150)

  return content ? (
    <View className="w-full items-center p-1">
      <FastImage
        style={{
          width: imageSize,
          height: imageSize * 0.75,
          borderRadius: 12,
        }}
        source={{
          uri: content,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  ) : (
    <View className="items-center justify-center p-4">
      <LottieView
        source={{
          uri: 'https://lottie.host/308173a4-0621-47bc-8cfe-ddf27e415895/z35aLTI1id.lottie',
        }}
        loop
        autoPlay
        style={{
          width: lottieSize,
          height: lottieSize,
        }}
      />
    </View>
  )
})
