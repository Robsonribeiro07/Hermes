import { SycronizeAllData } from '@/api/user/sycronize-all-data'
import Constants from 'expo-constants'
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

const SOCKET_URL = Constants.expoConfig?.extra?.apirUrl

if (!SOCKET_URL) {
  throw new Error('❌ API_URL não definido! Verifique o app.config.js e as variáveis de ambiente.')
}
export const initSocket = async (userId: string) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
      auth: {
        userId,
      },
    })
  }

  await SycronizeAllData()
}
export const getSocketServices = (): Socket => {
  if (!socket) throw new Error('socker not initilzized. Call IniitSocket() fisrt')

  return socket
}
