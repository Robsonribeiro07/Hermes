import { getUserId } from '@/database/MMKV/get-user-id'
import api from '@/lib/axios'

export interface IGroupParticipant {
  id: string
  isAdmin: boolean
  isSuperAdmin: boolean
  imgUrl: string | undefined
}

export interface IGroup {
  id: string
  subject: string
  creation: number
  owner: string
  participants: IGroupParticipant[]
  imgUrl: string
}

export interface IuserWhatsappData {
  userId?: string
  id?: string
  name?: string
  imgUrl?: string | null
  lid?: string
  jid?: string
  verifiedName?: string
  notify?: string
  connectedAt?: string | Date
  status?: string
  groups: IGroup[]
}

interface IUserWhatsappDataResponse {
  WhatsappData: IuserWhatsappData
}

export async function getUserData(): Promise<IuserWhatsappData | null> {
  const userId = getUserId()

  if (!userId) return null

  try {
    const response = await api.get<IUserWhatsappDataResponse>('user/get-user', {
      params: { jid: userId },
    })

    return response.data.WhatsappData
  } catch (err) {
    return null
  }
}
