import { IuserWhatsappData } from '@/api/user/get-user-data'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function updateLocalUserdata(newData: IuserWhatsappData) {
  try {
    const storeDataSt = await AsyncStorage.getItem('userData')
    let storedData: IuserWhatsappData | null = null

    if (storeDataSt) {
      try {
        storedData = JSON.parse(storeDataSt)
      } catch (err) {
        console.warn('Conteúdo antigo inválido no AsyncStorage, será sobrescrito.', storeDataSt)
        storedData = null
      }
    }

    const newUpdateAt = newData.connectedAt ? new Date(newData.connectedAt).getTime() : 0
    const storeUpdateAt = storedData?.connectedAt ? new Date(storedData.connectedAt).getTime() : 0

    if (newUpdateAt > storeUpdateAt) {
      console.log('Dados mais recentes, atualizando...')
      await AsyncStorage.setItem('userData', JSON.stringify(newData))
    }

    return storedData
  } catch (err) {
    console.error('Erro ao atualizar AsyncStorage', err)
    return null
  }
}
