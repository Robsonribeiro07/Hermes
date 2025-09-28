import { Box } from '@/components/ui/box'
import { Center } from '@/components/ui/center'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { useSyncUserData } from '@/hooks/database/use-sync-user-data'
import { useSendMessage } from '@/hooks/whatsapp/chats/chat/reactions-message/use-send-message'
import { Text, TouchableOpacity } from 'react-native'
import { ReactionComponent } from './reaction'

interface IReactionUserProps {
  name?: string
  emoji?: string
  id?: string
  isFromMe?: boolean
  userid?: string
  messageId: string
}
export function ReactionUser({ name, emoji, id, isFromMe, messageId }: IReactionUserProps) {
  const { handleSendReactionMessage } = useSendMessage()
  const { data: UserData } = useSyncUserData()
  return (
    <TouchableOpacity onPress={() => handleSendReactionMessage(emoji!, messageId)}>
      <Center
        className="w-full justify-between flex-row
    "
      >
        <AvatarProfile />

        <Box className="flex-1 px-2">
          <Text className="font-poppins text-xl text-primary-400">{isFromMe ? 'Você' : id}</Text>
          {UserData?.jid === id && <Text className="font-poppins text-base text-primary-400">Toque para remover</Text>}
        </Box>

        <ReactionComponent emoji={emoji || '👍'} id={id || ''} />
      </Center>
    </TouchableOpacity>
  )
}
