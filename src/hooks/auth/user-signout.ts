import { IsignOut, IsignOutResponse, SignUpAPi } from '@/api/user/sign-up'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useSocket } from '../socket/useSocket'
import { useFormAuth } from './form'

import uuid from 'react-native-uuid'

export function useSignUp() {
  const { handleSubmit, control, errors, inputs, isSubmitting } = useFormAuth()

  const { connectSocket } = useSocket()
  const { replace } = useRouter()

  const { mutate, isPending, error } = useMutation<IsignOutResponse, Error, IsignOut>({
    mutationFn: (formData) => SignUpAPi(formData),
    onSuccess: (data) => {
      const { QRcode } = data

      console.log(QRcode)
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
