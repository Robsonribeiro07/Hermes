import { Animatedtext } from '@/components/animated-text'
import { useListenContactSync } from '@/hooks/whatsapp/use-listen-contact-sync'
import LottieView from 'lottie-react-native'
import { Text, View } from 'react-native'
import { Progress, ProgressFilledTrack } from '../../ui/progress'

const LoadingUpdateConctacts = () => {
  const { loadingData } = useListenContactSync()

  return (
    <View className="flex-1  justify-center items-center">
      <LottieView
        source={{
          uri: 'https://lottie.host/ea8ad94f-1b47-463d-91f4-796eaa3cb1bf/HSJNZTgm0y.lottie',
        }}
        autoPlay
        loop
        style={{
          height: 300,
          width: 300,
        }}
      />

      <View className="flex-row w-[90%] items-center gap-3">
        <Text className="font-poppins">{loadingData?.index}</Text>

        <Progress
          value={loadingData?.index}
          size="sm"
          orientation="horizontal"
          className="w-[70%] "
          max={loadingData?.total}
        >
          <ProgressFilledTrack className="bg-blue-500" />
        </Progress>

        <Text className="font-poppins">{loadingData?.total}</Text>
      </View>

      <View className="mt-5">
        <Text className="font-poppins text-2xl">
          Buscando por {<Animatedtext text={loadingData?.contact.name} />}
        </Text>
      </View>
    </View>
  )
}

export { LoadingUpdateConctacts }
