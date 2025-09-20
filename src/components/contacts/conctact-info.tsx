import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AvatarProfile } from '../user/avatar-profile'

interface IContactInfo {
  jid: string | undefined
  exist: boolean | null
  imgUrl: string | null
  number: string | undefined
}

const ConctactInfo = React.memo(({ jid, number, imgUrl }: IContactInfo) => {
  return (
    <TouchableOpacity className="w-full mt-5" style={{ elevation: 5 }}>
      <View className="flex-row items-center justify-start w-full gap-3">
        <AvatarProfile size="md" ImgUrl={imgUrl} />

        <View>
          <Text className="font-semibold text-xl">{jid}</Text>
          <Text className="font-semibold text-xl">{number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})

export { ConctactInfo }
