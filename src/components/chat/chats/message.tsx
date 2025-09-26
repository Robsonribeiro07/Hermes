// components/chat/chats/message.tsx
import { Box } from '@/components/ui/box'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { useLongPressGesture } from '@/hooks/use-long-press'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import { useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { mediaMap } from './map-media'

function MessageChatComponent({ content, date, id, fromMe, type = 'text', imgUrl, sending, mimyType, gifPlayback }: IContentMessage) {
  const newDate = new Date(date)
  const ComponentRenderMedia = mediaMap[type]
  const { setOpen, addElementPosition, setRecentMessageId } = useReactionStore()

  const handleLongPress = useCallback(
    (x: number, y: number) => {
      setOpen(true)
      setRecentMessageId(id)
      addElementPosition({ x, y })
    },
    [id, setOpen, setRecentMessageId, addElementPosition],
  )

  const longPressGesture = useLongPressGesture({
    onLongPress: handleLongPress,
    enabled: true,
    sending: sending,
    messageId: id,
    minDuration: 200,
  })

  return (
    <Box className="w-full my-2 min-h-[100px]" id={id}>
      <Box
        className={`w-auto min-w-40 max-w-[80%] h-auto min-h-[20px] rounded-lg overflow-hidden ${
          fromMe ? 'ml-auto bg-green-400' : 'bg-gray-200 mr-auto ml-10'
        }`}
      >
        <GestureDetector gesture={longPressGesture}>
          <View collapsable={false}>
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
            />
          </View>
        </GestureDetector>
      </Box>

      <Box className={`flex-row items-center gap-3 ${fromMe ? 'ml-auto ' : 'mr-auto'}`}>
        {!fromMe && <AvatarProfile ImgUrl={imgUrl} />}
        <Text className="font-poppins text-primary-300">{newDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(10)}</Text>
      </Box>
    </Box>
  )
}

export const MessageChat = React.memo(MessageChatComponent, (prev, next) => {
  return prev.id === next.id
})
