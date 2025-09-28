import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { ThemedText } from '../theme/themed-text'
import ThemedView from '../theme/themed-view'

export type actionsType = 'CreateRaffle' | 'SendMessage' | 'ManageGroups' | 'Settings'

interface IActions {
  actions: actionsType
}

export type IconLibrary = 'Ionicons' | 'AntDesign'

const actionsConfig: Record<
  actionsType,
  {
    label: string
    icon: string
    library: IconLibrary
    href?: string
  }
> = {
  CreateRaffle: { label: 'Create Raffle', icon: 'plus', library: 'AntDesign' },
  SendMessage: { label: 'Chats', icon: 'send', library: 'Ionicons' },
  ManageGroups: { label: 'Manage Groups', icon: 'people', library: 'Ionicons' },
  Settings: { label: 'Settings', icon: 'settings', library: 'Ionicons' },
}

const Actions = ({ actions }: IActions) => {
  const { colors } = useTheme()
  const action = actionsConfig[actions]

  const { push } = useRouter()

  const IconComponent = action.library === 'Ionicons' ? Ionicons : AntDesign

  return (
    <TouchableOpacity className="w-[48%] mt-4 h-48 rounded-2xl items-center justify-center" activeOpacity={0.6} onPress={() => push('/(private)/chats')}>
      <ThemedView className="w-full mt-4 h-48 rounded-2xl items-center justify-center" lightColor={colors.lightBlue} darkColor={colors.lightBlue}>
        <View className="flex-col items-center">
          <IconComponent name={action.icon as any} size={30} color={colors.blueText} />
          <ThemedText text={action.label} size={13} lightColor={colors.text} darkColor={colors.foreground} />
        </View>
      </ThemedView>
    </TouchableOpacity>
  )
}

export default Actions
