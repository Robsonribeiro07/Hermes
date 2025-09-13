import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV
const SOCKET_URL =
  APP_ENV === 'production' ? process.env.EXPO_PUBLIC_URL_API : process.env.EXPO_PUBLIC_URL_API_DEV

console.log('env', SOCKET_URL)
export const initSocket = async (userId: string) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
      auth: {
        userId,
      },
    })
  }
}
export const getSocketServices = (): Socket => {
  if (!socket) throw new Error('socker not initilzized. Call IniitSocket() fisrt')

  return socket
}
