import { IRemoveToParticipant, RemoveToParticipantGroup } from '@/api/group/remove-to-participant'
import { useMutation } from '@tanstack/react-query'

export function useActionParticipantToGroup() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: RemoveToParticipantGroup,
    onSuccess(data, variables, context) {
      console.log(data)
    },
  })

  const handleSubmitRemoveParticipant = ({
    groupId,
    participantsToRemove,
  }: IRemoveToParticipant) => {
    mutate({ groupId, participantsToRemove })
  }

  return {
    handleSubmitRemoveParticipant,
  }
}
