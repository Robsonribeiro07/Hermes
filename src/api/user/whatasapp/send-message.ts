import { getUserId } from '@/database/MMKV/get-user-id'
import { MediaType } from '@/database/whatsapp/Media/typed-media'
import api from '@/lib/axios'

interface ISendMessage {
  destination: string
  message: string
  type: MediaType
  messageId?: string
}

export async function sendMessage({ destination, message, type = 'text' }: ISendMessage) {
  if (!destination || !message || !type) {
    throw new Error('Missing required fields')
  }

  try {
    const response = await api.post('user/whatsapp/send-message', {
      userId: getUserId(),
      userToSendMessage: destination,
      message,
      type: type,
    })
    return response.data
  } catch (error) {
    console.error('Error sending message', error)
    throw error
  }
}
