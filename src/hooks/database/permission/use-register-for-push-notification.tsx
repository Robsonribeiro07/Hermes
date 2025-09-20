import api from '@/lib/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { Platform } from 'react-native'

export function useRegisterForPushNotification() {
  useEffect(() => {
    const registerPush = async () => {
      if (!Device.isDevice) {
        return
      }

      let token
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        alert('Falha ao obter permissão para notificação')
        return
      }

      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log('expo push token', token)

      try {
        const id = await AsyncStorage.getItem('userId')
        const response = await api.post('token/register', { token, userId: id })
        console.log('token registrado', response.data)
      } catch (err) {
        console.error(err)
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
        })
      }
    }

    registerPush()
  }, [])
}
