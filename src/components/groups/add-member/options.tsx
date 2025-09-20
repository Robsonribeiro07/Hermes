import { Button, ButtonText } from '@/components/ui/button'
import { usePromoteActionsGroup } from '@/hooks/whatsapp/group/use-promote-actions'
import { useSelectedContactStore } from '@/store/group/selected-contacts-store'
import { View } from 'react-native'

interface IOptionsHeader {
  groupId: string
}
const OptionsAddMember = ({ groupId }: IOptionsHeader) => {
  const { SelectedJid, handleclearSelectedContacts } = useSelectedContactStore()

  const { handleAddContact, loading } = usePromoteActionsGroup()

  const isDisabledButton = !SelectedJid.length || loading === 'add'

  return (
    <View className="w-full justify-between flex-row mt-2">
      <Button
        className="bg-blue-500 disabled:bg-secondary-800"
        disabled={isDisabledButton}
        onPress={handleclearSelectedContacts}
      >
        <ButtonText>Desmarca todos</ButtonText>
      </Button>
      <Button
        className="bg-blue-500 disabled:bg-secondary-800"
        disabled={isDisabledButton}
        onPress={() => handleAddContact({ participantId: SelectedJid, groupId })}
      >
        <ButtonText>{loading === 'add' ? 'carregando' : 'Adicionar'}</ButtonText>
      </Button>
    </View>
  )
}

export { OptionsAddMember }
