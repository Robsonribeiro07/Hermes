import { IRemoveToParticipant, RemoveToParticipantGroup } from '@/api/group/remove-to-participant'
import { Button, ButtonText } from '@/components/ui/button'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

interface IRemoveGroup {
  id: string | undefined
  groupId: string | undefined
  onClose: () => void
}
const RemoveFromGroup = ({ id, groupId, onClose }: IRemoveGroup) => {
  const [loading, setLoading] = useState(false)
  const handleSubmitRemoveParticipant = async ({
    groupId,
    participantsToRemove,
  }: IRemoveToParticipant) => {
    try {
      setLoading(true)
      await RemoveToParticipantGroup({ groupId, participantsToRemove })

      onClose()
    } catch (err) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="bg-white h-12  "
      action="secondary"
      variant="solid"
      onPress={() => handleSubmitRemoveParticipant({ participantsToRemove: [id!], groupId })}
    >
      <Ionicons name="person-add-outline" size={20} color="#ef4444" />
      <ButtonText className="text-red-500 font-poppins" disabled={loading}>
        {loading ? 'Removendo' : 'Remove from Group'}
      </ButtonText>
    </Button>
  )
}

export { RemoveFromGroup }
