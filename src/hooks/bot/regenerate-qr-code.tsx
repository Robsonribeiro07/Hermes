import { regenerateQRCode } from '@/api/bot/regenerate-Qrcode'
import { userStore } from '@/store/QRcode/user-store'
import { setQRcodeStore } from '@/utils/bot/set-qr-code'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export function useRegenerateQRcode() {
  const [timer, setTimer] = useState(false)
  const { userId } = userStore()
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (id: string) => regenerateQRCode({ id }),
    onSuccess(data, variables, context) {
      if (!data) return

      const { base64, qr } = data

      setQRcodeStore({ base64, qr })

      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 5000)
    },
  })

  const handleSubmitFn = async () => {
    if (!userId) return
    mutate(userId)
  }

  return {
    isPending,
    timer,
    isError,
    handleSubmitFn,
  }
}
