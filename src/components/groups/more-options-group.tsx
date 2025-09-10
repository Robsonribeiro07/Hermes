import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'

const MoreOptionsGroup = () => {
  const { colors } = useTheme()
  return <Ionicons name="settings-outline" size={30} color={colors.foreground} />
}

export { MoreOptionsGroup }
