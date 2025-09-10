import { useSyncUserData } from '@/hooks/database/use-sync-user-data'
import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '../theme/themed-text'
import { AvatarProfile } from '../user/avatar-profile'

const Header = () => {
  const { colors, mode } = useTheme()
  const { data } = useSyncUserData()

  return (
    <SafeAreaView edges={['top']}>
      <View className="h-16 flex-row items-center justify-between  relative mb-5">
        <Ionicons name="menu" size={24} color={colors.text} />
        <ThemedText text="Dasboard" size={20} color={colors.text} />
        <AvatarProfile ImgUrl={data?.imgUrl} />
      </View>
    </SafeAreaView>
  )
}

export default Header
