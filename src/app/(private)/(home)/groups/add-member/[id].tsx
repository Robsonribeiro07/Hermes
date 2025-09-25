import { CheckContact } from '@/components/groups/add-member/contact'
import { HeaderAddMember } from '@/components/groups/add-member/header'
import { OptionsAddMember } from '@/components/groups/add-member/options'
import { SearchMember } from '@/components/groups/add-member/search-member'
import ThemedView from '@/components/theme/themed-view'
import { useAddMemberGroup } from '@/hooks/whatsapp/group/use-add-member'
import { useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native'

interface IAddMemberParams {
  id: string
}
export default function AddMemberScreen() {
  const route = useRoute()
  const { id } = route.params as IAddMemberParams
  const {
    filteredContactsWithInput,
    SelectedJid,
    handleSelectedContacts,
    groupAddedToMember,
    handleChangeText,
  } = useAddMemberGroup(id)

  return (
    <ThemedView className="flex-1 px-4">
      <HeaderAddMember />

      <SearchMember onChangeText={handleChangeText} />
      <OptionsAddMember groupId={id} />

      <FlatList
        className="mt-4"
        data={filteredContactsWithInput}
        keyExtractor={(data) => data.jid}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const checked = SelectedJid.some((c) => c === item.jid)

          const AlreadyInGroup =
            groupAddedToMember && groupAddedToMember.participants.some((p) => p.id === item.jid)

          return (
            <CheckContact
              name={item.name}
              checked={checked}
              handleSelectContact={handleSelectedContacts}
              jid={item.jid}
              alreadyInGroup={AlreadyInGroup}
            />
          )
        }}
      />
    </ThemedView>
  )
}
