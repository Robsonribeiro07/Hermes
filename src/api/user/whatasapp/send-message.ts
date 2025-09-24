import { getUserId } from '@/database/MMKV/get-user-id'
import api from '@/lib/axios'

interface ISendMessage {
  userId: string
  destination: string
  message: string
  messageId?: string
}

export async function sendMessage({ userId, destination, message }: ISendMessage) {
  if (!userId || !destination || !message) {
    throw new Error('Missing required fields')
  }

  try {
    const response = await api.post('user/whatsapp/send-message', {
      userId: getUserId(),
      userToSendMessage: destination,
      message,
      type: 'text',
    })
    return response.data
  } catch (error) {
    console.error('Error sending message', error)
    throw error
  }
}
