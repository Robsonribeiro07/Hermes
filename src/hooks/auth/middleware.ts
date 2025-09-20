import { storaged } from '@/database/MMKV'
import { getUserId } from '@/database/MMKV/get-user-id'
import { initSocket } from '@/services/socket'
import { SplashScreen, useRouter } from 'expo-router'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()
export function useMiddleware() {
  const { replace } = useRouter()

  useEffect(() => {
    if (!replace) return
    const init = () => {
      try {
        let userId = getUserId()
        if (!userId) {
          userId = 'user-' + Date.now()
          storaged.set('userId', userId)
        }
        initSocket(userId)

        const userData = storaged.getString('userData')

        if (userData) {
          replace('/(private)/(home)/home')
          return
        }
        replace('/(public)/sign-up')
      } catch (err) {
        console.error(err)
        replace('/(public)/sign-up')
      } finally {
        SplashScreen.hideAsync()
      }
    }

    init()
  }, [replace])
}
