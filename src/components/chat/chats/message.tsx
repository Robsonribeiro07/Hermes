import { Box } from '@/components/ui/box'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import { useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { mediaMap } from './map-media'

function MessageChatComponent({ content, date, id, fromMe, type = 'text', imgUrl, sending, mimyType, gifPlayback }: IContentMessage) {
  const newDate = new Date(date)
  const ComponentRenderMedia = mediaMap[type]
  const { setOpen, addElementPosition } = useReactionStore()

  return (
    <Box className="w-full my-2 min-h-[100px]" id={id}>
      <Box
        className={`w-auto min-w-40 max-w-[80%] h-auto min-h-[20px] rounded-lg overflow-hidden ${
          fromMe ? 'ml-auto bg-green-400' : 'bg-gray-200 mr-auto ml-10'
        }`}
      >
        <TouchableOpacity
          onLongPress={(event: any) => {
            if (sending) return
            setOpen(true)
            addElementPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY })
          }}
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
          />
        </TouchableOpacity>
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
