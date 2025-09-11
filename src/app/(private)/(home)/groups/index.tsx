import { GroupsInfos } from '@/components/groups/groups-infos'
import { HeaderGroup } from '@/components/groups/header'
import { SearchGrups } from '@/components/groups/search-grups'
import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useGroups } from '@/hooks/database/use-groups'
import { useTheme } from '@/theme/theme-context'
import { ScrollView } from 'react-native'

export default function GroupScreen() {
  const { colors } = useTheme()

  const { groups } = useGroups()

  return (
    <ThemedView className="flex-1">
      <HeaderGroup />
      <SearchGrups />
      <ThemedText text="Meus Grupos" className="mt-3" lightColor={colors.primary} />

      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {groups?.map((g) => (
          <GroupsInfos
            name={g.subject}
            members={g.participants.length.toString()}
            key={g.id}
            ImgUrl={g.imgUrl}
          />
        ))}
      </ScrollView>
    </ThemedView>
  )
}
