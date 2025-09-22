import { AvatarProfile } from '@/components/user/avatar-profile'
import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { Text, View } from 'react-native'

interface IAudioPlayer {
  uri: string
}
export function AudioPlayer({ uri }: IAudioPlayer) {
  return (
    <View className="w-[80%] justify-between flex-row items-center ml-5  bg-secondary-400 p-5 rounded-2xl">
      <AvatarProfile />

      <Ionicons name="play" size={30} className="ml-2" />

      <Text className="font-poppins text-xl text-primary-300">00:00</Text>
      <LottieView
        source={{
          uri: 'https://lottie.host/bd82360e-f2e2-48d0-b623-9b92bf508720/3UOlh74ZoB.lottie',
        }}
        style={{
          flex: 1,
        }}
      />
      <Text className="font-poppins text-xl text-primary-300">2:00</Text>
    </View>
  )
}
