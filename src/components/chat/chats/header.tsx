import { AvatarProfile } from '@/components/user/avatar-profile'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MenuOptions } from './menu-options/menu'

export function HeaderChat() {
  return (
    <SafeAreaView edges={['top']} className="flex-row justify-between w-full items-center py-4">
      <TouchableOpacity>
        <Ionicons name="chevron-back" size={30} />
      </TouchableOpacity>

      <View className="flex-row flex-1 px-5 items-center gap-3 ">
        <AvatarProfile
          size="lg"
          ImgUrl={
            'https://res.cloudinary.com/ddrbxo7pj/image/upload/v1758375033/Screenshot_2024-09-21-19-26-12-907_com.miui.videoplayer_ltj2m0.jpg'
          }
        />
        <View>
          <Text className="font-poppins text-xl">Samy</Text>
          <Text className="font-poppins text-sm text-primary-300">online</Text>
        </View>
      </View>

      <MenuOptions />
    </SafeAreaView>
  )
}
