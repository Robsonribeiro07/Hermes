import { IuserWhatsappData } from '@/api/user/get-user-data'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function updateLocalUserdata(newData: IuserWhatsappData) {
  try {
    const storeDataSt = await AsyncStorage.getItem('userData')
    const storedData: IuserWhatsappData | null = storeDataSt ? JSON.parse(storeDataSt) : null

    const newUpdateAt = new Date(newData.connectedAt || 0).getTime()

    const storeUpdateAt = storedData ? new Date(storedData.connectedAt || 0).getTime() : 0

    if (newUpdateAt > storeUpdateAt) {
      console.log('dados mas recentes atualizado')
      await AsyncStorage.setItem('userData', JSON.stringify(newData))
    }
    return storedData
  } catch (err) {
    console.log('Error ao atualizar')
  }
}
