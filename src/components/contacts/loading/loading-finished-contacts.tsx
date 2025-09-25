import { useListenContactSync } from '@/hooks/whatsapp/use-listen-contact-sync'
import LottieView from 'lottie-react-native'
import { Text, View } from 'react-native'

const LoadingFinishedUploading = () => {
  const { loadingData } = useListenContactSync()

  return (
    <View className="flex-1  justify-center items-center">
      <LottieView
        source={{
          uri: 'https://lottie.host/e5612f9c-ee89-4ea8-b311-4189be157762/zqS3BKrXHM.lottie',
        }}
        autoPlay
        loop
        style={{
          height: 300,
          width: 300,
        }}
      />

      <Text className="font-poppins text-xl">
        Todos os contatos foram sicronizdos {loadingData?.total}
      </Text>
    </View>
  )
}

export { LoadingFinishedUploading }
