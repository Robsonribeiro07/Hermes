import { useSendMessageMutation } from '../use-send-message-mutation'

export function useSendMessage() {
  const { mutate, recentMessageId, userIdtemp, currentMessage, disabled, isPending } = useSendMessageMutation()

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

  const handleSendReactionMessage = (reaction: string) => {
    console.log('handleSendReactionMessage', { reaction, recentMessageId, userIdtemp })
    mutate({
      message: reaction,
      destination: userIdtemp!,
      type: 'react',
      messageId: recentMessageId,
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
