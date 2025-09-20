import { getUserId } from '@/database/MMKV/get-user-id'
import api from '@/lib/axios'

export interface IPromoteParticipant {
  groupId: string
  participantId: string[] | undefined
  promote: 'add' | 'remove' | 'promote' | 'demote' | 'modify'
}

export async function PromoteToParticipant({
  groupId,
  participantId,
  promote,
}: IPromoteParticipant) {
  if (!groupId || !participantId || !promote) return

  const { id } = getUserId()

  try {
    const response = await api.post('group/promote-to-group', {
      userId: id,
      participantId,
      promote,
      groupId,
    })

    return response.data
  } catch (err) {
    return err
  }
}
