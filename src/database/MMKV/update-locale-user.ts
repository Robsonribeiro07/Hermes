import { IuserWhatsappData } from '@/api/user/get-user-data'
import { storaged } from '.'

export async function updateLocalUserdata(
  newData: IuserWhatsappData,
): Promise<IuserWhatsappData | null> {
  try {
    const storeDataSt = storaged.getString('userData')
    let storedData: IuserWhatsappData | null = null

    if (storeDataSt) {
      try {
        storedData = JSON.parse(storeDataSt)
      } catch (err) {
        console.warn('Conteúdo antigo inválido no MMKV, será sobrescrito.', storeDataSt)
        storedData = null
      }
    }

    const newUpdateAt = newData.connectedAt ? new Date(newData.connectedAt).getTime() : 0
    const storeUpdateAt = storedData?.connectedAt ? new Date(storedData.connectedAt).getTime() : 0

    if (newUpdateAt > storeUpdateAt) {
      console.log('Dados mais recentes, atualizando...')
      console.log(newData)
      storaged.set('userData', JSON.stringify(newData))
      return newData
    }

    return storedData
  } catch (err) {
    console.error('Erro ao atualizar dados no MMKV', err)
    return null
  }
}
