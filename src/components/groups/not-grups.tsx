import LottieView from 'lottie-react-native'
import { useWindowDimensions } from 'react-native'
import { ThemedText } from '../theme/themed-text'
import ThemedView from '../theme/themed-view'

const NotGrups = () => {
  const { width } = useWindowDimensions()
  return (
    <ThemedView className="justify-center flex-1 items-center">
      <LottieView
        source={{
          uri: 'https://lottie.host/fa387a0a-5e0e-44f8-bf42-b6819571ec46/ygolwbhfKS.lottie',
        }}
        style={{ width: width, height: 300 }}
        autoPlay
      />

      <ThemedText text="Nenhum grupo encontrado" />
    </ThemedView>
  )
}

export { NotGrups }
