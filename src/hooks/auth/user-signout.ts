import { IsignOut, IsignOutResponse, SignUpAPi } from '@/api/user/sign-up'
import { getUserId } from '@/database/MMKV/get-user-id'
import { userStore } from '@/store/QRcode/user-store'
import { setQRcodeStore } from '@/utils/bot/set-qr-code'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

export function useSignUp() {
  const { replace } = useRouter()
  const { setId } = userStore()

  const { mutate, isPending, error } = useMutation<IsignOutResponse, Error, IsignOut>({
    mutationFn: (formData) => SignUpAPi(formData),
    onSuccess: (data) => {
      const { QRcode, base64, user, message, statusBot } = data

      if (message === 'bot-connectado' && statusBot === true) {
        replace('/(private)/(home)/home')
        return
      }

      setQRcodeStore({ base64, qr: QRcode })
      setId(user.id)

      replace({
        pathname: '/sign-up/qr/[qrCode]',
        params: { qrCode: encodeURIComponent(QRcode) },
      })
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })

  const handleSubmitFn = async () => {
    const id = getUserId()

    if (!id) return
    mutate({ id: id! })
  }

  return {
    mutationError: error,
    isPending,
    handleSubmitFn,
  }
}
