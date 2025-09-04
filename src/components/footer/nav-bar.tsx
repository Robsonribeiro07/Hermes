import { useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { INavItems, NavItems } from './nav-items'

const navigationConfig: INavItems[] = [
  {
    Name: 'Home',
    href: 'home',
  },
  {
    Name: 'Groups',
    href: 'groups',
  },
  {
    Name: 'Settings',
    href: 'settings',
  },
]
const NavBarFooter = () => {
  const theme = useColorScheme()

  const borderColor = theme === 'light' ? 'border-t-gray-200' : 'border-t-gray-700'
  return (
    <SafeAreaView
      edges={['bottom']}
      className={`${borderColor}  border-t-[1.2px] min-h-20 py-2 justify-end`}
    >
      <View className="w-full flex-row justify-around gap-6">
        {navigationConfig.map((item) => (
          <NavItems {...item} key={item.Name} />
        ))}
      </View>
    </SafeAreaView>
  )
}

export { NavBarFooter }
