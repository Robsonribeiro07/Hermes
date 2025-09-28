import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from '../theme/themed-text'
import { Center } from '../ui/center'
import { AvatarProfile } from '../user/avatar-profile'

interface IChatprops {
  user: string
  avatarUrl?: string
}
export const Chat = React.memo(({ user, avatarUrl }: IChatprops) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Center className="flex-row py-3 items-center">
        <AvatarProfile size="lg" ImgUrl={avatarUrl} />

        <Center className="flex-1 px-3 items-start  ">
          <ThemedText text={user} lightColor="#000" size={14} />
          <ThemedText text="amor: figurinhas" lightColor="#000" size={12} />
        </Center>

        <ThemedText text="10:46" size={14} />
      </Center>
    </TouchableOpacity>
  )
})
