import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const HeaderProfileScreen = () => {
  const { colors } = useTheme()
  return (
    <SafeAreaView edges={['top']}>
      <ThemedView className="flex-row justify-between py-3 w-full">
        <Ionicons name="arrow-back" size={25} color={colors.primary} />
        <ThemedText text="Profile" size={20} lightColor={colors.primary} />
        <ThemedText />
      </ThemedView>
    </SafeAreaView>
  )
}

export { HeaderProfileScreen }
