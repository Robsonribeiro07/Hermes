import { useTheme } from '@/theme/theme-context'
import { View } from 'react-native'
import { ThemedText } from '../theme/themed-text'
import ThemedView from '../theme/themed-view'
import { AvatarProfile } from '../user/avatar-profile'
import { MoreOptionsGroup } from './more-options-group'

interface IgroupsInfos {
  name: string
  members: string
  ImgUrl: string
}
const GroupsInfos = ({ name, members, ImgUrl }: IgroupsInfos) => {
  const { colors } = useTheme()
  return (
    <ThemedView
      className="w-full h-32 rounded-2xl flex-row items-center px-3 my-3  "
      lightColor={colors.blueText}
    >
      <AvatarProfile withBorder ImgUrl={ImgUrl} />

      <View className="flex-row justify-between flex-1 px-3">
        <View>
          <ThemedText text={name} lightColor={colors.foreground} size={14} />
          <ThemedText text={members} className="opacity-70" lightColor={colors.primary} size={12} />
        </View>

        <MoreOptionsGroup />
      </View>
    </ThemedView>
  )
}

export { GroupsInfos }
