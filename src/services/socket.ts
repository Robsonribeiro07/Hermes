import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL

export const getSocketServices = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
    })
  }

  return socket
}
