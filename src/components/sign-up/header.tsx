import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useWindowDimensions } from 'react-native'
import { ThemedText } from '../theme/themed-text'
import ThemedView from '../theme/themed-view'

function Header() {
  const { push } = useRouter()

  const { width } = useWindowDimensions()
  return (
    <ThemedView className="items-center" onTouchStart={() => push('/(private)/(home)/home')}>
      <LottieView
        autoPlay
        loop
        source={require('../../assets/images/animation/ArtificialIntelligenceChatbot.json')}
        style={{ width: width * 0.8, height: width * 0.8 }}
      />

      <ThemedText text="Hermes" size={30} weight={'bold'} />
    </ThemedView>
  )
}

export { Header }
