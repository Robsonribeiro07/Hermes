import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'

export function useNotificationListener() {
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification recebida:', notification)
    })

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Usuário tocou na notificação:', response)
    })

    return () => {
      subscription1.remove()
      subscription2.remove()
    }
  }, [])
}
