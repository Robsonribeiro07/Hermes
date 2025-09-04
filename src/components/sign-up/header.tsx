import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { ThemedText } from '../theme/themed-text'
import ThemedView from '../theme/themed-view'

function Header() {
  const { colors } = useTheme()

  const { push } = useRouter()

  return (
    <ThemedView className="items-center" onTouchStart={() => push('/(private)/home')}>
      <MotiView
        from={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0.4 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      >
        <Ionicons name="planet-sharp" size={50} color={colors.blueText} />
      </MotiView>

      <ThemedText text="Loop" size={30} weight={'bold'} />
      <ThemedText text="Welcome Back! please log in" fontFamily="Poppins" />
    </ThemedView>
  )
}

export { Header }
