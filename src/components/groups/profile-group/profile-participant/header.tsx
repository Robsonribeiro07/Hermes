import { AvatarProfile } from '@/components/user/avatar-profile'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface IHeadProfileParticipant {
  name: string | undefined
  isAdmin: boolean | undefined
  imgUrl: string | undefined
}
const HeaderProfileParticipant = ({ name, isAdmin, imgUrl }: IHeadProfileParticipant) => {
  return (
    <SafeAreaView edges={['top']} className="mt-10 px-2 items-center font-poppins">
      <Text className="font-semibold text-2xl font-poppins">Profile</Text>

      <View className="mt-10  items-center ">
        <AvatarProfile size="2xl" withBorder ImgUrl={imgUrl} />
        <View className="gap-2 mt-5 items-center">
          <Text className="font-semibold text-2xl text-primary-500 font-poppins">{name}</Text>
          <Text className="font-semibold text-lg text-primary-200 font-poppins">{isAdmin}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export { HeaderProfileParticipant }
