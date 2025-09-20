import { Socket } from 'socket.io-client'

const registeredListeners: Record<string, boolean> = {}
export function onceWithCleanup(socket: Socket, event: string, cb: (...args: any[]) => void) {
  if (registeredListeners[event]) return

  socket.on(event, cb)
  registeredListeners[event] = true

  return () => {
    socket.off(event, cb)
    registeredListeners[event] = false
  }
}
