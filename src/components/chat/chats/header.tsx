import { AvatarProfile } from '@/components/user/avatar-profile'
import { useChatWhatsapp } from '@/hooks/whatsapp/chats/chat/use-chat-whatsapp'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MenuOptions } from './menu-options/menu'

export function HeaderChat() {
  const { user } = useChatWhatsapp()

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-row justify-between w-full items-center py-4 px-4"
    >
      <TouchableOpacity>
        <Ionicons name="chevron-back" size={30} />
      </TouchableOpacity>

      <View className="flex-row flex-1 px-5 items-center gap-3 ">
        <AvatarProfile size="lg" ImgUrl={user?.user.imgUrl} />
        <View>
          <Text className="font-poppins text-xl">Hermes</Text>
          <Text className="font-poppins text-sm text-primary-300">online</Text>
        </View>
      </View>

      <MenuOptions />
    </SafeAreaView>
  )
}
