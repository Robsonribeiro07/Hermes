import api from '@/lib/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IuserWhatsappData } from '../user/get-user-data'

export interface IRemoveToParticipant {
  groupId: string | undefined
  participantsToRemove: string[] | undefined
}

export async function RemoveToParticipantGroup({
  groupId,
  participantsToRemove,
}: IRemoveToParticipant): Promise<IuserWhatsappData | null> {
  const userId = await AsyncStorage.getItem('userId')

  if (!userId) {
    console.warn('user no found asyc storage')
  }
  try {
    const response = await api.post<IuserWhatsappData>('group/remove-participant', {
      groupId,
      participantsToRemove,
      userId,
    })

    return response.data
  } catch (err) {
    return null
  }
}
