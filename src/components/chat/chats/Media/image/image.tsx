import LottieView from 'lottie-react-native'
import FastImage from 'react-native-fast-image'

interface IMessageImg {
  content: string
  id?: string
}
export function ImageMedia({ content, id }: IMessageImg) {
  return content ? (
    <FastImage
      className="w-full px-10 flex-1"
      style={{
        height: 400,
        width: 300,

        flex: 1,
      }}
      resizeMode="cover"
      source={{
        uri: content,
      }}
    />
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
}
