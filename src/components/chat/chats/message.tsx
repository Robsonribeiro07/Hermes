import { Box } from '@/components/ui/box'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { mediaMap } from './map-media'

function MessageChatComponent({
  content,
  date,
  id,
  fromMe,
  type = 'text',
  imgUrl,
  sending,
  mimyType,
  gifPlayback,
  isVisible,
}: IContentMessage) {
  console.log('Render MessageChat:', id, isVisible)
  const newDate = useMemo(() => new Date(date), [date])

  const ComponentRenderMedia = useMemo(() => mediaMap[type], [type])

  return (
    <Box className="w-full my-2 min-h-[100px]" id={id}>
      <Box
        className={`w-auto min-w-40 max-w-[80%]  h-auto min-h-[20px] rounded-lg overflow-hidden ${
          fromMe ? 'ml-auto bg-green-400' : 'bg-gray-200 mr-auto ml-10'
        }`}
      >
        <ComponentRenderMedia
          content={content}
          fromMe={fromMe}
          id={id}
          key={id}
          sending={sending}
          imgUrl={imgUrl}
          type={type}
          date={date}
          mimyType={mimyType}
          gifPlayback={gifPlayback}
          isVisible={isVisible}
        />
      </Box>

      <Box className={`flex-row items-center gap-3 ${fromMe ? 'ml-auto ' : 'mr-auto'}`}>
        {!fromMe && <AvatarProfile ImgUrl={imgUrl} />}
        <Text className="font-poppins text-primary-300">
          {newDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(10)}
        </Text>
      </Box>
    </Box>
  )
}

export const MessageChat = React.memo(MessageChatComponent, (prev, next) => {
  return (
    prev.content === next.content &&
    prev.fromMe === next.fromMe &&
    prev.type === next.type &&
    prev.imgUrl === next.imgUrl &&
    prev.sending === next.sending &&
    prev.isVisible === next.isVisible
  )
})
