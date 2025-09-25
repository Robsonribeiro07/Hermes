import { IUserContactStore } from '@/store/whatsapp/use-contact-store'
import type { PersistStorage, StorageValue } from 'zustand/middleware'
import { storaged } from '.'

export const mmkvStorage: PersistStorage<IUserContactStore> = {
  getItem: async (key: string): Promise<StorageValue<IUserContactStore> | null> => {
    const value = storaged.getString(key)
    if (!value) return null
    try {
      return JSON.parse(value)
    } catch (err) {
      console.warn("Error ao ler dados do MMKV, valor inválido:", value)
      return null
    }
  },

  setItem: async (key: string, value: StorageValue<IUserContactStore>) => {
    try {
      storaged.set(key, JSON.stringify(value))
    } catch (err) {
      console.error('Erro ao salvar dados no MMKV:', err)
    }
  },

  removeItem: async (key: string) => {
    storaged.remove(key)
  },
}
