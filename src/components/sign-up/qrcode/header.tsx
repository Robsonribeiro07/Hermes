import { ThemedText } from '@/components/theme/themed-text'
import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WithoutAnotherCell } from './without-another-cell'

const HeaderQrCode = () => {
  const { colors } = useTheme()
  return (
    <SafeAreaView edges={['top']}>
      <View className="flex-row items-center  justify-between  p-3">
        <Ionicons name="arrow-back" color={colors.text} size={20} />
        <ThemedText text="QR Code" color={colors.text} />
        <WithoutAnotherCell />
      </View>
    </SafeAreaView>
  )
}
export { HeaderQrCode }
