import { initSocket } from '@/services/socket'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'

export default function Middleware() {
  const { push } = useRouter()

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        let userId = await AsyncStorage.getItem('userId')
        console.log(userId)
        if (!userId) {
          userId = 'user-' + Date.now()
          await AsyncStorage.setItem('userId', userId)
        }

        await initSocket(userId)

        push('/(public)/sign-up')
      }

      init()
    }, [push]),
  )

  return null
}
