import { SOCKET_URL } from '@env'
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const getSocketServices = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    })
  }

  return socket
}
