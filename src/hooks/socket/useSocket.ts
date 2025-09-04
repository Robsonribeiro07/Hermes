import { getSocketServices } from '@/services/socket'

export function useSocket() {
  const socket = getSocketServices()
  const connectSocket = (_id: string) => {
    return new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Socket timeout')), 10000)

      socket.emit('register', _id)

      clearTimeout(timeout)
      resolve(_id)
    })
  }

  return {
    connectSocket,
  }
}
