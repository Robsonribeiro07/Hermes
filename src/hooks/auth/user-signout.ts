import { IsignOut, IsignOutResponse, SignUpAPi } from '@/api/user/sign-up'
import { userStore } from '@/store/QRcode/user-store'
import { setQRcodeStore } from '@/utils/bot/set-qr-code'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

export function useSignUp() {
  const { replace } = useRouter()
  const { setId } = userStore()

  const { mutate, isPending, error } = useMutation<IsignOutResponse, Error, IsignOut>({
    mutationFn: (formData) => SignUpAPi(formData),
    onSuccess: (data) => {
      const { QRcode, base64, user, message, statusBot } = data

      console.log(user)
      console.log(message, statusBot)
      if (message === 'bot-connectado' && statusBot === true) {
        console.log('Voce ja tem conta, so sera redicionado, e seu bot esta conectado')
        replace('/(private)/(home)/home')
        return
      }

      setQRcodeStore({ base64, qr: QRcode })
      console.log(user.id)
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
    const id = await AsyncStorage.getItem('userId')

    mutate({ id: id! })
  }

  return {
    mutationError: error,
    isPending,
    handleSubmitFn,
  }
}
