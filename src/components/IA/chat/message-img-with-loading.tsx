import { Image } from '@/components/ui/image'
import LottieView from 'lottie-react-native'

interface IMessageImg {
  isComplete: boolean
  content: string
  id: string
}
export function MessageImgWithLoading({ isComplete, content, id }: IMessageImg) {
  return isComplete ? (
    <Image
      className="w-full h-auto"
      source={{
        uri: content,
        height: 300,
      }}
      alt={id}
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
