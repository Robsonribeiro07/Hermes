import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const HeaderGroup = () => {
  const { colors } = useTheme()
  return (
    <SafeAreaView edges={['top']}>
      <ThemedView className="flex-row justify-between py-3 w-full">
        <Ionicons name="arrow-back" size={25} color={colors.primary} />
        <ThemedText text="Groups" size={20} lightColor={colors.primary} />
        <ThemedText />
      </ThemedView>
    </SafeAreaView>
  )
}

export { HeaderGroup }
