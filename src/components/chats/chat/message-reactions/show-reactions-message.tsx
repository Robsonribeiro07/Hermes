import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from '@/components/ui/actionsheet'
import { useReaction } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction'
import { useShowReactionMessage } from '@/store/whatsapp/chats/reactions/use-show-reaction-store'
import { Text } from 'react-native'
import { ReactionUsersContent } from './reaction-users-content'

export function ShowReactionsMessage() {
  const { open, setOpen, messageId } = useShowReactionMessage()

  const { getReactionMessage } = useReaction()

  const reactionMessage = getReactionMessage(messageId).filter((r) => r.emoji !== '')

  return (
    <Actionsheet isOpen={open} onClose={() => setOpen(false)}>
      <ActionsheetBackdrop />

      <ActionsheetContent className="min-h-[30%]">
        <ActionsheetDragIndicator>
          <ActionsheetDragIndicatorWrapper />
        </ActionsheetDragIndicator>

        <Text className="font-poppins text-xl  justify-start w-full py-4 text-primary-400">{reactionMessage.length} Reactions</Text>
        <ReactionUsersContent messageId={messageId} />
      </ActionsheetContent>
    </Actionsheet>
  )
}
