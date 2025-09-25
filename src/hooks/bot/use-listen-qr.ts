import { getSocketServices } from '@/services/socket'
import { useLoadingStore } from '@/store/QRcode/use-loading-data'
import { userStore } from '@/store/QRcode/user-store'
import { setQRcodeStore } from '@/utils/bot/set-qr-code'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

export function useListtenQRCode() {
  const [status, setStatus] = useState('aguardando QR scan')
  const [statusConnected, setStatusConnected] = useState<'off' | 'on'>('off')
  const { setText, setOpen, setClose, resetText } = useLoadingStore()
  const { setId } = userStore()
  const { replace } = useRouter()
  const socket = getSocketServices()

  useEffect(() => {
    resetText()
    const handleConnected = async (id: string) => {
      setStatus('Bot conectado!')
      setStatusConnected('on')

      try {
        await new Promise<void>((resolve, reject) => {
          const timer = setTimeout(() => {
            setText('Está demorando mais que o esperado....')
            reject(new Error('Timeout aguardando send-name-update'))
          }, 30000)
          socket.on('send-name-update', (newText: string) => {
            clearTimeout(timer)
            setText(newText)
            resolve()
          })
        })
      } catch (error) {}

      socket.once('finished', (userId: string) => {
        setId(userId)
        setText('Tudo Pronto...')
        setTimeout(setClose, 1000)
        setTimeout(() => replace('/(private)/(home)/settings'), 1500)
      })
    }

    const uploadingHandler = (id: string) => {
      console.log('aqui')
      setOpen()
      handleConnected(id)
    }
    socket.on('bot-connected', uploadingHandler)
    socket.once('uploading-data', uploadingHandler)
    socket.on('qrcode', ({ qr, base64 }: { qr: string; base64: string }) => {
      if (statusConnected === 'on') return
      setQRcodeStore({ qr, base64 })
    })

    return () => {
      socket.off('bot-connected', uploadingHandler)
      socket.off('qrcode')
      socket.off('finished')
    }
  }, [socket, statusConnected])

  return {
    status,
    statusConnected,
  }
}
