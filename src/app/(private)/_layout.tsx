import { App } from '@/components/app'
import { NavBarFooter } from '@/components/footer/nav-bar'
import Header from '@/components/header/header'
import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { Slot } from 'expo-router'

export default function RootLayoutPrivate() {
  const { colors } = useTheme()
  return (
    <ThemedView className="flex-1 ">
      <ThemedView className="flex-1 ">
        <ThemedView className="flex-1 px-10 ">
          <Header />
          <Slot
            screenOptions={{
              headerShown: false,
            }}
          />
        </ThemedView>
        <NavBarFooter />
      </ThemedView>
    </ThemedView>
  )
}

export { App }
