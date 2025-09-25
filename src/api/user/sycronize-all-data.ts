import { storaged } from '@/database/MMKV'
import api from '@/lib/axios'
import { useUserContactPersistStore } from '@/store/whatsapp/use-contact-store'

export async function SycronizeAllData() {
  const contacts = useUserContactPersistStore.getState().contacts
  const userDataStr = storaged.getString('userData')
  const userData = userDataStr ? JSON.parse(userDataStr) : null

  const userId = storaged.getString('userId')

  const allData = {
    userData,
    contacts,
  }

  try {
    const response = await api.post('user/sycronize-all-data', { data: allData, userId })
    console.log('Sincronização concluída:', response.data)
    return response.data
  } catch (err) {}
}
