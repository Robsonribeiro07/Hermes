import ThemedView from '@/components/theme/themed-view'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

interface CheckContactProps {
  name: string | undefined
  jid: string
  avatarUrl?: string | null
  checked: boolean
  handleSelectContact: (jid: string) => void
  alreadyInGroup: boolean | undefined
}

export const CheckContact = ({
  name,
  avatarUrl,
  checked = false,
  handleSelectContact,
  jid,
  alreadyInGroup,
}: CheckContactProps) => {
  const { colors } = useTheme()

  const checkedContact = checked || alreadyInGroup
  const opacityChecked = !checkedContact ? 'opacity-40' : 'opacity-100'

  return (
    <TouchableOpacity
      disabled={alreadyInGroup}
      onPress={() => {
        if (alreadyInGroup) return
        handleSelectContact(jid)
      }}
    >
      <ThemedView className={`flex-row items-center justify-between px-3 py-2 ${opacityChecked}`}>
        <View className="flex-row items-center gap-3 flex-1">
          <AvatarProfile ImgUrl={avatarUrl} size="lg" />
          <View className="flex-1 ">
            <Text className="font-poppins text-2xl text-primary-400">{name}</Text>
            {alreadyInGroup && <Text className="text-md font-poppins">Already In group</Text>}
          </View>

          <View className="w-10 h-10 bg-secondary-500 rounded-full items-center justify-center">
            {checkedContact && (
              <Ionicons name="checkmark-done-outline" color={colors.buttonBlue} size={30} />
            )}
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  )
}
