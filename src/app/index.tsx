import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'

export default function Middleware() {
  const { push } = useRouter()

  useFocusEffect(
    useCallback(() => {
      push('/(public)/sign-up')
    }, [push]),
  )

  return null
}
