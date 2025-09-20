import { IuserWhatsappData } from '@/api/user/get-user-data'
import { storageID } from '.'

export async function getUserLocaledata() {
  try {
    const raw = storageID.getString('userData')
    return raw ? (JSON.parse(raw) as IuserWhatsappData) : null
  } catch (err) {
    return null
  }
}
