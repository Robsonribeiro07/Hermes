import { Box } from '@/components/ui/box'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { Text } from 'react-native'
import { MessageImgWithLoading } from './message-img-with-loading'
import { ThinkingMessage } from './thiking-message'

export type IMessageType = 'text' | 'img'
export interface IMessage {
  content: string
  type?: IMessageType
  date: Date
  id: string
  fromMe?: boolean
  thinkingMessage?: boolean
  isComplete?: boolean
}

export function Message({
  content,
  date,
  id,
  fromMe,
  thinkingMessage = false,
  type = 'text',
  isComplete = false,
}: IMessage) {
  const newDate = new Date(date)

  return (
    <Box className="w-full  min-h-[100px] " id={id}>
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
            fromMe ? 'bg-blue-500 ml-auto' : 'bg-gray-100 mr-auto ml-10'
          }`}
        >
          {type === 'text' ? (
            <Text className={`font-poppins font-light ${fromMe ? 'text-white' : 'text-black'}`}>
              {content}
            </Text>
          ) : (
            <MessageImgWithLoading content={content} isComplete={isComplete} id={id} />
          )}
        </Box>
      )}

      <Box className={`flex-row  items-center gap-3 ${fromMe ? 'ml-auto ' : 'mr-auto'}`}>
        {!fromMe && (
          <AvatarProfile
            ImgUrl={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s'
            }
          />
        )}
        <Text className="font-poppins text-primary-300">
          {newDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(10)}
        </Text>
      </Box>
    </Box>
  )
}
