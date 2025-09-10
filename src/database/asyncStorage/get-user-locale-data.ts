import { IuserWhatsappData } from '@/api/user/get-user-data'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getUserLocaledata() {
  try {
    const raw = await AsyncStorage.getItem('userData')
    return raw ? (JSON.parse(raw) as IuserWhatsappData) : null
  } catch (err) {
    return null
  }
}
