import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL

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
