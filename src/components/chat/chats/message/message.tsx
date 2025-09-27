import { Box } from '@/components/ui/box'
import { useLongPressGesture } from '@/hooks/use-long-press'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import { useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { mediaMap } from '../map-media'
import { AvatarMessageMemorized } from './avatar-message'
import { ShowReactionInMessage } from './show-reaction-in-message'
import { ToForwardMessage } from './to-forward-message'

function MessageChatComponent({ content, date, id, fromMe, type = 'text', imgUrl, sending, mimyType, gifPlayback }: IContentMessage) {
  const ComponentRenderMedia = mediaMap[type]
  const { setOpen, addElementPosition, setRecentMessageId } = useReactionStore()
  const { userMessages } = useReactionStore()
  const newDate = useMemo(() => new Date(date), [date])

  const handleLongPress = useCallback(
    (x: number, y: number) => {
      setOpen(true)
      setRecentMessageId(id)
      addElementPosition({ x, y })
    },
    [id, setOpen, setRecentMessageId, addElementPosition],
  )

  const longPressGesture = useCallback(
    () =>
      useLongPressGesture({
        onLongPress: handleLongPress,
        enabled: true,
        sending: sending,
        messageId: id,
        minDuration: 200,
      }),
    [id, setOpen, setRecentMessageId, addElementPosition],
  )

  return (
    <Box className="w-full my-2 min-h-[100px]" id={id}>
      <Box className={`w-auto justify-center  items-center  min-w-40 max-w-[80%] h-auto min-h-[20px] rounded-lg  ${fromMe ? 'ml-auto' : 'mr-auto ml-10'}`}>
        <GestureDetector gesture={longPressGesture()}>
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
            <ShowReactionInMessage fromMe={fromMe} messageId={id} />
          </View>
        </GestureDetector>
        <ToForwardMessage fromMe={fromMe} />
      </Box>

      <AvatarMessageMemorized imgUrl={imgUrl} newDate={newDate} fromMe={fromMe} />
    </Box>
  )
}

export const MessageChat = React.memo(MessageChatComponent, (prev, next) => {
  return prev.id === next.id
})
