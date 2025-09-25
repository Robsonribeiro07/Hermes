import { IGroup } from '@/api/user/get-user-data'
import { GroupsInfos } from '@/components/groups/groups-infos'
import { HeaderGroup } from '@/components/groups/header'
import { NotGrups } from '@/components/groups/not-grups'
import { ActionSheetProfileGroup } from '@/components/groups/profile-group/action-sheet'
import { SearchGrups } from '@/components/groups/search-grups'
import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useGroups } from '@/hooks/database/use-groups'
import { useTheme } from '@/theme/theme-context'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

export default function GroupScreen() {
  const { colors } = useTheme()

  const { groups } = useGroups()

  const [groupInfo, setGroupsInfo] = useState<IGroup | undefined>()

  const handleGroup = (group: IGroup) => setGroupsInfo(group)

  const handleClearGroup = () => setGroupsInfo(undefined)

  useEffect(() => {
    const findGroupUpdate = groups?.find((g) => g.id === groupInfo?.id)

    if (!findGroupUpdate) return
    handleGroup(findGroupUpdate)
  }, [groups])
  return (
    <>
      <ThemedView className="flex-1">
        <HeaderGroup />
        <SearchGrups />

        {groups ? (
          <ScrollView
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 40, paddingTop: 30 }}
            showsVerticalScrollIndicator={false}
          >
              <ThemedText/>
            <ThemedText
              text="Meus Grupos"
              className="mt-3  text-left w-full"
              lightColor={colors.primary}
            />
            {groups?.map((g) => (
              <GroupsInfos
                onPress={() => handleGroup(g)}
                name={g.subject}
                members={g.participants.length.toString()}
                key={g.id}
                ImgUrl={g.imgUrl}
              />
            ))}
          </ScrollView>
        ) : (
          <NotGrups />
        )}
      </ThemedView>
      <ActionSheetProfileGroup GroupData={groupInfo} handleClose={handleClearGroup} />
    </>
  )
}
