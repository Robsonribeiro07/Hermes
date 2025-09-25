import { Button, ButtonText } from '@/components/ui/button'
import { usePromoteActionsGroup } from '@/hooks/whatsapp/group/use-promote-actions'
import { Ionicons } from '@expo/vector-icons'

interface IPromoteToAdmin {
  groupId: string
  participantId: string
}
const PromoteToAdmin = ({ groupId, participantId }: IPromoteToAdmin) => {
  const { handlePromoteToAdmin, loading } = usePromoteActionsGroup()

  return (
    <Button
      className=" h-12 bg-blue-500 "
      action="secondary"
      variant="solid"
      disabled={loading !== null}
      onPress={() =>
        handlePromoteToAdmin({
          groupId,
          participantId: [participantId],
        })
      }
    >
      <Ionicons name="shield-outline" size={20} color="#fff" />
      <ButtonText className="text-white font-poppins">
        {loading === 'promote' ? 'Carregando..,' : 'Promote To admin'}
      </ButtonText>
    </Button>
  )
}

export { PromoteToAdmin }
