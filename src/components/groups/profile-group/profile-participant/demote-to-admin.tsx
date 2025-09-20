import { Button, ButtonText } from '@/components/ui/button'
import { usePromoteActionsGroup } from '@/hooks/whatsapp/group/use-promote-actions'
import { Ionicons } from '@expo/vector-icons'

interface IPromoteToAdmin {
  groupId: string
  participantId: string | undefined
}
const DemoteToAdmin = ({ groupId, participantId }: IPromoteToAdmin) => {
  const { handleDemoteToAdmin, loading } = usePromoteActionsGroup()
  return (
    <Button
      className=" h-12 bg-blue-500 "
      action="secondary"
      variant="solid"
      disabled={loading === 'demote'}
      onPress={() =>
        handleDemoteToAdmin({
          groupId,
          participantId,
        })
      }
    >
      <Ionicons name="shield-outline" size={20} color="#fff" />
      <ButtonText className="text-white font-poppins">
        {loading === 'demote' ? 'carregando' : 'Demote To admin'}
      </ButtonText>
    </Button>
  )
}

export { DemoteToAdmin }
