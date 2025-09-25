import { Button, ButtonText } from '@/components/ui/button'
import { usePromoteActionsGroup } from '@/hooks/whatsapp/group/use-promote-actions'
import { Ionicons } from '@expo/vector-icons'

interface IRemoveGroup {
  groupId: string | undefined
  participantId: string
}
const RemoveFromGroup = ({ groupId, participantId }: IRemoveGroup) => {
  const { handleRemoveToParticipant, loading } = usePromoteActionsGroup()

  return (
    <Button
      className="bg-white h-12  "
      action="secondary"
      variant="solid"
      onPress={() => handleRemoveToParticipant({ groupId: groupId!, participantId })}
    >
      <Ionicons name="person-add-outline" size={20} color="#ef4444" />
      <ButtonText className="text-red-500 font-poppins" disabled={loading === 'remove'}>
        {loading ? 'Removendo' : 'Remove from Group'}
      </ButtonText>
    </Button>
  )
}

export { RemoveFromGroup }
