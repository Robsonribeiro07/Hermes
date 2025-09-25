import { Center } from '@/components/ui/center'
import { Skeleton } from '@/components/ui/skeleton'
import LottieView from 'lottie-react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import FastImage from 'react-native-fast-image'

interface IMessageImg {
  content: string
  id?: string
  isVisible?: boolean
}
export const ImageMedia = React.memo(({ content, id, isVisible }: IMessageImg) => {
  const { width } = useWindowDimensions()
  if (!isVisible) {
    return <Skeleton className="w-full h-60 bg-gray-300" />
  }
  return content ? (
    <Center className="w-full p-1 rounded-2xl flex-1 bg-green-400">
      <FastImage
        style={{
          width: width * 0.6,
          aspectRatio: 1,
        }}
        source={{
          uri: content,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Center>
  ) : (
    <LottieView
      source={{ uri: 'https://lottie.host/308173a4-0621-47bc-8cfe-ddf27e415895/z35aLTI1id.lottie' }}
      loop
      autoPlay
      style={{
        width: 300,
        height: 300,
      }}
    />
  )
})
