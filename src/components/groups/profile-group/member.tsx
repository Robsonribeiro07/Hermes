import { AvatarProfile } from '@/components/user/avatar-profile'
import { Text, TouchableOpacity, View } from 'react-native'

export interface IMember {
  name: string
  rule: boolean
  superAdmin: boolean
  imgUrl: string | undefined
  onPress: () => void
}
const Member = ({ name, rule, superAdmin, imgUrl, onPress }: IMember) => {
  const admin = superAdmin ? 'superAdmin' : rule ? 'admin' : 'user'
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View className="w-full flex-row items-center gap-4 bg-secondary-800 rounded-lg h-20 px-2 mt-3">
        <AvatarProfile ImgUrl={imgUrl} />

        <View>
          <Text className="text-xl font-semibold text-primary-700">{name}</Text>
          <Text className="font-semibold text-primary-200">{admin}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export { Member }
