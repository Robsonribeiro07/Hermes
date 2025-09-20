import { Box } from '@/components/ui/box'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

interface IHeaderChatIa {
  handleClose: () => void
}
const HeaderChatIA = ({ handleClose }: IHeaderChatIa) => {
  return (
    <Box className="flex-row justify-between w-full items-center py-4">
      <TouchableOpacity onPress={handleClose}>
        <Ionicons name="arrow-back" size={25} />
      </TouchableOpacity>

      <View className="flex-row flex-1 px-5 items-center gap-3 ">
        <AvatarProfile
          ImgUrl={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s'
          }
        />
        <View>
          <Text className="font-poppins text-xl">AI Assistant</Text>
          <Text className="font-poppins text-sm text-primary-300">online</Text>
        </View>
      </View>

      <Ionicons name="swap-horizontal" size={25} />
    </Box>
  )
}

export { HeaderChatIA }
