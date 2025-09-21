import { ThinkingMessage } from '@/components/IA/chat/thiking-message'
import { Box } from '@/components/ui/box'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { MediaType } from '@/database/whatsapp/Media/typed-media'
import { Text } from 'react-native'
import { mediaMap } from './map-media'

export interface IMessage {
  content: string
  type?: MediaType
  date: Date
  id?: string | undefined
  fromMe?: boolean
  thinkingMessage?: boolean
  isComplete?: boolean
  imgUrl: string | undefined
}

export function MessageChat({
  content,
  date,
  id,
  fromMe,
  thinkingMessage = false,
  type = 'text',
  isComplete = false,
  imgUrl,
}: IMessage) {
  const newDate = new Date(date)

  const ComponentRenderMedia = mediaMap[type]
  return (
    <Box className="w-full my-2 min-h-[100px] " id={id}>
      {thinkingMessage ? (
        <ThinkingMessage />
      ) : (
        <Box
          style={{
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}
          className={`w-[80%] min-h-[80px] rounded-lg p-3 ${
            fromMe ? 'bg-[#4CAF7F] ml-auto' : 'bg-gray-200 mr-auto ml-10'
          }`}
        >
          <ComponentRenderMedia
            content={content}
            fromMe={fromMe}
            id={id}
            isComplete={isComplete}
            key={id}
          />
        </Box>
      )}

      <Box className={`flex-row  items-center gap-3 ${fromMe ? 'ml-auto ' : 'mr-auto'}`}>
        {!fromMe && <AvatarProfile ImgUrl={imgUrl} />}
        <Text className="font-poppins text-primary-300">
          {newDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(10)}
        </Text>
      </Box>
    </Box>
  )
}
