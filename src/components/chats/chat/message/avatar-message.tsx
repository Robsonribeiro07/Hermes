import { Box } from '@/components/ui/box'
import { AvatarProfile } from '@/components/user/avatar-profile'
import React from 'react'
import { Text } from 'react-native'

interface IAvatarMessage {
  fromMe: boolean
  imgUrl?: string
  newDate: Date
}

function AvatarMessage({ fromMe, imgUrl, newDate }: IAvatarMessage) {
  return (
    <Box className={`flex-row items-center gap-3 ${fromMe ? 'ml-auto ' : 'mr-auto'}`}>
      {!fromMe && <AvatarProfile ImgUrl={imgUrl} />}
      <Text className="font-poppins text-primary-300">{newDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(10)}</Text>
    </Box>
  )
}
export const AvatarMessageMemorized = React.memo(AvatarMessage, (prev, next) => {
  return prev.imgUrl === next.imgUrl
})
