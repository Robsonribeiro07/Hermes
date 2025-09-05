import { IsignOut, IsignOutResponse, SignUpAPi } from '@/api/user/sign-up'
import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import uuid from 'react-native-uuid'
import { useSocket } from '../socket/useSocket'
import { useFormAuth } from './form'

export function useSignUp() {
  const { handleSubmit, control, errors, inputs, isSubmitting } = useFormAuth()

  const { connectSocket } = useSocket()
  const { replace } = useRouter()
  const { setBase64 } = QRCodeStore()

  const { mutate, isPending, error } = useMutation<IsignOutResponse, Error, IsignOut>({
    mutationFn: (formData) => SignUpAPi(formData),
    onSuccess: (data) => {
      const { QRcode, base64 } = data

      setBase64(base64)

      replace({
        pathname: '/sign-up/qr/[qrCode]',
        params: { qrCode: encodeURIComponent(QRcode) },
      })

      console.log(data)
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })

  const handleSubmitFn = handleSubmit(async (formdata) => {
    const id = uuid.v4()
    await connectSocket(id)

    const formdDataWithId = {
      ...formdata,
      id,
    }
    mutate(formdDataWithId)
  })

  return {
    control,
    errors,
    inputs,
    isSubmitting: isSubmitting || isPending,
    mutationError: error,
    handleSubmitFn,
  }
}
