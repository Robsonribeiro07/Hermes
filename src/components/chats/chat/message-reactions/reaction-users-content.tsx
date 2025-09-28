import { Center } from '@/components/ui/center'
import { useSyncUserData } from '@/hooks/database/use-sync-user-data'
import { useReaction } from '@/hooks/whatsapp/chats/chat/reactions-message/use-reaction'
import React, { useMemo } from 'react'
import { ReactionUser } from './reaction-user'

export const ReactionUsersContent = React.memo(({ messageId }: { messageId: string }) => {
  const { getReactionMessage } = useReaction()
  const { data: UserData } = useSyncUserData()

  const reactions = useMemo(() => getReactionMessage(messageId), [getReactionMessage]).sort((a, b) => a.userId.localeCompare(b.userId))

  return (
    <Center className="w-full gap-3">
      {reactions
        .filter((reactions) => reactions.emoji)
        .map((reaction) => {
          const isFromMe = reaction.userId === UserData?.id
          return <ReactionUser key={reaction.id} name={reaction.name} emoji={reaction.emoji} isFromMe={isFromMe} id={reaction.userId} messageId={messageId} />
        })}
    </Center>
  )
})
