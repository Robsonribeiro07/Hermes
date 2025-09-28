import { useSound } from '@/hooks/whatsapp/sound/use-sound-notification'
import { useReactionStore } from '@/store/whatsapp/chats/reactions/use-reaction-store'
import { useSendMessageMutation } from '../use-send-message-mutation'
import { useReaction } from './use-reaction'

export function useSendMessage() {
  const { mutate, recentMessageId, userIdtemp, currentMessage, disabled, isPending } = useSendMessageMutation()
  const { playSound } = useSound()
  const { setOpen } = useReactionStore()
  const { hasReaction } = useReaction()
  const handleSendGiftMessage = (gifUrl: string) => {
    const messageId = Math.random().toString(36).substring(7)
    mutate({
      message: gifUrl,
      destination: userIdtemp!,
      type: 'gif',
      messageId,
    })
  }
  const handleSendMessage = () => {
    if (!currentMessage) return
    const { user, message } = currentMessage
    mutate({
      message: message.content,
      destination: user.id,
      type: 'text',
    })
  }

  const handleSendReactionMessage = (reaction: string, messageId?: string) => {
    const hasReactionFlag = hasReaction?.some((r) => r.emoji === reaction) ?? false

    console.log(hasReactionFlag)

    const removeReactionWithHasReaction = hasReactionFlag ? '' : reaction

    console.log(removeReactionWithHasReaction, 'reacionremove')
    setOpen(false)
    playSound('reaction')
    mutate({
      message: removeReactionWithHasReaction,
      destination: userIdtemp!,
      type: 'react',
      messageId: messageId || recentMessageId!,
      participantId: '557582223723@s.whatsapp.net',
    })
  }

  return {
    handleSendMessage,
    handleSendReactionMessage,
    handleSendGiftMessage,
    isPending,
    disabled,
  }
}
