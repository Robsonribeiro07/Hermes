import { getSocketServices } from '@/services/socket'
import { useEffect, useState } from 'react'

export function useListtenQRCode() {
  const [status, setStatus] = useState('aguardando QR scan')

  const socket = getSocketServices()

  useEffect(() => {
    const handleConnected = (data: { userId: string }) => {
      setStatus('Bot conectado!')
    }

    socket.on('connected', handleConnected)

    return () => {
      socket.off('connected', handleConnected)
    }
  }, [socket])

  return {
    status,
  }
}
