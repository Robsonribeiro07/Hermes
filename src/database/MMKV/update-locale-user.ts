import { IuserWhatsappData } from '@/api/user/get-user-data'
import { storaged } from '.'

export async function updateLocalUserdata(newData: IuserWhatsappData): Promise<IuserWhatsappData | null> {
  try {
    const storeDataSt = storaged.getString('userData')
    let storedData: IuserWhatsappData | null = null

    if (storeDataSt) {
      try {
        storedData = JSON.parse(storeDataSt)
      } catch (err) {
        storedData = null
      }
    }

    storaged.set('userData', JSON.stringify(newData))
    return newData
  } catch (err) {
    console.error('Erro ao atualizar dados no MMKV', err)
    return null
  }
}
