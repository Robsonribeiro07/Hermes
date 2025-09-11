import { App } from '@/components/app'
import { NavBarFooter } from '@/components/footer/nav-bar'
import Header from '@/components/header/header'
import ThemedView from '@/components/theme/themed-view'
import { useSyncUserData } from '@/hooks/database/use-sync-user-data'
import { useTheme } from '@/theme/theme-context'
import { Slot, useSegments } from 'expo-router'

export default function RootLayoutPrivate() {
  useSyncUserData()

  const segments = useSegments()

  const { colors } = useTheme()

  const hideHeaderScreen = ['settings', 'groups']

  const showHeader = !hideHeaderScreen.includes(segments[segments.length - 1])
  return (
    <ThemedView className="flex-1 " lightColor={colors.background}>
      <ThemedView className="flex-1 ">
        <ThemedView className="flex-1 px-8 ">
          {showHeader && <Header />}
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
