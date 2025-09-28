import { create } from 'zustand'

interface IShowReactionInMessageProps {
  open: boolean
  setOpen: (open: boolean) => void
  messageId: string
  setMessageId: (id: string) => void
}

export const useShowReactionMessage = create<IShowReactionInMessageProps>((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open })),
  messageId: '',
  setMessageId: (id) => set(() => ({ messageId: id })),
}))
