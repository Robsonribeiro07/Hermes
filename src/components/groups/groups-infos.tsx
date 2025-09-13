import { useTheme } from '@/theme/theme-context'
import { TouchableOpacity, View } from 'react-native'
import { ThemedText } from '../theme/themed-text'
import ThemedView from '../theme/themed-view'
import { AvatarProfile } from '../user/avatar-profile'
import { MoreOptionsGroup } from './more-options-group'

interface IgroupsInfos {
  name: string
  members: string
  ImgUrl: string
  onPress: () => void
}
const GroupsInfos = ({ name, members, ImgUrl, onPress }: IgroupsInfos) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ThemedView
        className="w-full h-24 rounded-2xl flex-row items-center px-3 my-3  "
        lightColor={colors.secondary}
      >
        <AvatarProfile withBorder ImgUrl={ImgUrl} />

        <View className="flex-row justify-between flex-1 px-3">
          <View>
            <ThemedText text={name} lightColor={colors.foreground} size={14} />
            <ThemedText
              text={`Membros ${members}`}
              className="opacity-70"
              lightColor={colors.foreground}
              size={12}
            />
          </View>

          <MoreOptionsGroup />
        </View>
      </ThemedView>
    </TouchableOpacity>
  )
}

export { GroupsInfos }
