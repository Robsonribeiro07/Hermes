import { IPromoteParticipant, PromoteToParticipant } from '@/api/group/promote-to-participant'
import { useSelectedContactStore } from '@/store/group/selected-contacts-store'
import { useState } from 'react'

interface IPromoteActionsGroup extends Omit<IPromoteParticipant, 'promote'> {}

type IPromoteLoading = 'add' | 'remove' | 'promote' | 'demote' | 'modify'
export function usePromoteActionsGroup() {
  const [loading, setLoading] = useState<IPromoteLoading | null>(null)

  const { handleclearSelectedContacts } = useSelectedContactStore()

  const handlePromoteToAdmin = async ({ participantId, groupId }: IPromoteActionsGroup) => {
    setLoading('promote')

    try {
      const result = await PromoteToParticipant({ promote: 'promote', groupId, participantId })

      console.log(result)
    } catch (err) {
    } finally {
      setLoading(null)
    }
  }

  const handleDemoteToAdmin = async ({ participantId, groupId }: IPromoteActionsGroup) => {
    setLoading('demote')
    try {
      await PromoteToParticipant({ promote: 'demote', groupId, participantId })
    } catch (err) {
    } finally {
      setLoading(null)
    }
  }

  const handleRemoveToParticipant = async ({ participantId, groupId }: IPromoteActionsGroup) => {
    setLoading('remove')
    try {
      await PromoteToParticipant({ promote: 'remove', groupId, participantId })
    } catch (err) {
    } finally {
      setLoading(null)
    }
  }

  const handleAddContact = async ({ participantId, groupId }: IPromoteActionsGroup) => {
    setLoading('add')
    try {
      await PromoteToParticipant({ promote: 'add', groupId, participantId })
      handleclearSelectedContacts()
    } catch (err) {
    } finally {
      setLoading(null)
    }
  }

  return {
    handleDemoteToAdmin,
    handlePromoteToAdmin,
    handleRemoveToParticipant,
    loading,
    handleAddContact,
  }
}
