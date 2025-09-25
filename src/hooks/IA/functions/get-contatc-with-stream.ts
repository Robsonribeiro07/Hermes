import { getSocketServices } from '@/services/socket'
import { useChatIAStore } from '@/store/IA/chat-store'
import { useUserContactPersistStore } from '@/store/whatsapp/use-contact-store'

export function getContactsWithStream(...args: any[]) {
  const socket = getSocketServices()
  const contacts = useUserContactPersistStore.getState().contacts
  const handleAddChunkMessage = useChatIAStore.getState().handleAddChunkMessage

  let buffer = ''

  socket.emit('new-message', {
    content: `${JSON.stringify(contacts)}`,
  })

  return buffer // caso queira usar o buffer depois
}
