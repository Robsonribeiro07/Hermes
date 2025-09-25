import { useChatIAStore } from '@/store/IA/chat-store'
import { getContactsWithStream } from './functions/get-contatc-with-stream'
import { IAAction } from './use-handle-ia-action'

export const IActionsFunctions: Record<IAAction, (...args: any[]) => void> = {
  GET_CONTACTS: (...args) => getContactsWithStream(...args),
  TEXT: (...args) => {
    const handleAddChunkMessage = useChatIAStore.getState().handleAddChunkMessage

    const [chunck, id] = args
    handleAddChunkMessage(chunck, id)
  },
}
