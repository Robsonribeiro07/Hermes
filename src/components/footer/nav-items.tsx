import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { usePathname, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from '../theme/themed-text'
export interface INavItems {
  Name: 'Home' | 'Groups' | 'Settings'
  href: 'home' | 'groups' | 'settings'
}

const Icons = {
  Home: 'home-outline',
  Groups: 'people-outline',
  Settings: 'settings-outline',
} as const

const NavColors = {
  dark: {
    checked: {
      true: '#4EA8DE',
      false: '#ffffff',
    },
  },
  light: {
    checked: {
      true: '#4EA8DE',
      false: '#000000',
    },
  },
} as const

type IconName = keyof typeof Icons
type IconValue = (typeof Icons)[IconName]

const NavItems = ({ Name, href }: INavItems) => {
  const { colors, mode } = useTheme()
  const checked = usePathname() === `/${href}`

  const colorChecked = NavColors[mode].checked[checked ? 'true' : 'false']
  const colorIconsChecked = checked ? colors.blueText : colors.text

  const router = useRouter()

  return (
    <TouchableOpacity className="items-center" onPress={() => router.push(`/${href}`)}>
      <Ionicons name={Icons[Name] as IconValue} size={24} color={colorIconsChecked} />
      <ThemedText
        color={colorChecked}
        text={Name}
        lightColor={NavColors.light.checked[checked ? 'true' : 'false']}
        darkColor={NavColors.dark.checked[checked ? 'true' : 'false']}
        size={13}
      />
    </TouchableOpacity>
  )
}

export { NavItems }
